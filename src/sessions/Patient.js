import { observable, computed, action } from "mobx";
import moment from "moment"
import auth from "../oauth2"
import { Client } from "minio"
import { autorun } from "mobx"

import Assemble from "../Assemble"
import "moment-transform"

import Login from "../Login"
import Home from "../components/Home"
import Faqs from "../components/Faqs"
import InfoEd from "../components/InfoEd"
import SymptomOverview from "../components/SymptomOverview"
import Notes from "../components/Notes"

import espanol from "../languages/es"
import english from "../languages/en"

class Store {
  assemble = new Assemble(``)

  @observable authorization_certificate = null

  @observable currentPage = Login

  @observable notes = []
  @observable noteDraft = null
  @observable noteTitle = null

  // History of reports
  @observable medication_reports = []
  @observable symptom_reports = []
  @observable strip_reports = []

  // Current medication report
  @observable survey_date = moment()
  @observable survey_medication_time = moment()

  // Current symptom report
  @observable nausea = false
  @observable redness = false
  @observable hives = false
  @observable fever = false
  @observable appetite_loss = false
  @observable blurred_vision = false
  @observable sore_belly = false
  @observable yellow_coloration = false
  @observable difficulty_breathing = false
  @observable facial_swelling = false
  @observable other = null

  @observable nausea_rating = 0

  // Current strip report
  @observable uploadedImages = []

  @observable language = "Español"
  @observable survey_anySymptoms = false
  @observable survey_tookMedication = true

  @observable alerts = []
  @observable provider = null

  constructor() {
    this.assemble.watch("cirg")`
      user.medication_reports.map { |r| { date: r.timestamp } }
    `(response => {
      response
        .json()
        .then(action(events => {
          this.medication_reports = events.map(event =>
            Object.assign(event, { date: moment(event.date).transform("YYYY-MM-DD 00:00:00.000") })
          )
        }))
    })

    this.assemble.watch("cirg")`
      user.symptom_reports.map { |r| { date: r.timestamp } }
    `(response => {
      response
        .json()
        .then(action(events => {
          this.symptom_reports = events.map(event =>
            Object.assign(event, { date: moment(event.date).transform("YYYY-MM-DD 00:00:00.000") })
          )
        }))
    })

    this.assemble.watch("cirg")`
      user.strip_reports.map { |r| { date: r.timestamp } }
    `(response => {
      response
        .json()
        .then(action(events => {
          this.strip_reports = events.map(event =>
            Object.assign(event, { date: moment(event.date).transform("YYYY-MM-DD 00:00:00.000") })
          )
        }))
    })

    this.assemble.watch("cirg")`
      user.notes
    `(response => {
      response
        .json()
        .then(action(notes => {
          this.notes = notes
        }))
    })

    autorun(() => {
      if (this.difficulty_breathing || this.facial_swelling)
        this.alert(this.translate("symptom_overview.take_action_immediately"))
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
      case InfoEd: return "Información y Educación"
      case Home: return this.translate("home.title")
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
    this.assemble.run("cirg")`
      Note.create!(
        author: user,
        title: ${JSON.stringify(this.noteTitle)},
        text: ${JSON.stringify(this.noteDraft)},
      )
    `
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

    let upload_name = "photo_upload_v1_" + moment().unix()

    let reader = new FileReader()

    reader.onload = (evt) => {
      let blob = evt.target.result

      minioClient.putObject(
        'foo',
        upload_name,
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

    this.assemble.run("cirg")`
      user.strip_reports.create!(
        timestamp: ${JSON.stringify(this.survey_datetime)},
        photo_url: ${JSON.stringify(upload_name)},
      )
    `
  }

  @computed get survey_datetime() {
    let time = this.survey_medication_time.format("HH:MM")
    let datetime = this.survey_date.transform(`YYYY-MM-DD ${time}:00.0000`)
    return datetime
  }

  @action reportMedication() {
    this.assemble.run("cirg")`
      user.medication_reports.create!(
        timestamp: ${JSON.stringify(this.survey_datetime)}
      )
    `
  }

  @action reportSymptoms() {
    this.assemble.run("cirg")`
      user.symptom_reports.create!(
        timestamp: ${JSON.stringify(this.survey_datetime)},
        nausea: ${this.nausea},
        redness: ${this.redness},
        hives: ${this.hives},
        fever: ${this.fever},
        appetite_loss: ${this.appetite_loss},
        blurred_vision: ${this.blurred_vision},
        sore_belly: ${this.sore_belly},
        yellow_coloration: ${this.yellow_coloration},
        difficulty_breathing: ${this.difficulty_breathing},
        facial_swelling: ${this.facial_swelling},
        other: ${this.other || "nil"},
      )
    `
  }

  @action reportStrip() {
  }

  // With translation data loaded from `es.yml`,
  // respond to the given translation queries.
  translate(key) {
    var accessor = {
      "Español": espanol,
      "English": english,
    }[this.language];

    let keyParts = key.split(".")

    for (var i=0; i < keyParts.length; i++){
      if(!accessor[keyParts[i]]) {
        console.log(`Error! Could not find ${keyParts[i]} of ${key}`)
        return "Error! Translation not found."
      }

      accessor = accessor[keyParts[i]];
    };

    return accessor;
  }
}

export default Store
