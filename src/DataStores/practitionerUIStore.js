import { observable, action, computed, autorun } from 'mobx';

//Extends this file https://github.com/alisd23/mobx-react-router/blob/master/src/store.js

export default class PractitionerUIStore {

    constructor(routerStore) {
        this.router = routerStore;
    }

    @observable alert = "";

    @observable onOnboarding = false;
    @observable onAddPatientNote = false;

    @computed get tabNumber(){
        const splitPath = this.router.location.pathname.split("/");

        //Get the tab the user is one. ie. if on baseURL/home they are on the first tab
        if (splitPath[1] === "home") return 0
        if (splitPath[1] === "patients") return 1
        if (splitPath[1] === "messaging") return 2
        if (splitPath[1] === "settings") return 3
        return 0
    }

    @computed get onMessaging(){
        return this.router.location.pathname.startsWith("/messaging")
    }

    @computed get onSettings(){
        return this.router.location.pathname.startsWith("/settings")
    }

    @computed get onPatients(){
        return this.router.location.pathname.startsWith("/patients")
    }

    @computed get pathNumber(){
        const parts = this.router.location.pathname.split("/");
        const parsed = parseInt(parts[parts.length - 1])
        return parsed ? parsed : 0
    }

    @computed get onSinglePatient(){
        return this.router.location.pathname.startsWith("/patients/")
    }

    @action goToPatient = (id) =>{
        this.router.push(`/patients/${id}`)
    }

    @action goToHome = () =>{
        this.router.push(`/home`)
    }

    @action goToInfo = () =>{
        this.router.push(`/info`)
    }

    @action goToChannel = (id) => {
        this.router.push(`/messaging/channel/${id}`)
        localStorage.setItem('lastChannelID',id)
    }

    @action goToMessaging = () =>{
        const lastID = localStorage.getItem('lastChannelID')

        if(lastID){
            this.router.push(`/messaging/channels/${lastID}`)
            return
        }
        this.router.push(`/messaging`)
    }

    @action openAddPatientNote = () => {
        this.onAddPatientNote = true;
    }

    @action closeAddPatientNote =() => {
        this.onAddPatientNote = false;
    }

    @computed get onReview(){
        return this.router.location.pathname.startsWith("/review")
    }

    @action goToSettings = () =>{
        this.router.push('/settings')
    }

    @computed get mobileTabNumber(){
        if(this.onSettings) return 2
        if(this.onMessaging) return 1
        return 0
    }
}