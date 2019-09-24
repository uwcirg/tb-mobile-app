import { action, observable,toJS} from "mobx";

const ROUTES = {
    post_resolution: ["/resolution","POST"],
    get_records: ["/participant/all", "GET"],
    get_coordinator: ["/coordinator/current", "GET"]
}

export class CoordinatorStore {

    @observable uuid = ""
    @observable name = ""
    @observable email = ""
    @observable participantRecords = []
    @observable resolutions = []

    //Takes in a data fetching strategy, so you can swap out the API one for testing data
    constructor(strategy) {
        this.strategy = strategy;
    }

    executeRequest(type,body){
        return this.strategy.executeRequest(ROUTES,type,body)
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
            this.name = json.name;
            this.email = json.email;
            this.uuid = json.uuid;
        })
    }
}