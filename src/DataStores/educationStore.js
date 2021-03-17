import { action, observable, computed } from "mobx";
import localforage from 'localforage'
import raw from "raw.macro";
const file = raw("../Content/TreatmentMessages.json");

export default class EducationStore {

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    treatmentUpdates = JSON.parse(file)

    @observable educationStatus = []

    @computed get messageNumber() {
        return this.educationStatus.includes(this.rootStore.patientInformation.daysInTreatment) ? -1 : this.rootStore.patientInformation.daysInTreatment
    }

    @computed get availableMessages() {
        if(this.rootStore.patientInformation.loaded){
            return Object.keys(this.treatmentUpdates).filter((each) => {
                const messageNumber = Number(each);
                return messageNumber <= this.rootStore.patientInformation.daysInTreatment && !this.educationStatus.includes(messageNumber)
            })
        }
        return [];
    }

    @computed get dayShown(){
        return this.availableMessages[0]
    }

    @computed get message(){
        return this.availableMessages.length > 0 && this.treatmentUpdates[this.dayShown]
    }

    @action setEducationStatus(response){
        
        this.educationStatus = response.map(each => {
            if(!each.treatmentDay){
                throw new Error("Education Status Response did not include treatmentDay for at least one item")
            }
            return each.treatmentDay
        })
    }

    markEducationAsRead(wasHelpful) {
        const body = { treatmentDay: this.dayShown }
        wasHelpful !== undefined && (body.wasHelpful = wasHelpful)
        this.rootStore.executeRawRequest(`/patient/${this.rootStore.userID}/education_statuses`, "POST", body).then((json) => {
            this.setEducationStatus(json);
        })
    }





}
