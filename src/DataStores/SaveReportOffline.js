import localforage from 'localforage'

export function addReportToOfflineCache(report) {
    localforage.getItem('cachedReports').then(value => {
        let oldReports
        try {
            oldReports = (value != null ? JSON.parse(value) : {})
            oldReports[report.date] = report;
        } catch (err) {
            console.log("Error Reading JSON from IndexedDB ", err)
        }

        if (oldReports) {
            return localforage.setItem('cachedReports', JSON.stringify(oldReports))
        }

    }).catch(err => {
        console.log("Error getting cached reports")
        console.log(err)
    })

}

export function getNumberOfCachedReports() {
    return localforage.getItem('cachedReports').then(value => {
        if (value === null) {
            return 0
        }

        try {
            const reports = JSON.parse(value)
            return(Object.keys(reports).length)

        } catch (err) {
           console.log("Error reacding JSON from IndexDB", err)
           return 0
        }

    })

}