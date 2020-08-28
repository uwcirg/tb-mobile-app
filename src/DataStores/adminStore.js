import { action, observable, computed, autorun, toJS } from "mobx";
import { UserStore } from './userStore';

const ROUTES = {
    coordinators: ["/practitioners", "GET"],
    getCurrentAdministrator: ["/user/current", "GET"]
}

export default class AdminStore extends UserStore {

    constructor(strategy) {
        super(strategy, ROUTES, "Administrator")
    }

}
