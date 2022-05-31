import APIHelper from "./Requests";

const { executeRawRequest: request } = new APIHelper();

export default class SharedAPI {

    static async getPhoto(photoId) {
        return request(`/v2/photo_reports/${photoId}`)
    }

    static async getDailyReports(patientId) {
        return request(`/v2/patient/${patientId}/daily_reports`)
    }

    static async addAppointment(patientId, body) {
        return request(`/v2/patient/${patientId}/reminders`, "POST", body)
    }

}