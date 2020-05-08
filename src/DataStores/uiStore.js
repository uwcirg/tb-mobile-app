import { action, observable, autorun, computed} from "mobx";
import {Settings} from 'luxon'

export class UIStore {

    constructor(routerStore) {
        this.router = routerStore;
    }

    @observable userInt = 0;
    @observable userType = "";

    @observable isLoggedIn = false;

    @observable language = "es";
    @observable activeTab = 0;
    @observable menuOpened = false;
    @observable offline = !navigator.onLine;

    @observable locale = "es-ar"


    @computed get isSpanish(){
        return this.language == "es"
    }

    @action toggleLanguage = () => {

        let prevState = this.getPrevState();

        if(this.language == "en"){
            this.language = "es"
            this.locale = "es-ar"
        }else{
            this.language = "en"
            this.locale = "en-US"
        }

        prevState.language = this.language;
        prevState.locale = this.locale;
        this.updateStoredState(prevState);

        
    }

    syncLuxon = autorun(() => {
        Settings.defaultLocale = this.locale;
    });

    @action toggleMenu = () => {
        this.menuOpened = !this.menuOpened;
    }

    @action updateTab = (tabNumber) => {
        this.activeTab = tabNumber;
        let prevState = this.getPrevState();
        prevState.tab = tabNumber;
        this.updateStoredState(prevState);
    }

    @action initalize = (uiState) => {

        if(!uiState) return

        if(uiState && uiState.tab){
            //this.activeTab = uiState.tab;
        }

        if(uiState.language){
            this.language = uiState.language;
        }

        if(uiState.locale){
            this.locale = uiState.locale;
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
}