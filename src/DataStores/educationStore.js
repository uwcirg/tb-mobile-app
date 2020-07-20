import { action, observable, computed, autorun, toJS } from "mobx";

export default class EducationStore {

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable educationStatus = []

    @computed get educationMessage() {
        console.log(this.rootStore.patientInformation.weeksInTreatment)
        return this.educationStatus.includes(this.rootStore.patientInformation.weeksInTreatment) ? -1 : this.rootStore.patientInformation.weeksInTreatment
    }

    @action markEducationAsRead() {
        const body = { treatmentWeek: this.rootStore.patientInformation.weeksInTreatment }
        this.rootStore.executeRequest('updateEducationStatus',body).then((json) => {
           
        })
    }
}
