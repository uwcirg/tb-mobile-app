import { action, observable, computed, autorun } from "mobx";
import { UserStore } from './userStore';
import { DateTime } from 'luxon';

const ROUTES = {
    login: ["/authenticate", "POST"],
    getCurrentPatient: ["/patient/me", "GET"],
    getVapidKey: ["/push_key", "GET"],
    dailyReport: ["/daily_report", "POST"],
    patientReports: ["/daily_reports", "GET"],
    getPhotoUploadURL: ["/patient/daily_reports/photo_upload_url","GET"]
}

export class PatientStore extends UserStore {

    //Takes in a data fetching strategy, so you can swap out the API one for testing data
    constructor(strategy) {
        super(strategy, ROUTES, "Patient")

        const json = localStorage.getItem(`medicationReport`);

        if (json) {
            const lsReport = JSON.parse(json);
            if (lsReport.date) {
                //Is the stored report from today? -> Load the state
                if (Math.floor(DateTime.fromISO(lsReport.date).diffNow("days").days * -1) === 0) {
                    this.report = lsReport
                }
            }
        }
    }

    @computed get selectedDayReport() {
        return this.savedReports[`${this.uiState.selectedCalendarDate.toISODate()}`]
    }

    @observable treatmentStart = ""

    @observable uiState = {
        onTreatmentFlow: false,
        onPhotoFlow: false,
        onCalendarView: false,
        cameraIsOpen: false,
        selectedCalendarDate: DateTime.local().startOf('day')
    }

    @observable medicationSchedule = []

    @observable savedReports = [];

    //MedicationFlow Variables
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
        hasSubmittedPhoto: false
    }

    @computed get daysSinceTreatmentStart() {
        return Math.floor(DateTime.fromISO(this.treatmentStart).endOf('day').diffNow("days").days * -1)
    }

    @computed get isPhotoDay() {
        let weekday = DateTime.local().weekday;
        let weekSinceStart = Math.floor(DateTime.fromISO(this.treatmentStart).endOf('day').diffNow("weeks").weeks * -1)
        return (this.photoSchedule[weekSinceStart].includes(weekday));
    }

    @computed get selectedDateForDisplay() {
        return this.selectedDate.toLocaleString(DateTime.DATE_FULL)
    }

    @computed get dailyActionsCompleted(){
        return this.report.hasSubmittedPhoto && this.report.hasSubmitted
    }

    //Calendar Selection
    @observable selectedDate = DateTime.local();

    @action register(body) {
        return this.executeRequest('register', body).then(json => {
            this.setAccountInformation(json);
        });
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
        if (this.report.step > 0 || this.report.hasSubmitted) {
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

        if(this.isPhotoDay && this.report.photoString){
            this.uploadPhoto().then( res => {
                body.photoURL = res
                this.executeRequest('dailyReport', body).then(json => {
                    this.report.hasSubmitted = true;
                    this.uiState.onTreatmentFlow = false;
                    this.getReports();
                })
                
            })
        }else{
            this.executeRequest('dailyReport', body).then(json => {
                this.report.hasSubmitted = true;
                this.uiState.onTreatmentFlow = false;
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

    getReportFromDateTime = (date) => {
        return this.savedReports[`${date.toISODate()}`]
    }

    uploadPhoto = () => {

        const imageString = this.report.photoString.replace(/^data:image\/\w+;base64,/, "")
        const file = new Buffer(imageString, 'base64')

        return this.executeRequest('getPhotoUploadURL').then( (json) => {
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
        this.getReports();
    }

    @action logout() {

        super.logout();
        //Remove persistant user information
        this.clearLocalStorage();
        //this.unsubscribeFromNotifications();

        //Clear MobX Session Data
        this.userID = ""
        this.token = ""
        this.name = ""
        this.phone_number = ""
        this.information = {}
        this.notes = []
        this.expired = false;
        this.isLoggedIn = false;
    }
}
