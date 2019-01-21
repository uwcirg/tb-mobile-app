import Aviator from "aviator"
import { autorun } from "mobx"

import Home from "./components/Home"
import Provider from "./sessions/Provider"
import ProviderHome from "./components/ProviderHome"

import Faqs from "./components/Faqs"
import InfoEd from "./components/InfoEd"
import Notes from "./components/Notes"
import Survey from "./components/Survey"
import SymptomOverview from "./components/SymptomOverview"

export const startRouter = (store) => {
  Aviator.setRoutes({
    "/": () => store.currentPage = Home,
    "/provider": () => {
      store.currentPage = ProviderHome
      store.provider = new Provider()
    },

    "/info/faqs": () => store.currentPage = Faqs,
    "/info/symptom-overview": () => store.currentPage = SymptomOverview,
    "/info": () => store.currentPage = InfoEd,

    "/notes": () => store.currentPage = Notes,
    "/survey": () => store.currentPage = Survey,

    "/redirect": (params) => store.complete_oauth_flow(params),
  })

  Aviator.dispatch()

  autorun(() => {
    const path = store.currentPath

    if(path !== window.location.pathname)
      window.history.pushState(null, null, path)
  })
}
