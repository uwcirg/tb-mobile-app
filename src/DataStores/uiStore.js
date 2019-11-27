import { action, observable, autorun} from "mobx";

export class UIStore {

    @observable menuOpened = false;

    @observable offline = !navigator.onLine;

    @action toggleMenu = () => {
        this.menuOpened = !this.menuOpened;
    }

}