import { observable } from "mobx";

export default class APIStore {
  constructor(strategy, routes) {
    this.strategy = strategy;
    this.routes = routes;
  }

  @observable authorizationFailed = false;

  executeRequest(type, body, options) {
    return this.strategy
      .executeRequest(this.routes, type, body, options)
      .then((response) => {
        this.strategy.checkAuth(response);
        return response;
      });
  }

  executeRawRequest(url, method, body) {
    return this.strategy
      .executeRawRequest(url, method, body)
      .then((response) => {
        this.strategy.checkAuth(response);
        return response;
      });
  }
}
