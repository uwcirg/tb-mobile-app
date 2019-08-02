import { observable, action, computed } from "mobx";

export default class NotificationStore {

    @observable channelNotifications = {}
    @observable userID = ""

    @observable fetching = true;

    constructor(){
        this.url = process.env.REACT_APP_MESSAGE_API;
    }

    @action
    getChannelNotifications = () => {

        fetch(`${this.url}/v1/notifications`, {
            method: "GET",
            headers: {
                "X-User": this.userID
            },
        }).then(resolve => resolve.json())
            .then(json => {
                    console.log(json);
                    this.channelNotifications = json
                    this.fetching = false;
            })
    }


    @computed get totalNumberOfNotifications(){

        let total = 0;
        let keys = Object.keys(this.channelNotifications);

        keys.forEach( key => {
            total += this.channelNotifications[`${key}`];
        })

        return total;
    }


}