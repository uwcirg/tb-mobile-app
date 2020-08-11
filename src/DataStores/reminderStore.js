import { action, observable, computed } from "mobx";
import APIStore from './apiStore'
import { DateTime } from "luxon";

const ROUTES = {
    addPatient: ["/patient", "POST"]
}

const initalizeReport = {
    type: "appointment",
    customType: "",
    datetime: DateTime.local()

}

export default class ReminderStore extends APIStore {

    @observable reminders = []
    @observable loading = false;
    @observable sending = false;
    @observable success = false;
    @observable deleteSuccess = false;

    @observable newReminder = initalizeReport;

    constructor(strategy) {
        super(strategy, ROUTES);
    }

    @action setType = (type) => {
        this.newReminder.type = type
    }

    @action setDate = (datetime) => {
        this.newReminder.datetime = datetime
    }

    delete = (patientId,id) => {
        this.executeRawRequest(`/patients/${patientId}/reminders/${id}`, "DELETE").then(response => {
            this.getReminders(patientId);
            this.deleteSuccess = true;
        })
    }

    @action getReminders = (id) => {
        this.executeRawRequest(`/patients/${id}/reminders`, "GET").then(response => {
            this.reminders = response;
        })
    }

    @action create = (id) => {
        const body = {
            category: this.newReminder.type,
            datetime: this.newReminder.datetime
        }
        this.loading = true;
        this.executeRawRequest(`/patients/${id}/reminders`, "POST", body).then(res => {
            this.loading = false;
            this.success = true;
            window.setTimeout(()=>{
                this.success = false;
            },5000)
            this.getReminders(id);
        })

    }


}