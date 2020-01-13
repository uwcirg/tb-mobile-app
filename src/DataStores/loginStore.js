import { action, observable } from "mobx";
import SuperStore from './superStore';

const ROUTES = {
    login: ["/authenticate", "POST"],
}

export default class LoginStore extends SuperStore {

    constructor(strategy) {
        super(strategy, ROUTES);
    }

    @observable initalLogIn = false;
    @observable identifier = "";
    @observable password = "";

    @action login = (userType) => {

        let body = {
            identifier: this.identifier,
            password: this.password,
            userType: userType
        }

        return this.executeRequest('login', body).then(json => {

            if (json && json.user_id) {
                console.log(json)
                this.initalLogIn = true;
                this.persistUserData(json);
                //this.getPatientInformation()
                this.isLoggedIn = true;
                //this.subscribeToNotifications();
                return json.user_type
            }
            return false;

        })
    }

    persistUserData = (json) => {
        localStorage.setItem("user.token", json.token);
        localStorage.setItem("user.type", json.user_type);
        localStorage.setItem(`userID`, json.user_id);
        localStorage.setItem("token.exp", json.exp);
    }

}