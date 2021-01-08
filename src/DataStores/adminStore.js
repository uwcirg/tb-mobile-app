import { action, observable, computed, autorun, toJS } from "mobx";
import { UserStore } from './userStore';

const ROUTES = {
    coordinators: ["/practitioners", "GET"],
    getCurrentAdministrator: ["/user/current", "GET"],
    getSites: ["/organizations", "GET"],
    getSummary: ["/trial-summary","GET"],
    getPhotos: ["/photo_reports","GET"],
    getPatients: ["/study/patients","GET"]
}

export default class AdminStore extends UserStore {

    @observable sites = []

    @observable patients = {
        data: [],
        loading: true,
        error: false
    }

    @observable summary = {
        data: {},
        loading: true,
        error: false
    }
    @observable recentPhotos = {
        data: [],
        loading: true,
        error: false
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

    @action setPatients = (patients) => {
        this.patients.loading = false;
        this.patients.data = patients;
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

    getPatients = () => {
        this.executeRequest('getPatients').then(res => {
            this.setPatients(res);
        })
    }



}
