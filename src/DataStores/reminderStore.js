import { action, observable, computed } from "mobx";
import APIStore from './apiStore'
import { DateTime } from "luxon";

const ROUTES = {
    addPatient: ["/patient", "POST"]
}

const initalizeReport = {
    type: "appointment",
    customType: "",
    date: DateTime.local()

}

export default class ReminderStore extends APIStore {

    @observable reminders = []
    @observable loading = false;
    @observable sending = false;

    @observable newReminder = initalizeReport;

    constructor(strategy) {
        super(strategy, ROUTES);
    }

    @action setType = (type) => {
        this.newReminder.type = type
    }

    @action setDate = (date) => {
        this.newReminder.date = date
    }

    getReminders = (id) => {
        this.executeRawRequest(`/patients/${id}/reminders`, "GET").then(response => {
            this.reminders = response;
        })

    }




}