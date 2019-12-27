import { action, observable,toJS} from "mobx";

const ROUTES = {
    getChannels: ["/channels","GET"]
}

export class MessagingStore {

    constructor(strategy) {
        this.strategy = strategy;
    }

    @observable channels = [];

    @action getChannels(){

    this.strategy.executeRequest(ROUTES,"getChannels").then((response) => {
        this.channels = response;
    })
       
    }

   
}