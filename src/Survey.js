import { observable, computed, action } from "mobx";
import Home from "./components/Home"

class Survey {
  @observable store = null
  @observable medicationDate
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

  @computed get currentPage() {
    return this.pages[0]
  }
}

export default Survey
