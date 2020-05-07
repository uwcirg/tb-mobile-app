import { RouterStore} from 'mobx-react-router';
import { observable, action, computed} from 'mobx';

//Extends this file https://github.com/alisd23/mobx-react-router/blob/master/src/store.js

export default class CustomRouteStore extends RouterStore{

    constructor() {
        super();
    }

    @computed get onReportFlow(){
        this.location.pathname.startsWith("/patient/home/report")
    }

    @action moveToReportFlow(){
        this.push("/patient/home/report")
    }


}