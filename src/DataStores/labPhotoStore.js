import { action, observable } from "mobx";
import APIStore from './apiStore';

const ROUTES = {
    labURL: ["/lab_url", "GET"],
}

export default class LabPhotoStore extends APIStore {

    constructor(strategy) {
        super(strategy, ROUTES);
    }

    getUploadURL = (userType) => {

        return this.executeRequest('labURL', body).then(json => {
            return json.url
        })
    }

    uploadPhoto = (imageString) => {

        imageString = imageString.replace(/^data:image\/\w+;base64,/, "")
        const file = new Buffer(imageString.replace(/^data:image\/\w+;base64,/, ""), 'base64')

        this.executeRequest('labURL').then( (json) => {
            console.log(" url in fetch in uploadphoto " + json.url)
            fetch(json.url, {
                method: 'PUT',
                body: file
            }).then(() => {
                console.log("success in labphoto store")
                // If multiple files are uploaded, append upload status on the next line.
                //document.querySelector('#status').innerHTML += `<br>Uploaded ${file.name}.`;
            }).catch((e) => {
                console.error(e);
            });
        })
    }



}