import { action, observable, autorun, computed} from "mobx";
import {Settings} from 'luxon'

export class UIStore {

    constructor(routerStore) {
        this.router = routerStore;
        Settings.defaultLocale = "es-ar"
    }

    @observable userInt = 0;
    @observable userType = "";

    @observable isLoggedIn = false;

    @observable activeTab = 0;
    @observable menuOpened = false;
    @observable offline = !navigator.onLine;

    @observable locale = "es"
    @observable language = "es"

    syncLuxon = autorun(() => {
        Settings.defaultLocale = this.locale;
    });

    @action toggleMenu = () => {
        this.menuOpened = !this.menuOpened;
    }


    @action initalize = (uiState) => {

        if(!uiState) return

        if(uiState && uiState.tab){
            //this.activeTab = uiState.tab;
        }

        if(uiState.language){
           // this.language = uiState.language;
        }

        if(uiState.locale){
           // this.locale = uiState.locale;
        }
    }

    @action goToSpecificChannel = () => {
        this.router.push("/messaging/channel")
    }

    @action goToMessaging = () => {
        this.router.push("/messaging/")
    }

    @computed get onSpecificChannel(){
        return this.router.location.pathname.startsWith("/messaging/channel")
    }

    @action toggleTreatmentFlow = () =>{
        this.onTreatmentFlow = false;
    }

    updateStoredState(prevState){
        localStorage.setItem("uiState",JSON.stringify(prevState));
    }

    getPrevState(){
        let prevState = localStorage.getItem("uiState");
        if(!prevState){
            prevState = {}
        }else{
            prevState = JSON.parse(prevState);
        }
        return prevState;
    }


    reactToLanguageChange = autorun(() => {
        console.log(this.language)
        console.log("CHANGE")
    });
}