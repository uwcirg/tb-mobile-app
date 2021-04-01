import { action, observable, computed } from "mobx";
import APIHelper from './Requests'


export default class PatientProfileStore {

    constructor(){
        this.apiHelper = new APIHelper();
    }

    @observable onPasswordReset = false;
    @observable onChangeDetails = true;

    @observable givenName = "";
    @observable familyName = "";

    @action toggleOnPasswordReset = () => {
        this.onPasswordReset = !this.onPasswordReset;
    }

    @action toggleOnChangeDetails = () => {
        this.onChangeDetails = !this.onChangeDetails;
    }

    @action closeResetPassword = () => {
        this.onPasswordReset = false;
    }

    @action setGivenName = (update) => {
        this.givenName = update;
    }

    @action setFamilyName = (update) => {
        this.familyName = update;
    }



}