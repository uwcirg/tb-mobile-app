import { observable, action, computed, autorun } from 'mobx';

//Extends this file https://github.com/alisd23/mobx-react-router/blob/master/src/store.js

export default class PatientUIStore {

    constructor(routerStore) {
        this.router = routerStore;

        //Allow UI Redirects from notifications
        //event is sent from custom-service-worker.js
        if(isBroadcastChannelSupported()){
            const channel = new BroadcastChannel('notifications');
            channel.addEventListener('message', event => {
                this.handleMessageFromServiceworker(event.data);
            });
        }
    }

    @observable onOnboarding = false;
    @observable skippedToPhotoFlow = false;


    handleMessageFromServiceworker(message){
        if(message.url){
            this.router.push(message.url)
        }
    }

    @observable onOnboarding = false;

    //Patient Side Routes
    @computed get onReportFlow() {
        return this.router.location.pathname.startsWith("/home/report")
    }

    @action moveToReportFlow() {
        this.router.push(`/home/report/0`)
    }


    @action goToAddMilestone = () => {
        this.router.push(`/progress/reminders/add`)
    }

    @action goToHome = () => {
        this.router.push("/home")
    }

    @action goToInformation = () => {
        this.router.push("/information")
    }

    @action goToMessaging = () => {
        this.router.push("/messaging")
    }

    @action goToProgress = () => {
        this.router.push("/progress")
    }

    @action previousReportStep = () =>{
        if(this.reportStep > 0){
            this.updateStep(this.reportStep - 1)
        }else{
            this.goToHome();
        }
    }

    @action nextReportStep = () => {
        this.updateStep(this.reportStep + 1)
    }

    @action startHistoricalReport = () => {
        this.router.push(`/progress/report/0`)
    }

    @action openPhotoReport = () => {
        this.updateStep(2)
    }

    @action editReport = () => {
        this.router.push('home/report/0')
    }

    @action endReport = () => {
        if(this.onHistoricalReport){
            this.router.push('/progress')
            return
        }
        this.router.push('/home')
    }

    @action skipToReportConfirmation = () => {
        this.router.push("/home/report/4")
    }

    @computed get reportStep(){
        const parts = this.router.location.pathname.split("/");
        const parsed = parseInt(parts[parts.length-1])
        return parsed ? parsed : 0
    }

    @computed get onAddMilestone(){
        return this.router.location.pathname.startsWith("/progress/reminders/add")
    }

    @computed get tabNumber(){
        const splitPath = this.router.location.pathname.split("/");

        //Get the tab the user is one. ie. if on baseURL/home they are on the first tab
        if (splitPath[1] === "home") return 0
        if (splitPath[1] === "progress") return 1
        if (splitPath[1] === "messaging") return 2
        if (splitPath[1] === "information") return 3
        return 0
    }

    @computed get onHistoricalReport(){
        return this.router.location.pathname.startsWith("/progress/report")
    }

    @action updateStep(step){
        const base = this.onHistoricalReport ? '/progress/report/' : '/home/report/'
        this.router.push(`${base}${step}`)
    }
}

function isBroadcastChannelSupported() {
    // When running in a sandboxed iframe, the BroadcastChannel API
    // is not actually available and throws an exception
    try {
        const channel = new BroadcastChannel("feature_test");
        channel.close();
        return true;
    } catch(err) {
        return false;
    }
  }