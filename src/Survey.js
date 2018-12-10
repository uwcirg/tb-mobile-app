import { observable, action } from "mobx";

class Survey {
  @observable store = null
  @observable date = null
  @observable medicationTime = null
  @observable pages = []

  constructor(store) {
    this.store = store
  }

  @action push(page) {
    this.pages.push(page)
  }

  @action recordMedicationTime(time) {
    this.medicationTime = time
    this.medicationTime.set("year", this.date.year())
    this.medicationTime.set("month", this.date.month())
    this.medicationTime.set("date", this.date.date())
  }
}

export default Survey
