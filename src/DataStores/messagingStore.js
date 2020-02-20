import { action, observable,toJS, computed} from "mobx";

const ROUTES = {
    getChannels: ["/channels","GET"]
}

export class MessagingStore {

    constructor(strategy) {
        this.strategy = strategy;
    }

    @observable channels = [];
    @observable selectedChannel = 0;
    @observable channelInfoReturned = false;
    @observable selectedChannelInfo = {
        title: "",
        messages: []
    };
    @observable newMessage = "";

    @computed
    get lastMessageFetched(){
        if(this.selectedChannelInfo.messages && this.selectedChannelInfo.messages.length < 1){
            return ""
        }
        return this.selectedChannelInfo.messages[this.selectedChannelInfo.messages.length - 1].created_at
    }

    @computed
    get selectedChannelTitle(){
        return this.selectedChannelInfo.title;
    }

    @computed
    get selectedChannelMessages(){
        return this.selectedChannelInfo.messages;
    }

    @action getChannels(){
        this.strategy.executeRequest(ROUTES,"getChannels").then((response) => {
            this.channels = response;
        })
    }

     @action getSelectedChannel(){
        this.strategy.executeRawRequest(`/channel/${this.selectedChannel}/messages`,"GET").then((response) => {
            this.selectedChannelInfo.messages = response;
            this.channelInfoReturned = true;
        })
    }

    @action clearSelection = () => {
        this.selectedChannel = 0
        this.selectedChannelInfo = {
            title: "",
            messages: []
        };
        this.channelInfoReturned = false;
    }

    sendMessage = () => {
        this.strategy.executeRawRequest(`/channel/${this.selectedChannel}/messages`,"POST").then((response) => {
            this.selectedChannelInfo.messages = response;
            this.channelInfoReturned = true;
            
        })

    }

   
}