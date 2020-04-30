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
    updateNotificationTime: ["/patient/reminder","PATCH"]
}

export class PatientStore extends UserStore {

    //Takes in a data fetching strategy, so you can swap out the API one for testing data
    constructor(strategy) {
        super(strategy, ROUTES, "Patient")
    }

    //@observable notificationTime = DateTime.fromISO("12:00:00").toISOTime();
    @observable isReminderUpdating = false;

    @observable treatmentStart = ""

    //For intro to UI
    @observable introEnabled = false;

    @observable uiState = {
        onTreatmentFlow: false,
        onHistoricalTreatmentFlow: false,
        onPhotoFlow: false,
        onCalendarView: false,
        cameraIsOpen: false,
        selectedCalendarDate: DateTime.local().startOf('day'),
        symptomWarningVisible: false,
    }
    @observable medicationSchedule = []
    @observable savedReports = [];
    @observable milestones = [];

    @observable report = {
        date: DateTime.local().toISODate(),
        step: 0,
        timeTaken: DateTime.local().startOf('second').startOf("minute").toISOTime({ suppressSeconds: true }),
        selectedSymptoms: [],
        photoWasTaken: false,
        photoString: "",
        tookMedication: true,
        headerText: "When did you take your medication?",
        hasSubmitted: false,
        hasSubmittedPhoto: false,
        isHistoricalReport: false
    }

    @observable newMilestone = {
        datetime: DateTime.local(),
        title: "",
        location: "",
        allDay: false
    }

    @computed get datetimeTreatmentStart() {
        return DateTime.fromISO(this.treatmentStart).startOf('day')
    }

    @computed get selectedDayReport() {
        return this.savedReports[`${this.uiState.selectedCalendarDate.toISODate()}`]
    }


    @computed get daysSinceTreatmentStart() {
        return Math.floor(DateTime.fromISO(this.treatmentStart).endOf('day').diffNow("days").days * -1)
    }

    @computed get isPhotoDay() {
        let weekday = DateTime.local().weekday;
        let weekSinceStart = Math.floor(DateTime.fromISO(this.treatmentStart).endOf('day').diffNow("weeks").weeks * -1)
        return (this.photoSchedule[weekSinceStart].includes(weekday));
    }

    checkPhotoDay(date){
        let weekday = date.weekday;
        let weekSinceStart = Math.floor(DateTime.fromISO(this.treatmentStart).endOf('day').diffNow("weeks").weeks * -1)
        return (this.photoSchedule[weekSinceStart].includes(weekday));
    }

    @computed get selectedDateForDisplay() {
        return this.selectedDate.toLocaleString(DateTime.DATE_FULL)
    }

    @computed get dailyActionsCompleted() {
        return (!this.isPhotoDay || this.report.hasSubmittedPhoto) && this.report.hasSubmitted
    }

    @computed get numberOfPhotoReports() {

        return Object.values(toJS(this.savedReports)).reduce((total, report) => {
            if (report.photoURL) {
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
                const isoDate = d.start.toISODate()
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

    saveReportingState = autorun(() => {
        //Update Locally Saved Report State on step change or on submit. Do not do this for historical reports
        const reportIsFromToday = (this.report.date === DateTime.local().toISODate())
        if (reportIsFromToday && (this.report.step > 0 || this.report.hasSubmitted) ) {
            
            localStorage.setItem(`medicationReport`, JSON.stringify(this.report));

        }
    });

    @action photoSubmission = () => {
        this.report.hasSubmittedPhoto = true;
        this.uiState.onPhotoFlow = false;
        this.uiState.onTreatmentFlow = true;
        this.report.step = 3;
    }

    @action submitReport = () => {
        let body = {};
        this.report.selectedSymptoms.map((value) => {
            body[value] = true
        })
        body.date = this.report.date;
        body.medicationWasTaken = this.report.tookMedication;
        body.dateTimeTaken = this.report.timeTaken;

        if (this.isPhotoDay && this.report.photoString) {
            this.uploadPhoto().then(res => {
                body.photoURL = res
                this.executeRequest('dailyReport', body).then(json => {
                    this.report.hasSubmitted = true;
                    this.uiState.onTreatmentFlow = false;
                    this.getReports();
                })

            })
        } else {
            this.executeRequest('dailyReport', body).then(json => {
                this.report.hasSubmitted = true;
                this.uiState.onTreatmentFlow = false;
                this.uiState.onHistoricalTreatmentFlow = false;
                this.getReports();
            })
        }
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
        const body = {time: this.reminderTime}
        this.isReminderUpdating = true;
        this.executeRequest('updateNotificationTime',body).then(json => {

            if(json.isoTime){
                this.reminderTime = json.isoTime
                this.isReminderUpdating = false;
            }
            
        });
    }

    @action postMilestone = () => {

        this.executeRawRequest(`/patient/${this.userID}/milestones`,"POST").then(response => {
            console.log(response)
        })

    }

    @action startHistoricalReport = () => {

        //Set The date for the report and reset other stuff
        const newDate = this.uiState.selectedCalendarDate.set({hour: 12, minute: 0});

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
        }


    }

    loadDailyReport() {
        const json = localStorage.getItem(`medicationReport`);

        if (json) {
            const lsReport = JSON.parse(json);
            if (lsReport.date && Math.floor(DateTime.fromISO(lsReport.date).diffNow("days").days * -1) === 0) {
                this.report = lsReport
            }

        }
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
        this.getReports();
    }

    @action logoutPatient(){
        console.log("here")
        this.logout();
        //Clear MobX Session Data
        this.userID = ""
        this.token = ""
        this.name = ""
        this.phone_number = ""
        this.information = {}
        this.notes = []
        this.expired = false;
        this.report = {
            date: DateTime.local().toISODate(),
            step: 0,
            timeTaken: DateTime.local().startOf('second').startOf("minute").toISOTime({ suppressSeconds: true }),
            selectedSymptoms: [],
            photoWasTaken: false,
            photoString: "",
            tookMedication: true,
            headerText: "When did you take your medication?",
            hasSubmitted: false,
            hasSubmittedPhoto: false
        }
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

}
