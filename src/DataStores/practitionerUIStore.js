import { observable, action, computed, autorun } from 'mobx';

//Extends this file https://github.com/alisd23/mobx-react-router/blob/master/src/store.js

export default class PractitionerUIStore {

    constructor(routerStore) {
        this.router = routerStore;
    }

    @observable onOnboarding = false;

    @computed get tabNumber(){
        const splitPath = this.router.location.pathname.split("/");

        //Get the tab the user is one. ie. if on baseURL/home they are on the first tab
        if (splitPath[1] === "home") return 0
        if (splitPath[1] === "patients") return 1
        if (splitPath[1] === "messaging") return 2
        if (splitPath[1] === "settings") return 3
        return 0
    }
}