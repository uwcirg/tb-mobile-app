import Aviator from "aviator"
import { autorun } from "mobx"

import Faqs from "./components/Faqs"
import Home from "./components/Home"
import InfoEd from "./components/InfoEd"
import Notes from "./components/Notes"
import Survey from "./components/Survey"
import SymptomOverview from "./components/SymptomOverview"
import TbQuiz from "./components/TbQuiz"

export const startRouter = (store) => {
  Aviator.setRoutes({
    "/": () => store.showPage(Home),

    "/info/faqs": () => store.showPage(Faqs),
    "/info/symptom-overview": () => store.showPage(SymptomOverview),
    "/info/tb-quiz": () => store.showPage(TbQuiz),
    "/info": () => store.showPage(InfoEd),

    "/notes": () => store.showPage(Notes),
    "/survey": () => store.showPage(Survey),

    "/redirect": (params) => store.complete_oauth_flow(params),
  })

  Aviator.dispatch()

  autorun(() => {
    const path = store.currentPath

    if(path !== window.location.pathname)
      window.history.pushState(null, null, path)
  })
}
