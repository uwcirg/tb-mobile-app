import { RouterStore } from 'mobx-react-router';
import { observable, action, computed } from 'mobx';

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
        this.router.push("/home/report")
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


    @computed get tabNumber(){
        const splitPath = this.router.location.pathname.split("/");
        if (splitPath[1] === "home") return 0
        if (splitPath[1] === "progress") return 1
        if (splitPath[1] === "messaging") return 2
        if (splitPath[1] === "information") return 3

        return 0
    }


}