import { RouterStore} from 'mobx-react-router';
import { observable, action, computed} from 'mobx';

//Extends this file https://github.com/alisd23/mobx-react-router/blob/master/src/store.js

export default class PatientUIStore{

    constructor(routerStore) {
        this.router = routerStore;
    }

    //Patient Side Routes
    @computed get onReportFlow(){
        this.router.location.pathname.startsWith("/patient/home/report")
    }

    @action moveToReportFlow(){
        this.router.push("/patient/home/report")
    }

    //Coordinator Side Routes


}