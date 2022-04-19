import APIHelper from "./Requests";

const api = new APIHelper();

export default class PractitionerAPI{

    static async getPatients(){
        return api.executeRawRequest("/v2/patients")
    }

    static async getMessages(channelId){
        return api.executeRawRequest(`/v2/channel/${channelId}/messages`)
    }


}