import { observable, runInAction, action, computed } from "mobx";

export default class DiscussStore {

    //Overview info
    @observable onSpecificChannel = false;
    @observable specificChannel = 0;
    @observable userID = "";
    @observable userName = "";

    //Channel Info
    @observable channels = [];
    @observable newChannelName = ""
    @observable newChannelDescription = ""
    @observable isAddingNewChannel = false;

    //Specific Discussion
    @observable specificChannelMessages = [];
    @observable newMessageBody = "";


    constructor(){
        this.url = process.env.REACT_APP_MESSAGE_API;
    }

    @computed get currentChannelObject(){
        return this.channels.find( channel =>{
            return channel.id == this.specificChannel;
        })
    }
   

    @action
    getChannels = () => {

        fetch(`${this.url}/v1/channels`, {
            method: "GET",
            headers: {
                "X-User": this.userID
            },
        }).then(resolve => resolve.json())
            .then(json =>
                    this.channels = json
            )
    }

    postChannel = () => {
        let channelJSON = { description: this.newChannelDescription, name: this.newChannelName };
        fetch(`${this.url}/v1/channels`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-User": this.userID
            },
            body: JSON.stringify(channelJSON),
        }).then(resolve => resolve.json())
            .then(json => { this.getChannels() });
    }

    @action
    getDiscussion = () => {

        fetch(`${this.url}/v1/channels/${this.specificChannel}`, {
            method: "GET",
            headers: {
                "X-User": this.userID
            },
        }).then(resolve => {
                return resolve.json()})
        .then(json =>{
                    this.specificChannelMessages = json
            }
        ).catch( err => console.log(err))

    }

    postMessage = () => {
        let messageJSON = { body: this.newMessageBody, userName: this.userName };
        fetch(`${this.url}/v1/channels/${this.specificChannel}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-User": this.userID
            },
            body: JSON.stringify(messageJSON),
        }).then(resolve => resolve.json())
        .then(json => { this.getDiscussion() });
    }


}