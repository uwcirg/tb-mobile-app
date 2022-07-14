import APIHelper from "./Requests";

const api = new APIHelper();

const { request } = api;

export default class SharedAPI {
  static async getPhoto(photoId) {
    return request(`/v2/photo_reports/${photoId}`);
  }

  static async getDailyReports(patientId) {
    return request(`/v2/patient/${patientId}/daily_reports`);
  }

  static async addAppointment(patientId, body) {
    return request(`/v2/patient/${patientId}/reminders`, "POST", body);
  }

  static async getAppointments(patientId) {
    return request(`/v2/patient/${patientId}/reminders`);
  }

  static async deleteAppointment(reminderId) {
    return request(`/v2/reminders/${reminderId}`, 'DELETE');
  }
}
