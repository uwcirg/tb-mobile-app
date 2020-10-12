import { observable } from "mobx";
import {stores} from './index'

export default class APIStore {

    constructor(strategy, routes) {
        this.strategy = strategy;
        this.routes = routes;
    }

    @observable authorizationFailed = false;

    executeRequest(type, body, options) {
        return this.strategy.executeRequest(this.routes, type, body, options).then(response => {
            this.checkAuth(response)
            return response
        })
    }

    executeRawRequest(url,method,body){
        return this.strategy.executeRawRequest(url,method,body).then(response => {
            this.checkAuth(response)
            return response
        })
    }

    checkAuth(response){
        if(response && (response.status === 401 || response.status === 422) && !response.isLogin ){
            stores.uiStore.setAuthError();
        }
    }

}