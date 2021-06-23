import { action, observable, computed, toJS } from "mobx";
import uploadPhoto from '../Basics/PhotoUploader';
import APIStore from './apiStore'

const ROUTES = {
    getChannels: ["/v2/channels", "GET"],
    getUnreadMessages: ["/unread_messages", "GET"],
    postNewChannel: ["/v2/channels", "POST"]
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
                    if (this.selectedChannel.id) {
                        this.getInitalMessages();
                    }
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
        isCoordinatorChannel: false,
        firstMessageID: 0,
        firstLoad: true,
        firstNewMessageId: 0,
        allMessagesLoaded: false,
        initalMessagesLoaded: false
    }

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
    get firstMessageFetched() {
        if (this.selectedChannel.messages && this.selectedChannel.messages.length < 1) {
            return ""
        }
        return this.selectedChannel.messages[0].id
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

    @action getOlderMessages = () => {

        let url = `/v2/channel/${this.selectedChannel.id}/messages?firstMessageId=${this.firstMessageFetched}`

        if (!this.selectedChannel.allMessagesLoaded) {
            this.selectedChannel.olderMessagesLoading = true;
            return this.executeRawRequest(url, "GET").then((response) => {
                if(response.length > 0){
                    this.selectedChannel.firstNewMessageId = response[response.length - 1].id
                }
                if(response.length < 20){
                    this.selectedChannel.allMessagesLoaded = true;
                }
                this.selectedChannel.firstLoad = false;
                this.selectedChannel.messages.unshift(...response);
                this.selectedChannel.olderMessagesLoading = false;
                return response && response.length;
            })
        }
        return Promise.resolve(false);
    }

    getInitalMessages() {

        this.executeRawRequest(`/v2/channel/${this.selectedChannel.id}/messages`, "GET").then((response) => {
            this.setInitalMessages(response);
        })
    }

    @action setInitalMessages = (messages) => {
        this.selectedChannel.messages = messages;
        this.selectedChannel.initalMessagesLoaded = true;
        this.getUnreadMessages();
        this.updateSelectedChannel();

    }

    @computed get categorizedUnread() {
        const value = this.unreadInfo ? Object.values(this.unreadInfo).reduce((prev, current) => {
            if (current.isPrivate && !current.isSiteChannel) {
                return { private: prev.private + current.unreadMessages, public: prev.public }
            } else {
                return { private: prev.private, public: prev.public + current.unreadMessages }
            }
        }, { private: 0, public: 0 }) : { private: 0, public: 0 };

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
            messages: [],
            creator: "",
            isCoordinatorChannel: false,
            firstMessageID: 0,
            firstLoad: true,
            olderMessagesLoading: false

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
        this.executeRawRequest(`/v2/message/${id}`, "PATCH", { isHidden: state }).then(response => {
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

    getChannelDetails = (channelId) => {
        this.executeRawRequest(`/v2/channel/${channelId}`, "GET").then(response => {
            if (response.id) {
                this.setActiveChannel(response)
            }
        })
    }

    @action setActiveChannel = (channel) => {
        this.selectedChannel.id = channel.id;
        this.selectedChannel.title = channel.title;
        this.selectedChannel.isCoordinatorChannel = channel.userType === "Patient"
        this.selectedChannel.firstMessageID = channel.firstMessageId
        this.getInitalMessages();
    }

    @computed get olderMessagesLoading(){
        return this.selectedChannel.olderMessagesLoading;
    }

    @computed get allMessagesLoaded(){
        return this.selectedChannel.allMessagesLoaded;
    }

    @action initalizeChannel = () =>{
        this.selectedChannel.allMessagesLoaded = false;
        this.selectedChannel.firstLoad = true;
        this.selectedChannel.initalMessagesLoaded = false;
    }
}