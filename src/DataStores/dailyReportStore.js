import APIStore from "./apiStore";
import { action, observable, computed, autorun, toJS } from "mobx";
import {addReportToOfflineCache , getNumberOfCachedReports, getListOfCachedReports} from './SaveReportOffline'

export default class DailyReportStore extends APIStore{


    @observable cachedReports = {}
    @observable syncing = false;
    @observable finished = false;
    @observable numberOfflineReports = 0;


    @computed get offlineReportsList(){
        return Object.values(this.cachedReports);
    }

    @action syncOfflineReports = () => {
        this.getCachedReports().then(() => {
            this.syncing = true;
            window.setTimeout(()=>{
                this.syncing=false
                this.finished=true;
            },
            3000)
        })
    }

    @action getCachedReports = () => {
        return getListOfCachedReports().then( value => {
            this.cachedReports = value;
            this.numberOfflineReports = Object.keys(value).length
        })
    }

    @action uploadAllCachedReports = () => {
        getListOfCachedReports().then(object => {
            Object.values(object).map( each => {
                console.log("REPORT UPLOADING")
                console.log(each.date)
            })
        })
    }
}
