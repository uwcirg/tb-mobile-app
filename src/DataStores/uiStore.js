import { action, observable, autorun, computed} from "mobx";

export class UIStore {

    @observable userInt = 0;
    @observable userType = "";

    @observable isLoggedIn = false;

    @observable language = "en";
    @observable activeTab = 0;
    @observable menuOpened = false;
    @observable offline = !navigator.onLine;


    @computed get isSpanish(){
        return this.language == "es"
    }

    @action toggleLanguage = () => {
        if(this.language == "en"){
            this.language = "es"
        }else{
            this.language = "en"
        }
        console.log("tes")
    }

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