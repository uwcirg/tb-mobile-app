import { DateTime } from "luxon";
import APIHelper from "./Requests";

const api = new APIHelper();

export default class PractitionerAPI{

    static async getPatients(){
        return api.executeRawRequest("/v2/patients")
    }

    static async getPatientIssues(){
        return api.executeRawRequest("/v2/patient_issues")
    }

    static async getMessages(channelId){
        return api.executeRawRequest(`/v2/channel/${channelId}/messages`)
    }

    static async resolvePatient(patientId){
        return api.executeRawRequest('/v2/resolutions',"POST",{
            patientId: patientId,
            kind: "General",
            resolvedAt: DateTime.local().toISO()
        })
    }


}