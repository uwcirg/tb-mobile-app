import Aviator from "aviator"
import { autorun } from "mobx"

import { observable, computed, action } from "mobx";
import moment from "moment"
import Assemble from "../Assemble"

class Provider {
  assemble = new Assemble(``)

  @observable alerts = []
  @observable patients = []

  constructor() {
    this.assemble.watch("cirg")`
      provider.patients
    `(response => {
      response
        .json()
        .then(action(patients => {
          this.patients = patients
        }))
    })
  }

  @action alert(message) {
    this.alerts.push(message)
  }

  @action dismissAlert(message) {
    var index = this.alerts.indexOf(message);

    if (index > -1) {
      this.alerts.splice(index, 1);
    }
  }
}

export default Provider
