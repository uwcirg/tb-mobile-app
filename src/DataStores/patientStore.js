import { action, observable, computed, toJS } from "mobx";
import { UserStore } from './userStore';
import { DateTime, Interval } from 'luxon';
import EducationStore from './educationStore';
import ReportStore from './reportStore';
import { addReportToOfflineCache, getNumberOfCachedReports } from './SaveReportOffline'
import resizeImage from '../Utility/ResizeImage';

const ROUTES = {
    login: ["/authenticate", "POST"],
    getCurrentPatient: ["/patient/me", "GET"],
    getVapidKey: ["/push_key", "GET"],
    dailyReport: ["/daily_report", "POST"],
    patientReports: ["/daily_reports", "GET"],
    getPhotoUploadURL: ["/patient/daily_reports/photo_upload_url", "GET"],
    updateNotificationTime: ["/patient/reminder", "PATCH"],
    updateEducationStatus: ["/patient/me/education_status", "POST"]
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
    @observable educationStatus = [];

    @observable status = "Active";
    @observable isReminderUpdating = false;

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

    @observable treatmentFlowLength = 0;

    @observable newMilestone = {
        datetime: DateTime.local(),
        title: "",
        location: "",
        allDay: false
    }

    @observable lastSubmission = DateTime.local().toISO();

    @observable photoIsUploading = false;

    @observable newReminderTime = "";

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
            if (json.status) {
                this.status = json.status;
                this.hasForcedPasswordChange = json.hasForcedPasswordChange;
                this.reminderTime = json.dailyNotificationTime;
                this.patientInformation.weeksInTreatment = json.weeksInTreatment;
                this.educationStore.educationStatus = json.educationStatus;
                this.photoSchedule = json.photoSchedule.reduce((a, b) => (a[b] = true, a), {});
            }
        });
    }

    @action setAccountInformation(json) {
        this.photoSchedule = json.photoSchedule.reduce((a, b) => (a[b] = true, a), {});
        this.patientInformation.weeksInTreatment = json.weeksInTreatment;
        this.treatmentStart = json.treatmentStart
        this.patientInformation.daysInTreatment = json.daysInTreatment;
        this.patientInformation.currentStreak = json.currentStreak;
        this.educationStore.educationStatus = json.educationStatus;
        this.hasForcedPasswordChange = json.hasForcedPasswordChange;
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

    //Precondiditon - Requires a luxon datetime object
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

    //Streak calculated on server can only produce streak from yesterday. 
    //If the user has completed their treatment today, this will add oneday
    @computed get getCurrentStreak() {
        let streak = this.patientInformation.currentStreak;
        if (streak === null) streak = 0;
        if (this.report.hasConfirmedAndSubmitted && this.report.tookMedication) {
            streak += 1;
        }

        return streak;
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

    @action reportMedication(body) {
        return this.executeRequest('reportMedication', body).then(json => {
            this.getPatientInformation();
        });
    }

    @action reportSymptoms(body) {
        return this.executeRequest('reportSymptoms', body).then(json => {
            this.getPatientInformation();
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

    @action submitReport = (offline) => {

        if (!offline) {
            this.modifyReportAndUpload(this.report)
        } else {
            addReportToOfflineCache(toJS(this.report)).then(value => {
                this.report.hasConfirmedAndSubmitted = true;
                this.saveReportingState();
            })
        }
    }

    modifyReportAndUpload = (report) => {
        let body = {};
        report.selectedSymptoms.map((value) => {
            body[value] = true
        })
        body.date = report.date;
        body.medicationWasTaken = report.tookMedication;
        body.whyMedicationNotTaken = report.whyMedicationNotTaken;
        body.dateTimeTaken = report.timeTaken;
        body.doingOkay = report.doingOkay;
        body.doingOkayReason = report.supportReason;
        body.isHistoricalReport = report.isHistoricalReport;
        body.nauseaRating = report.nauseaRating;

        if (report.photoString) {
            this.uploadPhoto().then(res => {
                body.photoUrl = res
                this.uploadReport(body);
            })
        } else {
            this.uploadReport(body);
        }
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

        this.executeRequest('patientReports').then(json => {
            this.savedReportsLoaded = true;
            this.savedReports = json;
        })
    }

    @action updateNotificationTime = (turnOff) => {
        let body = { time: this.newReminderTime }

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

    @action startHistoricalReport = () => {
        const newDate = DateTime.fromISO(this.uiState.selectedCalendarDate).set({ hour: 12, minute: 0 })

        this.report = {
            date: newDate.toISODate(),
            step: 0,
            timeTaken: newDate.toISOTime({ suppressSeconds: true }),
            selectedSymptoms: [],
            photoWasTaken: false,
            photoString: "",
            tookMedication: true,
            headerText: "When did you take your medication?",
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

    @action uploadPhoto = async() =>{
        const resizedImage= await resizeImage(this.report.photoString);
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

        //So that the missing days card stays hidden before the reports load from server
        if (!this.savedReportsLoaded) {
            return 0;
        }

        let missedDays = [];

        //Past 3 days
        for (let i = 3; i > 0; i--) {
            let date = DateTime.local().minus({ days: i })
            const isoDate = date.toISODate();
     
            if (!this.savedReports[isoDate] && DateTime.fromISO(this.treatmentStart).diff(date,"days").days <= -1) {
                missedDays.push(isoDate)
            }
        }

        for (let j = 0; j < 14; j++) {
            let newDate = DateTime.fromISO(this.treatmentStart).plus({ days: j })
            const date = newDate.toISODate();
            if (!this.savedReports[date] && newDate.diffNow("days").days < -1) {
                missedDays.push(date)
            }
        }

        return missedDays;
    }

    @action exitForcedPasswordChange = () => {
        this.hasForcedPasswordChange = false;
    }

    @action setReportTime = (value) => {
        this.report.timeTaken = value;
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

    defaultReport = {
        date: DateTime.local().toISODate(),
        timeTaken: DateTime.local().startOf('second').startOf("minute").toISOTime({ suppressSeconds: true }),
        selectedSymptoms: [],
        photoWasTaken: false,
        photoString: "",
        tookMedication: true,
        whyMedicationNotTaken: "",
        headerText: "When did you take your medication?",
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


}
