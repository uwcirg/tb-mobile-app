import { observable, computed, action } from "mobx";

import authorize from "./oauth2"

import {
  getExpiration,
  getToken,
  hasToken,
  removeToken,
  setToken,
} from "./util/token"

import Login from "./Login"
import DailyCheckin from "./components/DailyCheckin"
import Home from "./components/Home"
import Faqs from "./components/Faqs"
import InfoEd from "./components/InfoEd"
import SymptomOverview from "./components/SymptomOverview"
import Messaging from "./components/Messaging"
import TbQuiz from "./components/TbQuiz"
import MyNotes from "./components/MyNotes"

class Store {
  fetch = null

  @observable isLoggedIn = false
  @observable token = null
  @observable expiration = null
  @observable error = null
  @observable isLoggingIn = false

  @observable currentPage = Login

  constructor(fetch) {
    this.fetch = fetch
  }

  @action loadSession() {
    this.isLoggedIn = hasToken()
    this.token = getToken()
    this.expiration = getExpiration()
  }

  @computed get currentPath() {
    return this.currentPage.route
  }

  @computed get currentPageTitle() {
    switch(this.currentPage) {
      case DailyCheckin: return "Notificación Diaria"
      case Messaging: return "Mensajería"
      case MyNotes: return "Mis Notas"
      case Faqs: return "Información y Educación"
      case SymptomOverview: return "Información y Educación"
      case TbQuiz: return "TB Quiz"
      case InfoEd: return "Información y Educación"
      case Home: return "Inicio"
      default: return "TB Asistente Diario"
    }
  }

  @action showHome() {
    this.showPage(Home)
  }

  @action showPage(page) {
    if(this.isLoggedIn)
      this.currentPage = page
    else {
      this.currentPage = Login
      // this.alert("Please log in before using the app.")
    }
  }

  @action login(username, password, callback) {
    authorize({
      url: process.env.REACT_APP_API_PATH + "/oauth2/authorize",
      client: process.env.REACT_APP_CLIENT_ID,
      redirect: process.env.REACT_APP_REDIRECT_PATH,
      scope: "email",
    })
    .then(
      response => {
        this.loginSuccess(response)
        this.showHome()
      },
      error => this.loginFailure(error),
    )

    this.isLoggingIn = true
  }

  @action loginSuccess({ token, expiration }) {
    setToken(token, expiration)
    this.isLoggedIn = true
    this.token = token
    this.expiration = expiration
    this.error = null
    this.isLoggingIn = false
  }

  @action loginFailure({ error }) {
    removeToken()
    this.isLoggedIn = false
    this.token = null
    this.expiration = null
    this.error = error
    this.isLoggingIn = false
  }

  @action logout() {
    removeToken()
    this.isLoggedIn = false
    this.token = null
    this.expiration = null
    this.error = null
    this.isLoggingIn = false

    this.currentPage = Login
  }
}

export default Store
