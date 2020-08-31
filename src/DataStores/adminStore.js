import { action, observable, computed, autorun, toJS } from "mobx";
import { UserStore } from './userStore';

const ROUTES = {
    coordinators: ["/practitioners", "GET"],
    getCurrentAdministrator: ["/user/current", "GET"],
    getSites: ["/organizations", "GET"]
}

export default class AdminStore extends UserStore {

    @observable sites = []

    constructor(strategy) {
        super(strategy, ROUTES, "Administrator")
    }

    @action setSites = (sites) => {
        this.sites = sites
    }

    getSites = () => {
        this.executeRequest('getSites').then(res => {
            this.setSites(res);
        })
    }

}
