import { action, observable,toJS, computed} from "mobx";

const ROUTES = {
    getChannels: ["/channels","GET"],
    getUnreadMessages: ["/messages/unread","GET"]
}

export class MessagingStore {

    constructor(strategy) {
        this.strategy = strategy;
    }

    @observable numberUnread = 0;
    @observable unreadInfo = {};

    @observable channels = [];
    @observable selectedChannel = 0;
    @observable selectedChannelInfo = {
        title: "",
        messages: [],
        creator: ""
    };

    @observable newMessage = "";

    @computed
    get lastMessageFetched(){
        if(this.selectedChannelInfo.messages && this.selectedChannelInfo.messages.length < 1){
            return ""
        }
        return this.selectedChannelInfo.messages[this.selectedChannelInfo.messages.length - 1].id
    }

    @computed
    get selectedChannelTitle(){
        return this.selectedChannelInfo.title;
    }

    @computed
    get selectedChannelMessages(){
        return this.selectedChannelInfo.messages;
    }

    @computed
    get selectedChannelCreator(){
        return this.selectedChannelInfo.creator;
    }

    @action getChannels(){
        this.strategy.executeRequest(ROUTES,"getChannels").then((response) => {
            this.channels = response;
        })
    }

    @action getSelectedChannel(){

        let url = `/channel/${this.selectedChannel}/messages`

        if(this.lastMessageFetched != ""){
            url += `?lastMessageID=${this.lastMessageFetched}`
        } 

        this.strategy.executeRawRequest(url,"GET").then((response) => {
            this.selectedChannelInfo.messages = response;
        })
    }

    @action getNewMessages(){

        let url = `/channel/${this.selectedChannel}/messages`

        if(this.lastMessageFetched != ""){
            url += `?lastMessageID=${this.lastMessageFetched}`
        } 

        this.strategy.executeRawRequest(url,"GET").then((response) => {
           
                this.selectedChannelInfo.messages = this.selectedChannelInfo.messages.concat(response);
          
            
        })
    }


    @action clearSelection = () => {
        this.selectedChannel = 0
        this.selectedChannelInfo = {
            title: "",
            messages: []
        };
    }

    @action sendMessage = () => {
        let body = {
            body: this.newMessage
        }

        this.strategy.executeRawRequest(`/channel/${this.selectedChannel}/messages`,"POST",body).then((response) => {
            this.getNewMessages();
            this.newMessage = "";

        })

    }

    @action getUnreadMessages = () => {
        this.strategy.executeRequest(ROUTES,"getUnreadMessages").then((response) => {
            this.numberUnread = response.total
            this.unreadInfo = response.channels
        })
    }

   
}