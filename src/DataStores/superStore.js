export default class SuperStore {

    constructor(strategy, routes) {
        this.strategy = strategy;
        this.routes = routes;
    }

    executeRequest(type, body) {
        return this.strategy.executeRequest(this.routes, type, body).then(res => {

            if (res instanceof Error) {
                //Check if loggin to provide different error
                if (type != "login") {
                    this.expired = true;
                }
                return ""
            } else {
                return res
            }

        })
    }
}