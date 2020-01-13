import { action, observable,toJS} from "mobx";

const ROUTES = {
    login: ["/auth/login/coordinator","POST"],
    post_resolution: ["/resolution","POST"],
    get_records: ["/participant/all", "GET"],
    get_coordinator: ["/coordinator/current", "GET"],
    set_photo_status:["/photo"],
    add_coordinator:["/coordinator", "POST"]
}

export class CoordinatorStore {

    @observable loginEmail = "";
    @observable loginPassword = "";

    @observable uuid = ""
    @observable name = ""
    @observable email = ""
    @observable participantRecords = []
    @observable resolutions = []
    @observable expired = false;

    //Participant Page Information
    @observable currentParticipant = {}

    /*
            adherence: 0,
        medication_reports: [],
        name: "",
        notes: [],
        phone_number: "",
        strip_reports: [],
        symptom_reports: [],
        treatment_start: "",
        uuid: ""
    */

    //Takes in a data fetching strategy, so you can swap out the API one for testing data
    constructor(strategy) {
        this.strategy = strategy;
    }


    executeRequest(type,body){
        return this.strategy.executeRequest(ROUTES,type,body).then(res =>{
            
                       if( res instanceof Error){
                //Check if loggin to provide different error
                if(type != "login"){
                    this.expired = true;
                }
                return ""
            }else{
                return res
            }
        
        })
    }

    @observable newPassword = "";


    @action resetUserPassword = (participantID) => {
        return this.strategy.executeRawRequest(`/participant/${participantID}/reset_password`,"PATCH")
    }

    @action postResolution = (body) => {
        this.executeRequest('post_resolution',body).then(json => {
            this.getParticipantRecords();
        })
    } 

    @action getParticipantRecords = () => {
        this.executeRequest('get_records').then(json => {
            this.participantRecords = json.participant_records;
            this.resolutions = json.resolutions;
        })
    }

    @action getCoordinatorInformation = () => {
        
        this.executeRequest('get_coordinator').then(json => {
            console.log(json)
            this.name = json.name;
            this.email = json.email;
            this.uuid = json.uuid;
        })
    }

    @action login(){

        let body = {
            phoneNumber: this.loginEmail,
            password: this.loginPassword,
            userType: "Patient"
        }

        return this.executeRequest('login',body).then(json =>{
            if(json && json.uuid){
                localStorage.setItem("user.token", json.token);
                localStorage.setItem(`coordinator.uuid`,json.uuid);
                localStorage.setItem('token.exp',json.exp)
                this.getCoordinatorInformation();
                this.getParticipantRecords();
                return
            }
            return new Error("Wrong password")
        });
    }

    @action updateCurrentParticipant(participantID){
        return this.strategy.executeRawRequest(`/participant/${participantID}`,"GET").then( json =>{
            this.currentParticipant = json;
        })
    }
    
    addCoordinator(body){
        this.executeRequest('post_coordinator',body).then( res =>{
            console.log("success");
        })
    }

    setPhotoStatus(id,status){
        let body = {status: status}
        this.strategy.executeRawRequest(`/strip_report/${id}/status`,"POST",body)
    }

    @action logout(){
        this.uuid = ""
        this.name = ""
        this.email = ""
        this.participantRecords = []
        this.resolutions = []
        this.expired = false;
    }
}