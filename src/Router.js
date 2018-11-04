import Aviator from "aviator"
import { autorun } from "mobx"

import DailyCheckin from "./components/DailyCheckin"
import Home from "./components/Home"
import Faqs from "./components/Faqs"
import InfoEd from "./components/InfoEd"
import SymptomOverview from "./components/SymptomOverview"
import Messaging from "./components/Messaging"
import TbQuiz from "./components/TbQuiz"
import Notes from "./components/Notes"

export const startRouter = (store) => {
  Aviator.setRoutes({
    "/": () => store.showPage(Home),

    "/info/faqs": () => store.showPage(Faqs),
    "/info/symptom-overview": () => store.showPage(SymptomOverview),
    "/info/tb-quiz": () => store.showPage(TbQuiz),
    "/info": () => store.showPage(InfoEd),

    "/daily-checkin": () => store.showPage(DailyCheckin),
    "/messages": () => store.showPage(Messaging),
    "/notes": () => store.showPage(Notes),

    "/redirect": (params) => store.complete_oauth_flow(params),
  })

  Aviator.dispatch()

  autorun(() => {
    const path = store.currentPath

    if(path !== window.location.pathname)
      window.history.pushState(null, null, path)
  })
}
