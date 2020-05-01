import { action, observable } from "mobx";
import APIStore from './apiStore';

const ROUTES = {
    labURL: ["/lab_url", "GET"],
    postResult: ["/lab_image_test","POST"]

}

export default class LabPhotoStore extends APIStore {

    constructor(strategy) {
        super(strategy, ROUTES);
    }

    @observable isTestPositive = false;
    @observable testWasRun = false;
    @observable serverRecievedResult = false;

    photoRender = ""
    formResults = {};
    serverResponse = {};

    //For Lab image flow
    @observable photoTaken = false;

    uploadPhoto = (imageString) => {

        imageString = imageString.replace(/^data:image\/\w+;base64,/, "")
        const file = new Buffer(imageString.replace(/^data:image\/\w+;base64,/, ""), 'base64')

        return this.executeRequest('labURL').then( (json) => {
            return fetch(json.url, {
                method: 'PUT',
                body: file
            }).then((res) => {
                return json.key
            }).catch((e) => {
                console.error(e);
            });
        })
    }

    @action uploadSubmission = () => {
        this.formResults.isPositive = this.isTestPositive;
        this.formResults.testWasRun = this.testWasRun;

        //Upload Photo to Bucket service
        this.uploadPhoto(this.photoRender).then( (key) =>{

            //Use Url to build object on backend
            this.formResults.photoURL = key;
            this.executeRequest("postResult", this.formResults).then( res =>{

                this.serverResponse = res;
                this.serverRecievedResult = true;
            })

        })
    }

    clearStore = () => {
        this.isTestPositive = false;
        this.testWasRun = false;
        this.formResults = {};
        this.photoTaken = false;
        this.photoRender = "";
        this.serverRecievedResult = false;
    }



}