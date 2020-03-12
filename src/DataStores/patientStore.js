import { action, observable, computed} from "mobx";
import {UserStore} from './userStore';

const ROUTES = {
    login: ["/authenticate","POST"],
    register: ["/participant","POST"],
    saveNote: ["/participant/current/notes","POST"],
    reportMedication: ["/participant/current/medication_report","POST"],
    reportSymptoms: ["/participant/current/symptom_report","POST"],
    getCurrentPatient: ["/patient/me","GET"],
    getVapidKey: ["/push_key","GET"]
}

export class PatientStore extends UserStore {

    //Takes in a data fetching strategy, so you can swap out the API one for testing data
    constructor(strategy) {
        super(strategy,ROUTES,"Patient")
    }

    @observable onTreatmentFlow = false;

    @observable medicationStep = 0;
    @observable givenName = ""
    @observable cameraIsOpen = false;
    @observable medicationWasReported = false;

    //MedicationFlow Variables
    medicationTime = "";
    @observable selectedSymptoms = [];
    @observable photoWasTaken = false;
    photoString = "";

    @observable report = {
        tookMedication: true,
        headerText: "When did you take your medication?"
    }

    setAccountInformation(json){
        this.information = json;
        this.givenName = json.given_name;
        this.familyName = json.family_name;
        this.userID = json.id;
        this.phoneNumber= json.phone_number;
        this.notes = json.notes;
    }

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
