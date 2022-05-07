import APIHelper from "./Requests";

const api = new APIHelper();

export default class SharedAPI {

    static async getPhoto(photoId) {
        return api.executeRawRequest(`/v2/photo_reports/${photoId}`)
    }

    static async getDailyReports(patientId) {
        return api.executeRawRequest(`/v2/patient/${patientId}/daily_reports`)
    }

}