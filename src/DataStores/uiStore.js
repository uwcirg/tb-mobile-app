import { action, observable, autorun, computed} from "mobx";
import {Settings} from 'luxon'

export class UIStore {

    @observable userInt = 0;
    @observable userType = "";

    @observable isLoggedIn = false;

    @observable language = "en";
    @observable activeTab = 0;
    @observable menuOpened = false;
    @observable offline = !navigator.onLine;

    @observable locale = "en-US"

    @observable introEnabled = false;


    @computed get isSpanish(){
        return this.language == "es"
    }

    @action toggleLanguage = () => {
        if(this.language == "en"){
            this.language = "es"
            this.locale = "es-ar"
        }else{
            this.language = "en"
            this.locale = "en-US"
        }
    }

    syncLuxon = autorun(() => {
        Settings.defaultLocale = this.locale;
    });

    @action toggleMenu = () => {
        this.menuOpened = !this.menuOpened;
    }

    @action updateTab = (tabNumber) => {
        this.activeTab = tabNumber;
        
        let prevState = localStorage.getItem("uiState");
        if(!prevState){
            prevState = {}
        }else{
            prevState = JSON.parse(prevState);
        }

        prevState.tab = tabNumber;
        localStorage.setItem("uiState",JSON.stringify(prevState));
    }

    @action initalize = (uiState) => {

        if(uiState && uiState.tab){
            this.activeTab = uiState.tab;
        }
    }

    @action toggleTreatmentFlow = () =>{
        this.onTreatmentFlow = false;
    }
}