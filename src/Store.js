import { observable, computed, action } from "mobx";
import moment from "moment"
import auth from "./oauth2"

import {
  getExpiration,
  getToken,
  hasToken,
  removeToken,
  setToken,
} from "./util/token"

import Login from "./Login"
import Home from "./components/Home"
import Faqs from "./components/Faqs"
import InfoEd from "./components/InfoEd"
import SymptomOverview from "./components/SymptomOverview"
import Messaging from "./components/Messaging"
import TbQuiz from "./components/TbQuiz"
import Notes from "./components/Notes"

import SurveyConfig from "./Survey"
import Survey from "./components/Survey"
import ReportMedication from "./components/ReportMedication"
import ReportSymptoms from "./components/ReportSymptoms"
import PhotoUpload from "./components/PhotoUpload"

class Store {
  @observable isLoggedIn = false
  @observable token = null
  @observable expiration = null
  @observable error = null
  @observable isLoggingIn = false

  @observable currentPage = Login

  @observable patient_id = 88
  @observable notes = []
  @observable noteDraft = null
  @observable noteTitle = null

  @observable events = [
    { date: moment("2018.10.27", "YYYY.MM.DD"), type: "observation", },
    { date: moment("2018.10.27", "YYYY.MM.DD"), type: "questionnaire_response", questionnaire_name: "self_report" },
    { date: moment("2018.10.27", "YYYY.MM.DD"), type: "questionnaire_response", questionnaire_name: "symptoms" },

    { date: moment("2018.10.28", "YYYY.MM.DD"), type: "observation", },
    { date: moment("2018.10.28", "YYYY.MM.DD"), type: "questionnaire_response", questionnaire_name: "self_report" },
    { date: moment("2018.10.28", "YYYY.MM.DD"), type: "questionnaire_response", questionnaire_name: "symptoms" },

    { date: moment("2018.10.29", "YYYY.MM.DD"), type: "observation", },
    { date: moment("2018.10.29", "YYYY.MM.DD"), type: "questionnaire_response", questionnaire_name: "self_report" },
    { date: moment("2018.10.29", "YYYY.MM.DD"), type: "questionnaire_response", questionnaire_name: "symptoms" },

    { date: moment("2018.10.30", "YYYY.MM.DD"), type: "observation", },
    { date: moment("2018.10.30", "YYYY.MM.DD"), type: "questionnaire_response", questionnaire_name: "self_report" },
    { date: moment("2018.10.30", "YYYY.MM.DD"), type: "questionnaire_response", questionnaire_name: "symptoms" },

    { date: moment("2018.10.31", "YYYY.MM.DD"), type: "observation", },
    { date: moment("2018.10.31", "YYYY.MM.DD"), type: "questionnaire_response", questionnaire_name: "self_report" },
    { date: moment("2018.10.31", "YYYY.MM.DD"), type: "questionnaire_response", questionnaire_name: "symptoms" },

    { date: moment("2018.11.01", "YYYY.MM.DD"), type: "observation", },
    { date: moment("2018.11.01", "YYYY.MM.DD"), type: "questionnaire_response", questionnaire_name: "self_report" },
    { date: moment("2018.11.01", "YYYY.MM.DD"), type: "questionnaire_response", questionnaire_name: "symptoms" },

    { date: moment("2018.11.02", "YYYY.MM.DD"), type: "observation", },
    { date: moment("2018.11.02", "YYYY.MM.DD"), type: "questionnaire_response", questionnaire_name: "self_report" },
    { date: moment("2018.11.02", "YYYY.MM.DD"), type: "questionnaire_response", questionnaire_name: "symptoms" },

    { date: moment("2018.11.04", "YYYY.MM.DD"), type: "observation", },
    { date: moment("2018.11.04", "YYYY.MM.DD"), type: "questionnaire_response", questionnaire_name: "self_report" },
    { date: moment("2018.11.04", "YYYY.MM.DD"), type: "questionnaire_response", questionnaire_name: "symptoms" },

    { date: moment("2018.11.05", "YYYY.MM.DD"), type: "observation", },
    { date: moment("2018.11.05", "YYYY.MM.DD"), type: "questionnaire_response", questionnaire_name: "self_report" },
    { date: moment("2018.11.05", "YYYY.MM.DD"), type: "questionnaire_response", questionnaire_name: "symptoms" },
  ]

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
      case Messaging: return "Mensajería"
      case Notes: return "Mis Notas"
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
    auth.start_flow({
      url: process.env.REACT_APP_API_PATH + "/oauth2/authorize",
      client: process.env.REACT_APP_CLIENT_ID,
      redirect: process.env.REACT_APP_REDIRECT_PATH,
      scope: "email",
    })

    this.isLoggingIn = true
  }

  @action complete_oauth_flow(params) {
    auth.finish_flow(
      window.location.hash,
      response => {
        this.loginSuccess(response)
        this.showHome()
      },
      error => this.loginFailure(error),
    )
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

  @action saveNote() {
    let now = moment().format("YYYY-MM-DD HH:mm:ss")

    return fetch(`${process.env.REACT_APP_API_PATH}/api/v1.0/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.token}`,
      },
      body: JSON.stringify({
        "title": this.noteTitle,
        "text": this.noteDraft,
        "created": now,
        "lastmod": now,
        // TODO do not commit this.
        "patient_id": this.patient_id,
      })
    })
      .then(() => {
        this.noteDraft = null
        this.noteTitle = null
        this.loadNotes()
      })
  }

  @action loadNotes() {
    // TODO remove `patient_id`
    return fetch(`${process.env.REACT_APP_API_PATH}/api/v1.0/notes?patient_id=${this.patient_id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.token}`,
      },
    })
      .then(response => response.json())
      .then(body => { this.notes = body.notes })
  }

  @action composeNote() {
    this.noteTitle = ""
    this.noteDraft = ""
  }

  @action reportMedication(date) {
    this.survey = new SurveyConfig(this)
    this.survey.date = moment(date) || moment()

    this.survey.push(ReportMedication)
    this.survey.push(ReportSymptoms)
    this.survey.push(PhotoUpload)

    this.currentPage = Survey
  }
}

export default Store
