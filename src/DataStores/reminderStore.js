import { action, observable, computed } from "mobx";
import APIStore from './apiStore'
import { DateTime } from "luxon";

const initalizeReport = {
    category: "check_in",
    otherCategory: "",
    datetime: DateTime.local(),
    note: ""

}

export default class ReminderStore extends APIStore {

    @observable reminders = []
    @observable loading = false;
    @observable sending = false;
    @observable success = false;
    @observable deleteSuccess = false;

    @observable newReminder = initalizeReport;

    constructor(strategy) {
        super(strategy);
    }

    @action setCategory = (category) => {
        this.newReminder.category = category
    }

    @action setNote = (note) => {
        this.newReminder.note = note;
    }

    @action setOther = (category) => {
        this.newReminder.otherCategory = category;
    }

    @action setDate = (datetime) => {
        this.newReminder.datetime = datetime
    }

    delete = (patientId,id) => {
        this.executeRawRequest(`/patient/${patientId}/reminders/${id}`, "DELETE").then(response => {
            this.getReminders(patientId);
            this.deleteSuccess = true;
        })
    }

    @action getReminders = (id) => {
        this.executeRawRequest(`/v2/patient/${id}/reminders`, "GET").then(response => {
            this.reminders = response;
        })
    }

    @action create = (id) => {
        this.loading = true;
        this.executeRawRequest(`/patient/${id}/reminders`, "POST", this.newReminder).then(res => {
            this.loading = false;
            this.success = true;
            window.setTimeout(()=>{
                this.success = false;
            },5000)
            this.getReminders(id);
        })

    }


}