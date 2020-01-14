import { action, observable } from "mobx";
import APIStore from './apiStore';

const ROUTES = {
    login: ["/authenticate", "POST"],
}

export default class LoginStore extends APIStore {

    constructor(strategy) {
        super(strategy, ROUTES);
    }

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
                this.persistUserData(json);
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