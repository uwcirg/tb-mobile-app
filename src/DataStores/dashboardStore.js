import { action, observable, computed } from "mobx";
import APIStore from './apiStore'
import { DateTime } from "luxon";

const ROUTES = {
    addPatient: ["/patient", "POST"]
}

export default class DashboardStore extends APIStore {

    @observable patients = []

    constructor(strategy) {
        super(strategy, ROUTES);
    }

    @action setPatients = (patients) => {
        this.patients = patients
    }

    @computed get patientList(){
        return Object.values(this.patients)
    }

    getPatients = (id) => {
        this.executeRawRequest(`/organizations/${id}/patients`, "GET").then(response => {
            this.setPatients(response)
        })

    }





   


}