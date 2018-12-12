import { observable, computed, action } from "mobx";
import moment from "moment"
import auth from "./oauth2"
import { Client } from "minio"

import Login from "./Login"
import Home from "./components/Home"
import Faqs from "./components/Faqs"
import InfoEd from "./components/InfoEd"
import SymptomOverview from "./components/SymptomOverview"
import TbQuiz from "./components/TbQuiz"
import Notes from "./components/Notes"

class Store {
  @observable authorization_certificate = null

  @observable currentPage = Login

  @observable notes = []
  @observable noteDraft = null
  @observable noteTitle = null

  @observable events = [
    { date: moment("2018.12.01", "YYYY.MM.DD"), type: "observation", },
    { date: moment("2018.12.01", "YYYY.MM.DD"), type: "questionnaire_response", questionnaire_name: "self_report" },
    { date: moment("2018.12.01", "YYYY.MM.DD"), type: "questionnaire_response", questionnaire_name: "symptoms" },

    { date: moment("2018.12.02", "YYYY.MM.DD"), type: "observation", },
    { date: moment("2018.12.02", "YYYY.MM.DD"), type: "questionnaire_response", questionnaire_name: "self_report" },
    { date: moment("2018.12.02", "YYYY.MM.DD"), type: "questionnaire_response", questionnaire_name: "symptoms" },

    { date: moment("2018.12.04", "YYYY.MM.DD"), type: "observation", },
    { date: moment("2018.12.04", "YYYY.MM.DD"), type: "questionnaire_response", questionnaire_name: "self_report" },
    { date: moment("2018.12.04", "YYYY.MM.DD"), type: "questionnaire_response", questionnaire_name: "symptoms" },

    { date: moment("2018.12.05", "YYYY.MM.DD"), type: "observation", },
    { date: moment("2018.12.05", "YYYY.MM.DD"), type: "questionnaire_response", questionnaire_name: "self_report" },
    { date: moment("2018.12.05", "YYYY.MM.DD"), type: "questionnaire_response", questionnaire_name: "symptoms" },

    { date: moment("2018.12.07", "YYYY.MM.DD"), type: "observation", },
    { date: moment("2018.12.07", "YYYY.MM.DD"), type: "questionnaire_response", questionnaire_name: "self_report" },
    { date: moment("2018.12.07", "YYYY.MM.DD"), type: "questionnaire_response", questionnaire_name: "symptoms" },

    { date: moment("2018.12.08", "YYYY.MM.DD"), type: "observation", },
    { date: moment("2018.12.08", "YYYY.MM.DD"), type: "questionnaire_response", questionnaire_name: "self_report" },
    { date: moment("2018.12.08", "YYYY.MM.DD"), type: "questionnaire_response", questionnaire_name: "symptoms" },

    { date: moment("2018.12.09", "YYYY.MM.DD"), type: "observation", },
    { date: moment("2018.12.09", "YYYY.MM.DD"), type: "questionnaire_response", questionnaire_name: "self_report" },
    { date: moment("2018.12.09", "YYYY.MM.DD"), type: "questionnaire_response", questionnaire_name: "symptoms" },

    { date: moment("2018.12.10", "YYYY.MM.DD"), type: "observation", },
    { date: moment("2018.12.10", "YYYY.MM.DD"), type: "questionnaire_response", questionnaire_name: "self_report" },
    { date: moment("2018.12.10", "YYYY.MM.DD"), type: "questionnaire_response", questionnaire_name: "symptoms" },

    { date: moment("2018.12.11", "YYYY.MM.DD"), type: "observation", },
    { date: moment("2018.12.11", "YYYY.MM.DD"), type: "questionnaire_response", questionnaire_name: "self_report" },
    { date: moment("2018.12.11", "YYYY.MM.DD"), type: "questionnaire_response", questionnaire_name: "symptoms" },
  ]

  @action loadSession() {
    this.authorization_certificate = "abc123"
  }

  @computed get currentPath() {
    return this.currentPage.route
  }

  @computed get currentPageTitle() {
    switch(this.currentPage) {
      case Notes: return "Mis Notas"
      case Faqs: return "Información y Educación"
      case SymptomOverview: return "Información y Educación"
      case TbQuiz: return "TB Quiz"
      case InfoEd: return "Información y Educación"
      case Home: return "Inicio"
      default: return "TB Asistente Diario"
    }
  }

  @computed get authorized() {
    // Ideally, this would be a server call
    // to trace the authorization chain upwards.
    //
    // TODO
    // For now, we force logged in.
    return true
  }

  @action showHome() {
    this.showPage(Home)
  }

  @action showPage(page) {
    if(this.authorized)
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

  }

  @action complete_oauth_flow(params) {
    auth.finish_flow(
      window.location.hash,

      response => {
        this.authorization_certificate = response.token
        this.showHome()
      },

      fail => {
        this.authorization_certificate = null
        this.currentPage = Login
        this.flash(fail.error)
      }
    )
  }

  // TODO display a flash message
  @action flash() {
  }

  @action logout() {
    this.authorization_certificate = null
    this.currentPage = Login
  }

  @action saveNote() {
    let now = moment().format("YYYY-MM-DD HH:mm:ss")

    return fetch(`${process.env.REACT_APP_API_PATH}/api/v1.0/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.authorization_certificate}`,
      },
      body: JSON.stringify({
        "title": this.noteTitle,
        "text": this.noteDraft,
        "created": now,
        "lastmod": now,

        // TODO Remove this param.
        // Requires an API change to scope notes to the current user.
        "patient_id": this.patient_id,
      })
    })
      .then(() => {
        this.noteDraft = null
        this.noteTitle = null
        this.loadNotes()
      })
  }

  // TODO set the authorization certificate
  //
  // TODO Remove the `patient_id` URL param.
  // Requires an API change to scope notes to the current user.
  @action loadNotes() {
    return fetch(`${process.env.REACT_APP_API_PATH}/api/v1.0/notes?patient_id=${this.patient_id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${"abc123"}`,
      },
    })
      .then(response => response.json())
      .then(body => { this.notes = body.notes })
  }

  @action composeNote() {
    this.noteTitle = ""
    this.noteDraft = ""
  }

  @action storePhoto(photo) {
    const minioClient = new Client({
      endPoint: "localhost",
      port: 9001,
      useSSL: false,
      accessKey: 'minio',
      secretKey: 'minio123'
    });

    let reader = new FileReader()

    reader.onload = (evt) => {
      let blob = evt.target.result

      minioClient.putObject(
        'foo',
        photo.name,
        blob,
        { 'Content-Type': photo.type },
        (err, etag) => {
          if (err) return console.log(err)
          console.log('File uploaded successfully.')
          this.uploadedImages.push(`data:${photo.type};base64,` + btoa(blob))
        }
      )
    }

    reader.readAsBinaryString(photo);
  }

  @observable uploadedImages = []
}

export default Store
