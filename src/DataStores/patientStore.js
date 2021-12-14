import { action, observable, computed, toJS } from "mobx";
import { UserStore } from './userStore';
import { DateTime, Interval } from 'luxon';
import EducationStore from './educationStore';
import ReportStore from './reportStore';
import { addReportToOfflineCache, getNumberOfCachedReports } from './SaveReportOffline'
import resizeImage from '../Utility/ResizeImage';
import { daysSinceISODateTime, daysSincePhotoRequest } from "../Utility/TimeUtils";

const ROUTES = {
    login: ["/authenticate", "POST"],
    getCurrentPatient: ["/patient/me", "GET"],
    dailyReport: ["/daily_report", "POST"],
    patientReports: ["/daily_reports", "GET"],
    getPhotoUploadURL: ["/patient/daily_reports/photo_upload_url", "GET"],
    updateNotificationTime: ["/patient/reminder", "PATCH"],
    updateEducationStatus: ["/patient/me/education_status", "POST"],
    oneStepReport: ["/v2/daily_report?noIssues=true", "POST"]
}

export class PatientStore extends UserStore {

    //Takes in a data fetching strategy, so you can swap out the API one for testing data
    constructor(strategy) {
        super(strategy, ROUTES, "Patient")
        this.educationStore = new EducationStore(this)
        this.reportStore = new ReportStore(this)
    }

    @observable patientInformation = {
        daysInTreatment: 0,
        currentStreak: 0,
        weeksInTreatment: 0,
        loaded: false
    }

    @observable hasForcedPasswordChange = false;
    @observable photoSchedule = {};
    @observable lastPhotoRequestStatus = {};
    @observable lastContactTracingSurvey = {};
    @observable educationStatus = [];

    @observable status = "Active";
    @observable isReminderUpdating = false;
    @observable treatmentOutcome = {};

    @observable treatmentStart = ""

    @observable uiState = {
        onCalendarView: false,
        cameraIsOpen: false,
        selectedCalendarDate: DateTime.local().startOf('day').toISODate(),
        symptomWarningVisible: false,
    }

    @observable medicationSchedule = []

    @observable savedReports = [];
    @observable savedReportsLoaded = false;

    @observable report = this.defaultReport;

    @observable oneStepStatus = {
        error: false,
        loading: false,
        loadingComplete: false
    }

    @observable treatmentFlowLength = 0;

    @observable lastSubmission = DateTime.local().toISO();

    @observable photoIsUploading = false;

    @observable newReminderTime = "";

    //Actions
    @action refreshReportDate = () => {
        this.report.date = DateTime.local().toISODate();
    }

    @action initalize() {
        this.loadCachedProfile();
        super.initalize();
        this.loadDailyReport();
        this.getReports();

        this.newReminderTime = this.reminderTime || DateTime.local().toISO();

    }

    //Load backup items for offline use 
    @action loadCachedProfile = () => {
        const cached = JSON.parse(localStorage.getItem("cachedProfile"));
        if (cached && cached.givenName) {
            this.givenName = cached.givenName
        }

        if (cached && cached.photoSchedule) {
            this.photoSchedule = cached.photoSchedule
        }
        if (cached && cached.daysInTreatment) {
            this.patientInformation.daysInTreatment = cached.daysInTreatment
        }
        if (cached && cached.currentStreak) {
            this.currentStreak = cached.currentStreak
        }
    }

    @action getPatientInformation = () => {
        return this.executeRequest(`getCurrentPatient`).then((json) => {
            if (json.status) { this.setAccountInformation(json) }
        });
    }

    @action setAccountInformation(json) {

        //Newly added when refactoring getPatientInformation
        this.reminderTime = json.dailyNotificationTime;
        this.status = json.status;

        this.photoSchedule = json.photoSchedule.reduce((a, b) => (a[b] = true, a), {});
        this.patientInformation.weeksInTreatment = json.weeksInTreatment;
        this.treatmentStart = json.treatmentStart
        this.patientInformation.daysInTreatment = json.daysInTreatment;
        this.patientInformation.currentStreak = json.currentStreak;
        this.educationStore.educationStatus = json.educationStatus;
        this.hasForcedPasswordChange = json.hasForcedPasswordChange;
        this.treatmentOutcome = json.treatmentOutcome;
        this.lastPhotoRequestStatus = json.lastPhotoRequestStatus;
        this.lastContactTracingSurvey = json.lastContactTracingSurvey;
        this.patientInformation.loaded = true;

        localStorage.setItem("cachedProfile", JSON.stringify({
            photoSchedule: this.photoSchedule,
            givenName: json.givenName,
            daysInTreatment: json.daysInTreatment,
            currentStreak: json.currentStreak
        }))

        super.setAccountInformation(json);

    }

    @computed get datetimeTreatmentStart() {
        return DateTime.fromISO(this.treatmentStart).startOf('day')
    }

    @computed get selectedDayReport() {
        return this.savedReports[`${this.uiState.selectedCalendarDate}`]
    }

    @computed get requiresSubmission() {
        return (this.report.hasSubmitted && (!this.isPhotoDay || this.report.hasSubmittedPhoto) && !this.report.hasConfirmedAndSubmitted)
    }

    @computed get selectedDayWasPhotoDay() {
        return this.checkPhotoDay(DateTime.fromISO(this.uiState.selectedCalendarDate));
    }

    @computed get daysSinceTreatmentStart() {
        return Math.floor(DateTime.fromISO(this.treatmentStart).endOf('day').diffNow("days").days * -1)
    }

    @computed get isPhotoDay() {
        return this.checkPhotoDay(DateTime.local())
    }

    //date : DateTime (Luxon Object)
    checkPhotoDay(date) {
        date = date.toISODate();
        return (this.photoSchedule[date] !== undefined)
    }

    @computed get selectedDateForDisplay() {
        return this.selectedDate.toLocaleString(DateTime.DATE_FULL)
    }

    @computed get dailyActionsCompleted() {
        return (this.report.hasConfirmedAndSubmitted)
    }

    @computed get numberOfPhotoReports() {

        return Object.values(toJS(this.savedReports)).reduce((total, report) => {
            if (report.photoUrl) {
                return total += 1
            }
            return total
        }, 0)
    }

    @computed get incompleteDays() {
        return (Interval.fromDateTimes(
            this.datetimeTreatmentStart,
            DateTime.local().startOf("day"))
            .splitBy({ days: 1 }).filter(d => {
                return !this.savedReports[d.start.toISODate()]
            }).map(d => {
                return d.start.toISODate()
            }))
    }

    @computed get nasueaSelected() {
        return (
            this.report.selectedSymptoms.includes('nausea') && this.report.nauseaRating === ""
        )
    }

    //Calendar Selection
    @observable selectedDate = DateTime.local();

    @action register(body) {
        return this.executeRequest('register', body).then(json => {
            this.setAccountInformation(json);
        });
    }

    @action toggleSymptomWarningVisibility() {
        this.uiState.symptomWarningVisible = !this.uiState.symptomWarningVisible
    }

    @action saveNote(body) {
        return this.executeRequest('saveNote', body).then(json => {
            this.notes = json;
        });
    }

    @action saveReportingState = () => {
        this.lastSubmission = DateTime.local().toISO();
        if (!this.report.isHistoricalReport) {
            localStorage.setItem(`medicationReport`, JSON.stringify(this.report));
        }
    };

    @action photoSubmission = () => {
        this.report.hasSubmittedPhoto = true;
        this.uiState.onPhotoFlow = false;
        this.uiState.onTreatmentFlow = true;
    }

    @action submitOfflineReport = () => {
        addReportToOfflineCache(toJS(this.report)).then(value => {
            this.report.hasConfirmedAndSubmitted = true;
            this.saveReportingState();
        })
    }

    @action uploadReport = (body) => {

        this.executeRequest('dailyReport', body).then(json => {
            if (!body.isHistoricalReport) {
                this.report.hasConfirmedAndSubmitted = true;
                this.saveReportingState();
            }
            this.getReports();
        })
    }

    @action getReports = () => {
        this.savedReportsLoaded = false;
        this.executeRequest('patientReports').then(json => {
            this.savedReportsLoaded = true;
            this.savedReports = json;
        })
    }

    @action updateNotificationTime = (turnOff) => {
        let body = { time: DateTime.fromISO(this.newReminderTime).startOf('minute').toISOTime() }

        if (turnOff) {
            body.enabled = false;
        }

        this.isReminderUpdating = true;
        this.executeRequest('updateNotificationTime', body).then(json => {
            this.isReminderUpdating = false;
            if (json.isoTime) {
                this.reminderTime = json.isoTime
            } else {
                this.reminderTime = null;
            }
        });
    }

    @action setPhotoSkipped = () => {
        this.report.photoWasSkipped = true
    }

    disableMedicationReminder = () => {
        this.updateNotificationTime(true);
    }

    @action startHistoricalReport = (date) => {

        this.report = {
            date: DateTime.fromISO(date),
            step: 0,
            selectedSymptoms: [],
            photoWasTaken: false,
            photoString: "",
            tookMedication: true,
            headerText: "",
            hasSubmitted: false,
            hasSubmittedPhoto: false,
            isHistoricalReport: true
        }
    }

    loadDailyReport() {
        const json = localStorage.getItem(`medicationReport`);

        if (json) {
            const lsReport = JSON.parse(json);
            //Check if the report was from a previous day, if not load the default report
            if (lsReport.date && Math.floor(DateTime.fromISO(lsReport.date).diffNow("days").days * -1) === 0) {
                this.report = lsReport
                return
            }
        }
        this.report = this.defaultReport;
    }

    getReportFromDateTime = (date) => {
        return this.savedReports[`${date.toISODate()}`]
    }

    @action uploadPhoto = async () => {
        const resizedImage = await resizeImage(this.report.photoString);
        const imageString = resizedImage.replace(/^data:image\/\w+;base64,/, "")
        const file = new Buffer(imageString, 'base64')

        this.photoIsUploading = true;

        return this.executeRequest('getPhotoUploadURL').then((json) => {
            return fetch(json.url, {
                method: 'PUT',
                body: file
            }).then((res) => {
                this.photoIsUploading = false;
                return json.key
            }).catch((e) => {
                this.photoIsUploading = false;
                console.error(e);
            });
        })
    }

    @action checkNumberOfOfflineReports = () => {
        getNumberOfCachedReports().then(value => {
            this.numberOfflineReports = value;
        })
    }

    @computed get missingReports() {

        const checkDate = (date) => {
            return this.savedReports && this.savedReports[date] && this.savedReports[date].status && this.savedReports[date].status.medicationReport
        }

        //So that the missing days card stays hidden before the reports load from server
        if (!this.savedReportsLoaded) {
            return 0;
        }

        //Prevent duplicated days by using a hash and extracting keys
        let missedDays = {};

        for (let j = 0; j < 14; j++) {
            let newDate = DateTime.fromISO(this.treatmentStart).plus({ days: j })
            const date = newDate.toISODate();
            if (!checkDate(date) && newDate.diffNow("days").days < -1) {
                missedDays[date] = true;
            }
        }

        //Past 3 days
        for (let i = 3; i > 0; i--) {
            let date = DateTime.local().minus({ days: i }).startOf('day')
            const isoDate = date.toISODate();
            if (!checkDate(isoDate) && DateTime.fromISO(this.treatmentStart).startOf('day').diff(date, "days").days <= 0) {
                missedDays[isoDate] = true;
            }
        }
        return Object.keys(missedDays);
    }

    @action exitForcedPasswordChange = () => {
        this.hasForcedPasswordChange = false;
    }

    @action logoutPatient() {
        this.logout();
        //@TODO Cleanup this method with cookie update
        this.userID = ""
        this.token = ""
        this.name = ""
        this.phone_number = ""
        this.information = {}
        this.notes = []
        this.expired = false;
        this.report = this.defaultReport;
        this.uiState = {
            onTreatmentFlow: false,
            onPhotoFlow: false,
            onCalendarView: false,
            cameraIsOpen: false,
            selectedCalendarDate: DateTime.local().startOf('day'),
            symptomWarningVisible: false
        }
    }

    //Streak calculated on server can only produce streak from yesterday. 
    //If the user has completed their treatment today, this will add oneday
    @computed get getCurrentStreak() {
        let streak = this.patientInformation.currentStreak;
        const todayCounts = this.report.date === DateTime.local().toISODate() && this.report.tookMedication && this.report.hasSubmitted
        if (streak === null) streak = 0;
        if (todayCounts) {
            streak += 1;
        }

        return streak;
    }

    @computed get contactTracingNeeded() {
        return !this.lastContactTracingSurvey || (daysSinceISODateTime(this.lastContactTracingSurvey.createdAt) > 30 && (this.lastContactTracingSurvey.numberOfContactsTested < this.lastContactTracingSurvey.numberOfContacts))
    }

    defaultReport = {
        date: DateTime.local().toISODate(),
        selectedSymptoms: [],
        photoWasTaken: false,
        photoString: "",
        tookMedication: true,
        whyMedicationNotTaken: "",
        headerText: "",
        hasSubmitted: false,
        hasSubmittedPhoto: false,
        hasConfirmedAndSubmitted: false,
        isHistoricalReport: false,
        doingOkay: true,
        doingOkaySelected: false,
        supportReason: "",
        nauseaRating: "",
        photoWasSkipped: false,
        whyPhotoWasSkipped: ""
    }

    @computed get isArchived() {
        return this.status === "Archived"
    }

    @computed get eligibleForBackPhoto() {
        if (this.lastPhotoRequestStatus.photoWasSubmitted) {
            return false;
        }
        return daysSincePhotoRequest(this.lastPhotoRequestStatus.dateOfRequest) <= 3
    }

    @action setTookMedication = (tookMedication) => {
        this.report.tookMedication = tookMedication;
    }

    @action setReportHeader = (text) => {
        this.report.headerText = text;
    }

    @action submitOneStepReport = (date = DateTime.local().toISODate()) => {

        if(this.reportStore.checkOffline()){
            this.report.tookMedication = true;
            this.report.hasSubmitted = true;
            this.saveReportingState();
            this.reportStore.checkIfOfflineAndSaveReportLocally();
            this.oneStepStatus.loadingComplete = true;
            return 
        }

        this.oneStepStatus.loading = true;
        this.executeRequest('oneStepReport', { date: date }).then(
            response => {
                this.oneStepStatus.loading = false;
                if (response && !response.error) {
                    this.report.hasSubmitted = true;
                    this.oneStepStatus.loadingComplete = true;
                    this.submissionError = false;
                    this.saveReportingState();
                    this.getReports();
                } else {
                    this.submissionError = true;
                }

            }
        )
    }

    submitOneStepBackReport = (date) => {
        return this.executeRequest('oneStepReport', { date: date })
    }

    @action updateReports = (report) => {
        this.savedReports[`${report.date}`] = report;
    }


}
