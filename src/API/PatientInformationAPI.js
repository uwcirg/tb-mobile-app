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

    async submitBackPhotoReport(photoString){
        const {uploadURL,fileName} = await this.getPhotoUploadURL();
       
        const imageString = photoString.replace(/^data:image\/\w+;base64,/, "")
        const buffer = Buffer.from(imageString,'base64');

        const uploaded = await fetch(uploadURL, {
            method: 'PUT',
            body: buffer
        }).then((res) => {
            return true;
        }).catch((e) => {
            console.error(e);
            return false;
        });

        return {uploaded: uploaded,fileName: fileName}

    }

    async getPhotoUploadURL(){
        return this.request("/v2/photo_upload_urls?type=test-strip-photo","POST").then(json => {
            return json;
        })
    }


}