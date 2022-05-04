import APIHelper from "./Requests";

const api = new APIHelper();

export default class SharedAPI {

    static async getPhoto(photoId) {
        return api.executeRawRequest(`/v2/photo_reports/${photoId}`)
    }

}