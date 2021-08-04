import APIHelper from "./Requests";

export default class PatientInformationAPI {

    constructor(patientID) {
        this.patientID = patientID;
        this.api = new APIHelper();
    }

    get patientPath() {
        return `/v2/patient/${this.patientID}`;
    }

    createContactTracingSurvey(numberContacts, numberTested) {
        const body = {
            contactTracingSurvey: {
                numberOfContacts: numberContacts,
                numberOfContactsTested: numberTested
            }
        }

        return this.api.executeRawRequest(`${this.patientPath}/contact_tracing_surveys`, "POST", body)
    }

}