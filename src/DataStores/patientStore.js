import { action, observable, computed, autorun, toJS } from "mobx";
import { UserStore } from './userStore';
import { DateTime, Interval } from 'luxon';

const ROUTES = {
    login: ["/authenticate", "POST"],
    getCurrentPatient: ["/patient/me", "GET"],
    getVapidKey: ["/push_key", "GET"],
    dailyReport: ["/daily_report", "POST"],
    patientReports: ["/daily_reports", "GET"],
    getPhotoUploadURL: ["/patient/daily_reports/photo_upload_url", "GET"],
    updateNotificationTime: ["/patient/reminder", "PATCH"],
    getMilestones: ["/patient/me/milestones", "GET"]
}

export class PatientStore extends UserStore {

    //Takes in a data fetching strategy, so you can swap out the API one for testing data
    constructor(strategy) {
        super(strategy, ROUTES, "Patient")
    }

    @observable patientInformation = {
        daysInTreatment: 0,
        currentStreak: 0
    }

    //@observable notificationTime = DateTime.fromISO("12:00:00").toISOTime();
    @observable isReminderUpdating = false;

    @observable treatmentStart = ""

    //For intro to UI
    @observable introEnabled = false;

    @observable uiState = {
        onCalendarView: false,
        cameraIsOpen: false,
        selectedCalendarDate: DateTime.local().startOf('day'),
        symptomWarningVisible: false,
    }
    @observable medicationSchedule = []
    @observable savedReports = [];
    @observable milestones = [];

    @observable report = this.defaultReport;

    @observable treatmentFlowLength = 0;

    @observable newMilestone = {
        datetime: DateTime.local(),
        title: "",
        location: "",
        allDay: false
    }

    @action setAccountInformation(json){
        
        this.photoSchedule = JSON.parse(json.medicationSchedule)
        this.treatmentStart = json.treatmentStart
        this.patientInformation.daysInTreatment = json.daysInTreatment;
        this.patientInformation.currentStreak = json.currentStreak;
        super.setAccountInformation(json);
      
    }

    @computed get datetimeTreatmentStart() {
        return DateTime.fromISO(this.treatmentStart).startOf('day')
    }

    @computed get selectedDayReport() {
        return this.savedReports[`${this.uiState.selectedCalendarDate.toISODate()}`]
    }

    @computed get requiresSubmission() {
        return (this.report.hasSubmitted && (!this.isPhotoDay || this.report.hasSubmittedPhoto) && !this.report.hasConfirmedAndSubmitted)
    }

    @computed get selectedDayWasPhotoDay() {
        let weekday = this.uiState.selectedCalendarDate.weekday
        let weekSinceStart = Math.floor(DateTime.fromISO(this.treatmentStart).endOf('day').diffNow("weeks").weeks * -1)
        return (this.photoSchedule[weekSinceStart].includes(weekday));
    }


    @computed get daysSinceTreatmentStart() {
        return Math.floor(DateTime.fromISO(this.treatmentStart).endOf('day').diffNow("days").days * -1)
    }

    @computed get isPhotoDay() {
        let weekday = DateTime.local().weekday;
        let weekSinceStart = Math.floor(DateTime.fromISO(this.treatmentStart).endOf('day').diffNow("weeks").weeks * -1)
        return (this.photoSchedule[weekSinceStart].includes(weekday));
    }

    checkPhotoDay(date) {
        let weekday = date.weekday;
        let weekSinceStart = Math.floor(DateTime.fromISO(this.treatmentStart).endOf('day').diffNow("weeks").weeks * -1)
        return (this.photoSchedule[weekSinceStart].includes(weekday));
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
    @computed get getCurrentStreak(){
        let streak = this.patientInformation.currentStreak;
        if(this.report.hasConfirmedAndSubmitted && this.report.tookMedication){
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

    saveReportingState = () => {
        if (!this.report.isHistoricalReport) {
            localStorage.setItem(`medicationReport`, JSON.stringify(this.report));
        }

    };

    @action photoSubmission = () => {
        this.report.hasSubmittedPhoto = true;
        if (this.report.hasSubmitted) {

        }
        this.uiState.onPhotoFlow = false;
        this.uiState.onTreatmentFlow = true;
    }

    @action submitReport = () => {
        let body = {};
        this.report.selectedSymptoms.map((value) => {
            body[value] = true
        })
        body.date = this.report.date;
        body.medicationWasTaken = this.report.tookMedication;
        body.whyMedicationNotTaken = this.report.whyMedicationNotTaken;
        body.dateTimeTaken = this.report.timeTaken;
        body.doingOkay = this.report.doingOkay;

        if (this.isPhotoDay && this.report.photoString) {
            this.uploadPhoto().then(res => {
                body.photoUrl = res
                this.executeRequest('dailyReport', body).then(json => {
                    this.uploadReport(body);
                })
            })
        } else {
            this.executeRequest('dailyReport', body).then(json => {
                this.uploadReport(body);
            })
        }
    }

    @action uploadReport = (body) => {
        this.executeRequest('dailyReport', body).then(json => {
            this.report.hasConfirmedAndSubmitted = true;
            this.saveReportingState();
            this.getReports();
        })

    }

    @action getReports = () => {

        this.executeRequest('patientReports').then(json => {
            (json)
            this.savedReports = json;
        })
    }

    @action openReportConfirmation = () => {
        this.uiState.onTreatmentFlow = true;
        this.report.step = 4;
    }

    @action updateNotificationTime = () => {
        const body = { time: this.reminderTime }
        this.isReminderUpdating = true;
        this.executeRequest('updateNotificationTime', body).then(json => {

            if (json.isoTime) {
                this.reminderTime = json.isoTime
                this.isReminderUpdating = false;
            }
        });
    }

    @action getMilestones() {
        this.executeRequest('getMilestones').then((json) => {
            this.milestones = json[0] ? json : []
        })
    }

    @action postMilestone = () => {
        this.executeRawRequest(`/patient/${this.userID}/milestones`, "POST", this.newMilestone).then(response => {
            this.milestones.push(response);
        })
    }

    @action startHistoricalReport = () => {

        //Set The date for the report and reset other stuff
        const newDate = this.uiState.selectedCalendarDate.set({ hour: 12, minute: 0 });

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

    @action skipToReportConfirmation = () => {
        //Any Length Greater than the report will default to last step
        this.report.step = 100
        this.uiState.onTreatmentFlow = true;
    }

    loadDailyReport() {
        const json = localStorage.getItem(`medicationReport`);

        if (json) {
            const lsReport = JSON.parse(json);
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

    uploadPhoto = () => {

        const imageString = this.report.photoString.replace(/^data:image\/\w+;base64,/, "")
        const file = new Buffer(imageString, 'base64')

        return this.executeRequest('getPhotoUploadURL').then((json) => {
            return fetch(json.url, {
                method: 'PUT',
                body: file
            }).then((res) => {
                return json.key
            }).catch((e) => {
                console.error(e);
            });
        })
    }

    @action initalize() {
        super.initalize()
        this.loadDailyReport();
        this.getMilestones();
        this.getReports();
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



        //Remove persistant user information
        //this.unsubscribeFromNotifications();

    }

    defaultReport = {
            date: DateTime.local().toISODate(),
            step: 0,
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
            doingOkaySelected: false
    }


}
