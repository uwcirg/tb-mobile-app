import { action, observable, computed, toJS } from "mobx";
import uploadPhoto from '../Basics/PhotoUploader';
import APIStore from './apiStore'

const ROUTES = {
    getChannels: ["/channels", "GET"],
    getUnreadMessages: ["/unread_messages", "GET"],
    postNewChannel: ["/channels", "POST"]
}

export class MessagingStore extends APIStore {

    constructor(strategy) {
        super(strategy, ROUTES);

        //Update Unread Messages when a push notification is recieved
        //this uses the specific message channle messaging-notification
        //which prevents other listeners from being called
        try {
            if (window.BroadcastChannel) {
                const channel = new BroadcastChannel('messaging-notification');
                channel.addEventListener('message', event => {
                    this.getUnreadMessages();
                    this.getSelectedChannel();
                });
            }
        } catch (err) {
            console.log(err)
        }
    }

    @observable numberUnread = 0;
    @observable unreadInfo = {};

    @observable channels = [];
    @observable selectedChannel = {
        id: 0,
        title: "",
        messages: [],
        creator: "",
        isCoordinatorChannel: false
    };

    @observable newMessage = "";
    @observable file = "";
    @observable rawFile = "";
    @observable fileType = "jpeg";
    @observable newMessageLoading = false;
    @observable fileUploading = false;

    @observable showImagePreview = false;

    @observable coordinatorSelectedChannel = {
        title: "",
        userId: 0
    }

    @observable tabNumber = 0;

    @observable newChannel = {
        title: "",
        subtitle: "",
        errors: {},
        success: false,
        visible: false
    }

    @computed
    get tab() {
        return this.tabNumber;
    }

    @computed
    get lastMessageFetched() {
        if (this.selectedChannel.messages && this.selectedChannel.messages.length < 1) {
            return ""
        }
        return this.selectedChannel.messages[this.selectedChannel.messages.length - 1].id
    }

    @computed
    get selectedChannelTitle() {
        return this.selectedChannel.title;
    }

    @computed
    get selectedChannelMessages() {
        return this.selectedChannel.messages;
    }

    @computed
    get selectedChannelCreator() {
        return this.selectedChannel.creator;
    }

    @action getChannels() {
        this.executeRequest("getChannels").then((response) => {
            this.channels = response;
        })
    }

    @action getSelectedChannel() {

        let url = `/channels/${this.selectedChannel.id}/messages`

        /*
        if(this.lastMessageFetched != ""){
            url += `?lastMessageID=${this.lastMessageFetched}`
        } */

        this.executeRawRequest(url, "GET").then((response) => {
            this.selectedChannel.messages = response;
            this.getUnreadMessages();
            this.updateSelectedChannel();
        })
    }

    @computed get categorizedUnread() {
        const value = this.unreadInfo ? Object.values(this.unreadInfo).reduce((prev, current) => {
            if (current.isPrivate) {
                return {private: prev.private + current.unreadMessages, public: prev.public}
            }else{
                return {private: prev.private, public: prev.public + current.unreadMessages}
            }
        }, {private: 0,public: 0}) : {private: 0,public: 0};

        return value
    }


    @action getNewMessages() {

        let url = `/channels/${this.selectedChannel.id}/messages`

        if (this.lastMessageFetched != "") {
            url += `?lastMessageId=${this.lastMessageFetched}`
        }

        this.executeRawRequest(url, "GET").then((response) => {
            this.selectedChannel.messages = this.selectedChannel.messages.concat(response);
        })
    }

    @action clearSelection = () => {
        this.selectedChannel = {
            id: 0,
            title: "",
            messages: []
        };
        this.file = ""
    }

    @action uploadFileAndSendMessage = () => {

        if (this.file !== "") {
            this.fileUploading = true;
            this.getUploadUrl().then(photoRepsonse => {
                uploadPhoto(photoRepsonse.url, this.rawFile, this.fileType).then(uploadResponse => {
                    this.sendMessage(photoRepsonse.path)
                    this.fileUploading = false;
                })
            })
        } else {
            this.sendMessage();
        }
    }

    @action sendMessage = (photoPath) => {
        this.newMessageLoading = true;
        let object = {
            body: this.newMessage
        }

        if (photoPath) {
            object.photoPath = photoPath
        }

        this.executeRawRequest(`/channels/${this.selectedChannel.id}/messages`, "POST", object).then((response) => {
            this.getNewMessages();
            this.newMessage = "";
            this.file = "";
            this.newMessageLoading = false;
        })
    }

    @action getUnreadMessages = () => {
        this.executeRequest("getUnreadMessages").then((response) => {
            this.numberUnread = response.total
            this.unreadInfo = response.channels
        })
    }

    @action setFile = (file) => {
        this.file = file;
    }

    @action clearFile = () => {
        this.file = ""
    }

    getUploadUrl = () => {

        return this.executeRawRequest(`/photo_uploaders/messaging?channelId=${this.selectedChannel.id}&fileType=${this.fileType}`)
    }

    @action toggleImagePreview = () => {
        this.showImagePreview = !this.showImagePreview;
    }

    @action updateSelectedChannel = () => {
        const element = this.channels.find(element => { return element.id == this.selectedChannel.id })
        this.coordinatorSelectedChannel = element
    }

    @action updateNewSubtitle = (value) => {
        this.newChannel.subtitle = value;
    }

    @action updateNewTitle = (value) => {
        this.newChannel.title = value;
    }

    @action clearNewChannel = () => {
        this.newChannel = {
            title: "",
            subtitle: "",
            success: false,
            errors: {},
            visible: false
        }
    }

    @action submitNewChannel = () => {
        const body = {
            title: this.newChannel.title,
            subtitle: this.newChannel.subtitle
        }
        this.executeRequest("postNewChannel", body, { allowErrors: true }).then((response) => {
            if (response.error) {
                this.newChannel.errors = response.paramErrors
            } else {
                this.getChannels();
                this.success = true;
                this.clearNewChannel();
            }
        })
    }

    @action setFileType = (fileType) => {
        this.fileType = fileType
    }

    @action setMessageHidden = (id, state) => {
        this.executeRawRequest(`/message/${id}`, "PATCH", { isHidden: state }).then(response => {
            this.selectedChannel.messages.forEach((each, index) => {
                if (each.id === response.id) {
                    this.selectedChannel.messages[index] = response
                }
            })

        })

    }

    @action setTab = (index) => {
        this.tabNumber = index;
    }


}