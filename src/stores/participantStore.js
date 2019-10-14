import { action, observable,toJS} from "mobx";
import { mdiJson } from "@mdi/js";

const ROUTES = {
    login: ["/auth/login/participant","POST"],
    register: ["/participant","POST"],
    saveNote: ["/participant/current/notes","POST"],
    reportMedication: ["/participant/current/medication_report","POST"],
    reportSymptoms: ["/participant/current/symptom_report","POST"],
    getCurrentParticipant: ["/participant/current","GET"]
}

export class ParticipantStore {

    //Takes in a data fetching strategy, so you can swap out the API one for testing data
    constructor(strategy) {
        this.strategy = strategy;
    }

    @observable uuid = ""
    @observable name = ""
    @observable phone_number = ""
    @observable information = {}
    @observable notes = []
    @observable expired = false;

    executeRequest(type,body){
        return this.strategy.executeRequest(ROUTES,type,body).then(res =>{
            if( res instanceof Error){
                //Check if loggin to provide different error
                if(type != "login"){

                    //The token expiration should only be set to true if they 
                    //have not already been logged out, this prevents 2 messages
                    if(this.uuid){
                    this.expired = true;
                    }
                }
                return ""
            }else{
                return res
            }
        })
    }

    setAccountInformation(json){
        this.information = json;
        this.name = json.name;
        this.uuid = json.uuid;
        this.phone_number= json.phone_number;
        this.notes = json.notes;
    }

    @action getParticipantInformation(){
        this.executeRequest('getCurrentParticipant').then(json =>{
            this.setAccountInformation(json);
        })
    }

    //Not quite sure where to put these yet
    @action authenticate(body){

        return this.executeRequest('login',body).then(json =>{
            if(json && json.uuid){
                localStorage.setItem("user.token", json.token);
                console.log(json.token)
                localStorage.setItem("token.exp",json.exp);
                localStorage.setItem(`participant.uuid`,json.uuid);
                this.getParticipantInformation();
                return
            }
            return new Error("Wrong password")
        });
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
            this.getParticipantInformation();
        });
    }

    @action reportSymptoms(body){
       
        return this.executeRequest('reportSymptoms',body).then(json => {
           this.getParticipantInformation();
        });
    }

    @action logout(){
        this.uuid = ""
        this.name = ""
        this.phone_number = ""
        this.information = {}
        this.notes = []
        this.expired = false;

    }
}