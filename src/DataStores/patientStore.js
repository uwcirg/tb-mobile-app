import { action, observable, computed, autorun} from "mobx";
import {UserStore} from './userStore';
import {DateTime} from 'luxon';

const ROUTES = {
    login: ["/authenticate","POST"],
    register: ["/participant","POST"],
    saveNote: ["/participant/current/notes","POST"],
    reportMedication: ["/participant/current/medication_report","POST"],
    reportSymptoms: ["/participant/current/symptom_report","POST"],
    getCurrentPatient: ["/patient/me","GET"],
    getVapidKey: ["/push_key","GET"]
}

export class PatientStore extends UserStore{

    //Takes in a data fetching strategy, so you can swap out the API one for testing data
    constructor(strategy) {
        super(strategy,ROUTES,"Patient")

        const json = localStorage.getItem(`medicationReport`);

        if(json){
            const lsReport = JSON.parse(json);
            if(lsReport.date){
                //Is the stored report from today? -> Load the state
                if(Math.floor(DateTime.fromISO(lsReport.date).diffNow("days").days * -1) === 0){
                    console.log("same date")
                    this.report = lsReport
                }else{
                    console.log("not same date")
                    //Dont mess with exisiting one
                    return
                }
        }
        }
    }

    @observable treatmentStart = ""

    @observable uiState = {
        onTreatmentFlow: false,
        onPhotoFlow: false,
        onCalendarView: false,
        cameraIsOpen: false,
    }

    @observable medicationSchedule = []

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
    }

    @computed get hasReportedToday(){
        return false
    }

    @computed get daysSinceTreatmentStart(){
        return Math.floor(DateTime.fromISO(this.treatmentStart).diffNow("days").days * -1)
    }

    @computed get isPhotoDay(){
        let weekday = DateTime.local().weekday;
        let weekSinceStart = Math.floor(DateTime.fromISO(this.treatmentStart).diffNow("weeks").weeks * -1)
        return(this.photoSchedule[weekSinceStart].includes(weekday));
    }

    @computed get selectedDateForDisplay() {
        return this.selectedDate.toLocaleString(DateTime.DATE_FULL)
    }

    //Calendar Selection
    @observable selectedDate = DateTime.local();

    @action register(body){
        return this.executeRequest('register',body).then(json =>{
            this.setAccountInformation(json);
        });
    }

    @action saveNote(body){
        return this.executeRequest('saveNote',body).then(json => {
            this.notes = json;
        });
    }

    @action reportMedication(body){
        return this.executeRequest('reportMedication',body).then(json => {
            this.getPatientInformation();
        });
    }

    @action reportSymptoms(body){
       
        return this.executeRequest('reportSymptoms',body).then(json => {
           this.getPatientInformation();
        });
    }


    saveReportingState = autorun(() =>{
        if(this.report.step > 0){
            console.log("activated")
            localStorage.setItem(`medicationReport`,JSON.stringify(this.report));
        }
        
    });

    @action logout(){
       
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
