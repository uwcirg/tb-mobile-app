import localforage from 'localforage'

const CACHE_KEY = 'cachedReports'

export function addReportToOfflineCache(report) {
    return localforage.getItem(CACHE_KEY).then(value => {
        let oldReports
        oldReports = (value != null ? value : {})
        oldReports[report.date] = report;

        if (oldReports) {
            return localforage.setItem(CACHE_KEY, oldReports)
        }

    }).catch(err => {
        console.log("Error getting cached reports")
        console.log(err)
    })

}

export function getNumberOfCachedReports() {
    return localforage.getItem(CACHE_KEY).then(value => {
        if (value === null) {
            return 0
        }

        try {
            return (Object.keys(value).length)

        } catch (err) {
            console.log("Error reacding JSON from IndexDB", err)
            return 0
        }

    })

}

export function getListOfCachedReports() {
    return localforage.getItem(CACHE_KEY).then(value => {
        return (value !== null ? value : {})
    })
}

export function testObject() {
    return localforage.setItem("testObject", { plain: "object", letSee: { title: "not JSON stringify needed" } }).catch(err => { console.log("BIG ERROR") })
}