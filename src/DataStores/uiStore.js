import { action, observable, autorun, computed } from "mobx";
import { Settings } from 'luxon'

export class UIStore {

    constructor(routerStore) {
        this.router = routerStore;
    }

    @observable userInt = 0;
    @observable userType = "";

    @observable isLoggedIn = false;

    @observable activeTab = 0;
    @observable menuOpened = false;
    @observable offline = !navigator.onLine;

    @observable locale = ""

    @action setLocale = (locale) => {
        this.locale = locale;
        localStorage.setItem('i18n-locale', locale)
    }

    @action toggleMenu = () => {
        this.menuOpened = !this.menuOpened;
    }


    @action goToSpecificChannel = (channelID) => {
        this.router.push(`/messaging/channel/${channelID}`)
    }

    @action goToMessaging = () => {
        this.router.push("/messaging/")
    }

    @computed get onSpecificChannel() {
        return this.router.location.pathname.startsWith("/messaging/channel/")
    }

    @action toggleTreatmentFlow = () => {
        this.onTreatmentFlow = false;
    }

    updateStoredState(prevState) {
        localStorage.setItem("uiState", JSON.stringify(prevState));
    }

    getPrevState() {
        let prevState = localStorage.getItem("uiState");
        if (!prevState) {
            prevState = {}
        } else {
            prevState = JSON.parse(prevState);
        }
        return prevState;
    }

    @action initalizeLocale = () => {
        const lsLocale = localStorage.getItem("i18n-locale");
        const defaultLocale = window._env ? window._env.DEFAULT_LOCALE : "";

        if (lsLocale) {
            this.setLocale(lsLocale)
        } else {
            this.setLocale(defaultLocale)
        }
    }

    @action toggleLanguage = () => {
        if(this.locale === "en"){
            this.locale = "es-AR"
        }else{
            this.locale = "en"
        }
    }

    @computed get pathNumber(){
        const parts = this.router.location.pathname.split("/");
        const parsed = parseInt(parts[parts.length - 1])
        return parsed ? parsed : 0
    }


}