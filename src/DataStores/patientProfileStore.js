import { action, observable, computed } from "mobx";
import APIHelper from './Requests'


export default class PatientProfileStore {

    constructor(){
        this.apiHelper = new APIHelper();
    }

    @observable onPasswordReset = false;

    @action toggleOnPasswordReset = () => {
        this.onPasswordReset = !this.onPasswordReset;
    }

    @action testApi = () =>{
        this.apiHelper.executeRawRequest('/health-check',"GET").then( (res) => {
            console.log(res);
        })
    }



}