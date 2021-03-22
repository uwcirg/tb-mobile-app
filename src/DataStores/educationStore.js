import { action, observable, computed } from "mobx";
import localforage from 'localforage'
import raw from "raw.macro";
import { DateTime } from "luxon";
const file = raw("../Content/TreatmentMessages.json");

const DATE_KEY = "dateOfLastUpdateRead"

export default class EducationStore {

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.getLocalDateOfLastRead();
    }

    treatmentUpdates = JSON.parse(file)

    @observable educationStatus = []
    @observable dateOfLastUpdateRead = DateTime.local().toISODate();;
    @observable currentDate = DateTime.local().toISODate();

    @action setEducationStatus(response) {

        this.educationStatus = response.map(each => {
            if (!each.treatmentDay) {
                throw new Error("Education Status Response did not include treatmentDay for at least one item")
            }
            return each.treatmentDay
        })
    }

    @action setDateOfLastUpdateRead(value){
        this.dateOfLastUpdateRead = value;
    }

    @action updateCurrentDate(){
        this.currentDate = DateTime.local().toISODate();
    }

    @computed get messageNumber() {
        return this.educationStatus.includes(this.rootStore.patientInformation.daysInTreatment) ? -1 : this.rootStore.patientInformation.daysInTreatment
    }

    @computed get availableMessages() {
        if (this.rootStore.patientInformation.loaded) {
            return Object.keys(this.treatmentUpdates).filter((each) => {
                const messageNumber = Number(each);
                return messageNumber <= this.rootStore.patientInformation.daysInTreatment && !this.educationStatus.includes(messageNumber)
            })
        }
        return [];
    }

    @computed get dayShown() {
        return this.availableMessages[0]
    }

    @computed get message() {
        return this.availableMessages.length > 0 && this.treatmentUpdates[this.dayShown]
    }

    @computed get hasDayPassedSinceLastUpdateRead(){
        //As long as its not the same date as the last view recorded, show an update
        return this.dateOfLastUpdateRead !== this.currentDate;
    }

    markEducationAsRead(wasHelpful) {
        const body = { treatmentDay: this.dayShown }
        wasHelpful !== undefined && (body.wasHelpful = wasHelpful)
        this.rootStore.executeRawRequest(`/patient/${this.rootStore.userID}/education_statuses`, "POST", body).then((json) => {
            this.setEducationStatus(json);
            this.setLocalDateOfLastReadAsToday();
        })
    }

    getLocalDateOfLastRead(){
        localforage.getItem(DATE_KEY).then(value => {
            this.setDateOfLastUpdateRead(value || "");
        })
    }

    setLocalDateOfLastReadAsToday(){
        localforage.setItem(DATE_KEY,DateTime.local().toISODate()).then( value => {
            this.setDateOfLastUpdateRead(value);
        } )
    }

    setLocalToOldDateForTesting(isoDate){
        localforage.setItem(DATE_KEY,isoDate).then( value => {
            this.setDateOfLastUpdateRead(value);
        } )
    }





}
