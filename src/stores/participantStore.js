import { action, observable,toJS} from "mobx";

export class ParticipantStore {

    //Takes in a data fetching strategy, so you can swap out the API one for testing data
    constructor(strategy) {
        this.strategy = strategy;
    }

    @observable uuid = ""
    @observable name = ""
    @observable phone_number = ""
    @observable information = {}

    @action getParticipantInformation(){

        //Eventually make this 
        this.strategy.executeRawRequest(`/participant/current`,"GET").then(json =>{
            this.information = json;
            this.name = json.name;
            this.phone_number= json.phone_number;
        });

    }

   
}