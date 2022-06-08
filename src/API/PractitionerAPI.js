import { DateTime } from 'luxon';
import APIHelper from './Requests';

const api = new APIHelper();

export default class PractitionerAPI {
  static async getPatients(all = false) {
    if (all) {
      return api.executeRawRequest(
        '/v2/patients?all=true&shortSerializer=true'
      );
    }
    return api.executeRawRequest('/v2/patients');
  }

  static async getPatientIssues() {
    return api.executeRawRequest('/v2/patient_issues');
  }

  static async getMessages(channelId) {
    return api.executeRawRequest(`/v2/channel/${channelId}/messages`);
  }

  static async resolvePatient(patientId) {
    return api.executeRawRequest('/v2/resolutions', 'POST', {
      patientId: patientId,
      kind: 'General',
      resolvedAt: DateTime.local().toISO(),
    });
  }

  // What is actually important to post?.
  // The objects that get processed rn with add patient
  // return account:{...}, code: "numberString"

  static async addPatient(patientId, body) {
    console.log(patientId);
    return api.executeRawRequest('/patients', 'POST', body);
  }

  static async reviewPhoto(photoReportId, body) {
    return api.executeRawRequest(
      `/v2/photo_reports/${photoReportId}`,
      'PATCH',
      body
    );
  }
}
