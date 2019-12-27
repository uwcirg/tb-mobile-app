import { action, observable, autorun} from "mobx";

export class UIStore {

    @observable language = "en";

    @observable activeTab = 0;

    @observable menuOpened = false;

    @observable offline = !navigator.onLine;

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
        console.log(tabNumber);
        prevState.tab = tabNumber;
        console.log(prevState)
        localStorage.setItem("uiState",JSON.stringify(prevState));

    }


    @action initalize = (uiState) => {

        if(uiState && uiState.tab){
            this.activeTab = uiState.tab;
        }

    }




}