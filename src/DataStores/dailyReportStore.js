import APIStore from "./apiStore";
import { action, observable, computed, autorun, toJS } from "mobx";
import { addReportToOfflineCache, getNumberOfCachedReports, getListOfCachedReports, clearCache } from './SaveReportOffline'

const ROUTES = {
    dailyReport: ["/daily_report", "POST"],
    getPhotoUploadURL: ["/patient/daily_reports/photo_upload_url", "GET"]
}

export default class DailyReportStore extends APIStore {

    constructor(strategy) {
        super(strategy, ROUTES)
    }


    @observable cachedReports = {}
    @observable syncing = false;
    @observable finished = false;
    @observable numberOfflineReports = 0;
    @observable numberUploaded = 0;


    @computed get offlineReportsList() {
        return Object.values(this.cachedReports);
    }

    @action syncOfflineReports = () => {
        this.syncing = true;
        this.getCachedReports().then(() => {

            Object.values(this.cachedReports).map(each => {
                this.modifyReportAndUpload(each)
            })
        })
    }

    @action uploadReport = (body) => {

        this.executeRequest('dailyReport', body, { includeStatus: true }).then(json => {
            if (!json || json.httpStatus >= 400) {
                this.cacheUploadError = true;
            } else {
                this.numberUploaded += 1

                if (this.numberUploaded === this.numberOfflineReports) {
                    clearCache();
                    this.finished = true;
                    this.syncing = false;
                    window.setTimeout(this.reinitalize, 5000)
                }
            }
        })

    }

    uploadPhoto = (photoString) => {

        const imageString = photoString.replace(/^data:image\/\w+;base64,/, "")
        const file = new Buffer(imageString, 'base64')

        return this.executeRequest('getPhotoUploadURL').then((json) => {
            return fetch(json.url, {
                method: 'PUT',
                body: file
            }).then((res) => {
                return json.key
            }).catch((e) => {
                console.error(e);
            });
        })
    }

    @action getCachedReports = () => {
        return getListOfCachedReports().then(value => {
            this.numberOfflineReports = Object.keys(value).length
            this.cachedReports = value;
            return this.cachedReports
        })
    }

    modifyReportAndUpload = (report) => {

        let body = this.buildRequestBody(report)

        if (report.photoString) {
            this.uploadPhoto(report.photoString).then(res => {
                body.photoUrl = res
                this.uploadReport(body);
            })
        } else {

            this.uploadReport(body);
        }
    }

    buildRequestBody = (report) => {
        let body = {};
        report.selectedSymptoms.map((value) => {
            body[value] = true
        })
        body.date = report.date;
        body.medicationWasTaken = report.tookMedication;
        body.whyMedicationNotTaken = report.whyMedicationNotTaken;
        body.dateTimeTaken = report.timeTaken;
        body.doingOkay = report.doingOkay;
        body.doingOkayReason = report.supportReason;
        body.isHistoricalReport = report.isHistoricalReport;
        body.nauseaRating = report.nauseaRating;
        body.createdOffline = true;
        //Todo: removed when refactor method to be shared

        return body;
    }

    @action reinitalize = () => {
        this.cachedReports = {}
        this.syncing = false;
        this.finished = false;
        this.numberOfflineReports = 0;
        this.numberUploaded = 0;
    }
}
