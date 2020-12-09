import { action, observable, computed, autorun, toJS } from "mobx";
import { UserStore } from './userStore';

const ROUTES = {
    coordinators: ["/practitioners", "GET"],
    getCurrentAdministrator: ["/user/current", "GET"],
    getSites: ["/organizations", "GET"],
    getSummary: ["/trial-summary","GET"],
    getPhotos: ["/photo_reports","GET"]
}

export default class AdminStore extends UserStore {

    @observable sites = []
    @observable summary = {
        data: {},
        loading: true
    }
    @observable recentPhotos = {
        data: [],
        loading: true
    }

    constructor(strategy) {
        super(strategy, ROUTES, "Administrator")
    }

    @action setSites = (sites) => {
        this.sites = sites
    }

    @action setSummary = (summary) => {
        this.summary.loading = false;
        this.summary.data = summary;
    }

    @action setPhotos = (photos) => {
        this.recentPhotos.loading = false;
        this.recentPhotos.data = photos;
    }

    getSites = () => {
        this.executeRequest('getSites').then(res => {
            this.setSites(res);
        })
    }

    getSummary = () => {
        this.summary.loading = true;
        this.executeRequest('getSummary').then(res => {
            this.setSummary(res);

        })
    }

    getPhotos = () => {
        this.recentPhotos.loading = true;
        this.executeRequest('getPhotos').then(res => {
            this.setPhotos(res)
        })
    }

    getDashboardData = () => {
        this.getPhotos();
        this.getSummary();
    }

}
