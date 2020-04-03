export default class APIStore {

    constructor(strategy, routes) {
        this.strategy = strategy;
        this.routes = routes;
    }

    executeRequest(type, body) {
        return this.strategy.executeRequest(this.routes, type, body).then(response => {
            return response
        })
    }

}