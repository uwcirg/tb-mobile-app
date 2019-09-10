import { action, observable,toJS} from "mobx";

const ROUTES = {
    login: ["/auth/login/participant","POST"],
    register: ["/participant","POST"],
    saveNote: ["/participant/current/notes","POST"]
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

    setAccountInformation(json){
        //console.log(json);
        this.information = json;
        this.name = json.name;
        this.phone_number= json.phone_number;
        this.notes = json.notes;
    }

    @action getParticipantInformation(){
        //Eventually make this 
        this.strategy.executeRawRequest(`/participant/current`,"GET").then(json =>{
            this.setAccountInformation(json);
        });
    }

    //Not quite sure where to put these yet
    @action authenticate(body){

        return this.strategy.executeRequest(ROUTES,'login',body).then(json =>{
            if(json && json.uuid){
                localStorage.setItem("user.token", json.token);
                localStorage.setItem(`participant.uuid`,json.uuid);
                this.getParticipantInformation();
                return
            }
            return new Error("Wrong password")
        });
    }

    @action register(body){
        return this.strategy.executeRequest(ROUTES,'register',body).then(json =>{
            this.setAccountInformation(json);
        });
    }

    @action saveNote(body){
        return this.strategy.executeRequest(ROUTES,'saveNote',body).then(json => {
            this.notes = json;
        });
    }
}