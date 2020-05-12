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
    @observable selectedChannel = {
        id: 0,
        title: "",
        messages: [],
        creator: ""
    };

    @observable newMessage = "";

    @computed
    get lastMessageFetched(){
        if(this.selectedChannel.messages && this.selectedChannel.messages.length < 1){
            return ""
        }
        return this.selectedChannel.messages[this.selectedChannel.messages.length - 1].id
    }

    @computed
    get selectedChannelTitle(){
        return this.selectedChannel.title;
    }

    @computed
    get selectedChannelMessages(){
        return this.selectedChannel.messages;
    }

    @computed
    get selectedChannelCreator(){
        return this.selectedChannel.creator;
    }

    @action getChannels(){
        this.strategy.executeRequest(ROUTES,"getChannels").then((response) => {
            this.channels = response;
        })
    }

    @action getSelectedChannel(){

        let url = `/channel/${this.selectedChannel.id}/messages`

        /*
        if(this.lastMessageFetched != ""){
            url += `?lastMessageID=${this.lastMessageFetched}`
        } */

        this.strategy.executeRawRequest(url,"GET").then((response) => {
            this.selectedChannel.messages = response;
        })
    }

    @action getNewMessages(){

        let url = `/channel/${this.selectedChannel.id}/messages`

        if(this.lastMessageFetched != ""){
            url += `?lastMessageID=${this.lastMessageFetched}`
        } 

        this.strategy.executeRawRequest(url,"GET").then((response) => {
                this.selectedChannel.messages = this.selectedChannel.messages.concat(response);
        })
    }

    @action clearSelection = () => {
        this.selectedChannel = {
            id: 0,
            title: "",
            messages: []
        };
    }

    @action sendMessage = () => {
        let body = {
            body: this.newMessage
        }

        this.strategy.executeRawRequest(`/channel/${this.selectedChannel.id}/messages`,"POST",body).then((response) => {
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