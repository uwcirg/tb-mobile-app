import { action, observable, computed} from "mobx";

export default class EducationStore {

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable educationStatus = []

    @computed get messageNumber() {
        return this.educationStatus.includes(this.rootStore.patientInformation.daysInTreatment) ? -1 : this.rootStore.patientInformation.daysInTreatment
    }

    @action markEducationAsRead(wasHelpful) {
        const body = { treatmentDay: this.rootStore.patientInformation.daysInTreatment}
        wasHelpful !== undefined && ( body.wasHelpful = wasHelpful)
        this.rootStore.executeRawRequest(`/patient/${this.rootStore.userID}/education_statuses`,"POST", body).then((json) => {
           this.educationStatus.push(this.rootStore.patientInformation.daysInTreatment)
        })
    }
}
