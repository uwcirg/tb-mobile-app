import { observable, computed, action } from "mobx";

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

  @action next() {
    this.pages.shift()

    if(this.pages.length === 0)
      this.store.showHome()
  }

  @action recordMedicationTime(time) {
    this.medicationTime = time
    this.medicationTime.set("year", this.date.year())
    this.medicationTime.set("month", this.date.month())
    this.medicationTime.set("date", this.date.date())
  }

  @computed get currentPage() {
    return this.pages[0]
  }
}

export default Survey
