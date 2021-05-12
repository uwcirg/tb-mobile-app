import { action, observable, computed } from "mobx";
import localforage from 'localforage'
import raw from "raw.macro";
import { DateTime } from "luxon";
import i18n from "../Language/i18n";

const DATE_KEY = "dateOfLastUpdateRead"
const MESSAGING_REMINDER_KEY = "messagingReminderSeen"

export default class EducationStore {

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.getLocalDateOfLastRead();
        this.getLocalMessagingReminderRead();
    }

    treatmentUpdates = i18n.t('treatmentUpdates',{returnObjects: true})

    @observable educationStatus = []
    @observable dateOfLastUpdateRead = DateTime.local().toISODate();;
    @observable currentDate = DateTime.local().toISODate();
    @observable exited = false;

    //For Visibility for PatientChatReminder component, default to true so it doesnt flash
    @observable patientChatReminderRead = true;

    @action setEducationStatus(response) {

        this.educationStatus = response.map(each => {
            if (each.treatmentDay === null) {
                throw new Error("Education Status Response did not include treatmentDay for at least one item")
            }
            return each.treatmentDay
        })
    }

    @action setDateOfLastUpdateRead(value) {
        this.dateOfLastUpdateRead = value;
    }

    @action updateCurrentDate() {
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
            //Ensure that the earliest message is always shown first
            .sort( (a,b) => a -b)
        }
        return [];
    }

    @computed get dayShown() {
        return this.availableMessages[0]
    }

    @computed get message() {
        return this.availableMessages.length > 0 && this.treatmentUpdates[this.dayShown]
    }

    @computed get hasDayPassedSinceLastUpdateRead() {
        //As long as its not the same date as the last view recorded, show an update
        return this.dateOfLastUpdateRead !== this.currentDate;
    }

    @computed get patientChatReminderIsVisible(){
        return !this.message && !this.patientChatReminderRead;
    }

    markEducationAsRead(wasHelpful) {
        const body = { treatmentDay: this.dayShown }
        wasHelpful !== undefined && (body.wasHelpful = wasHelpful)
        this.rootStore.executeRawRequest(`/patient/${this.rootStore.userID}/education_statuses`, "POST", body).then((json) => {
            this.setEducationStatus(json);
            this.setLocalDateOfLastReadAsToday();
        })
    }

    getLocalDateOfLastRead() {
        localforage.getItem(DATE_KEY).then(value => {
            this.setDateOfLastUpdateRead(value || "");
        })
    }

    setLocalDateOfLastReadAsToday() {
        localforage.setItem(DATE_KEY, DateTime.local().toISODate()).then(value => {
            this.setDateOfLastUpdateRead(value);
        })
    }

    setLocalToOldDateForTesting(isoDate) {
        localforage.setItem(DATE_KEY, isoDate).then(value => {
            this.setDateOfLastUpdateRead(value);
        })
    }

    getLocalDateOfLastRead() {
        localforage.getItem(DATE_KEY).then(value => {
            this.setDateOfLastUpdateRead(value || "");
        })
    }

    getLocalMessagingReminderRead() {
        localforage.getItem(MESSAGING_REMINDER_KEY).then(value => {
            this.patientChatReminderRead = value ? true : false;
        })
    }

    setLocalMessagingReminderRead() {
        localforage.setItem(MESSAGING_REMINDER_KEY, true).then(value => {
            this.patientChatReminderRead = true;
        })
    }

    checkForChanges(){
        this.updateCurrentDate();
        this.getLocalDateOfLastRead();
    }

    @action setExited = (value) => {
        this.exited = value;
    }







}
