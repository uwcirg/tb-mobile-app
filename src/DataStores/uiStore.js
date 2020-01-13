import { action, observable, autorun} from "mobx";

export class UIStore {

    @observable userType = "";

    @observable language = "en";
    @observable activeTab = 0;
    @observable menuOpened = false;
    @observable offline = !navigator.onLine;
    @observable onTreatmentFlow = false;

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