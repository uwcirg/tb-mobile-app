import { action, observable, computed, autorun, toJS } from "mobx";

export default class EducationStore {

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable educationStatus = []

    @computed get messageNumber() {
        return this.educationStatus.includes(this.rootStore.patientInformation.daysInTreatment) ? -1 : this.rootStore.patientInformation.daysInTreatment
    }

    @action markEducationAsRead() {
        const body = { treatmentDay: this.rootStore.patientInformation.daysInTreatment }
        this.rootStore.executeRequest('updateEducationStatus',body).then((json) => {
           this.educationStatus.push(this.rootStore.patientInformation.daysInTreatment)
        })
    }
}
