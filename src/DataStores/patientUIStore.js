import { observable, action, computed, autorun } from 'mobx';

//Extends this file https://github.com/alisd23/mobx-react-router/blob/master/src/store.js

export default class PatientUIStore {

    constructor(routerStore) {
        this.router = routerStore;
    }

    //Patient Side Routes
    @computed get onReportFlow() {
        return this.router.location.pathname.startsWith("/home/report")
    }

    @action moveToReportFlow() {
        this.router.push(`/home/report/0`)
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

    @computed get reportStep(){
        const parts = this.router.location.pathname.split("/");
        return parseInt(parts[parts.length-1])
    }

    @computed get onCalendar(){
        this.router.push(`/home/report/${this.reportStep}`)
    }

    @computed get tabNumber(){
        const splitPath = this.router.location.pathname.split("/");
        if (splitPath[1] === "home") return 0
        if (splitPath[1] === "progress") return 1
        if (splitPath[1] === "messaging") return 2
        if (splitPath[1] === "information") return 3
        return 0
    }

    @computed get onHistoricalReport(){
        return this.router.location.pathname.startsWith("/progress/report")
    }

    updateStep(step){
        const base = this.onHistoricalReport ? '/progress/report/' : '/home/report/'
        this.router.push(`${base}${step}`)
    }

    


}