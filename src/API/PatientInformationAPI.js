import APIHelper from "./Requests";

export default class PatientInformationAPI {

    constructor(patientID) {
        this.patientID = patientID;
        this.api = new APIHelper();
    }

    request(route,method,body,options={includeStatus: true}){
        return this.api.executeRawRequest(route,method,body,options)
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

        return this.request(`${this.patientPath}/contact_tracing_surveys`, "POST", body)
    }

}