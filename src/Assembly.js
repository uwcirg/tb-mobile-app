import React from "react"
import styled from "styled-components"

import { observable, computed, action, autorun } from "mobx"
import { observer, Observer } from "mobx-react"

import { white, beige, lightgrey, darkgrey } from "./colors"

// Utility
import "moment-transform"
import Network from "./Network"
import auth from "./oauth2"
import moment from "moment"
import { Client } from "minio"

// Layouts
import Faqs from "./components/Faqs"
import Flash from "./components/Flash"
import Home from "./components/Home"
import InfoEd from "./components/InfoEd"
import Menu from "./components/Menu"
import Navigation from "./components/Navigation"
import Notes from "./components/Notes"
import SymptomOverview from "./components/SymptomOverview"

// Language
import espanol from "./languages/es"
import english from "./languages/en"

// Optional data for coordinator assembly
import Coordinator from "./sessions/Coordinator"

@observer
class Assembly extends React.Component {
  network = new Network(``)
  @observable currentPage = Home
  @observable coordinator = null

  // Notes
  @observable notes = []
  @observable noteDraft = null
  @observable noteTitle = null

  // History of reports
  @observable medication_reports = []
  @observable symptom_reports = []
  @observable strip_reports = []
  
  @observable current_strip_report = null

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

  constructor(props) {
    super(props)

    this.coordinator = new Coordinator()

    // if(props.hash)
    //   this.currentPage = import(props.hash)

    // Inverse routing
    autorun(() => {
      const path = this.currentPath

      if(path !== window.location.pathname)
        window.history.pushState(null, null, path)
    })

    // Database calls
    // proxied through Rails models at the moment.
    this.network.watch("cirg")`
      user.medication_reports.map { |r| { date: r.timestamp } }
    `(response => {
      response
        .json()
        .then(action(events => {
          this.medication_reports = events.map(event =>
            Object.assign(event, { date: moment(event.date).transform("YYYY-MM-DD 00:00:00.000") })
          )
        }))
        .catch(() => {})
    })

    this.network.watch("cirg")`
      user.symptom_reports.map { |r| { date: r.timestamp } }
    `(response => {
      response
        .json()
        .then(action(events => {
          this.symptom_reports = events.map(event =>
            Object.assign(event, { date: moment(event.date).transform("YYYY-MM-DD 00:00:00.000") })
          )
        }))
        .catch(() => {})
    })

    this.network.watch("cirg")`
      user.strip_reports 
    `(response => {
      response
        .json()
        .then(action(events => {
          this.strip_reports = events.map(event =>
            Object.assign(event, { date: moment(event.timestamp).transform("YYYY-MM-DD 00:00:00.000") })
          )
        }))
        .catch(() => {})
    })

    this.network.watch("cirg")`
      user.notes
    `(response => {
      response
        .json()
        .then(action(notes => {
          this.notes = notes
        }))
        .catch(() => {})
    })

    // Behavior
    autorun(() => {
      if (this.difficulty_breathing || this.facial_swelling)
        this.alert(this.translate("symptom_overview.take_action_immediately"))
    })
  }

  @action alert(message) {
    this.alerts.push(message)
  }

  // TODO: Change find(1) to find(${photo_id})
  @action setPhotoStatus(status) {
    this.network.run()`
      StripReport.find(1).update(status: "${status}")
    `
  }

  @action dismissAlert(message) {
    var index = this.alerts.indexOf(message);
    if (index > -1) this.alerts.splice(index, 1);
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
    this.currentPage = page
  }

  @action login(username, password, callback) {
    auth.start_flow({
      url: process.env.REACT_APP_API_PATH + "/oauth2/authorize",
      client: process.env.REACT_APP_CLIENT_ID,
      redirect: process.env.REACT_APP_REDIRECT_PATH,
      scope: "email",
    })

  }

  @action saveNote() {
    this.network.run("cirg")`
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

    this.network.run("cirg")`
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
    this.network.run("cirg")`
      user.medication_reports.create!(
        timestamp: ${JSON.stringify(this.survey_datetime)}
      )
    `
  }

  @action reportSymptoms() {
    this.network.run("cirg")`
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
        console.log(`Error! Could not find translation of "${keyParts[i]}", of ${key}`)
        return "Error! Translation not found."
      }

      accessor = accessor[keyParts[i]];
    };

    return accessor;
  }

  render = () => (
    <Layout>
      <AuthBar>
        <Title>{this.currentPageTitle}</Title>

        { this.authorized
          ? <Menu store={this} />
          : null
        }

        <Drawer>
          {this.alerts.map(alert => (
            <Flash
              key={alert}
              message={alert}
              onDismiss={() => this.dismissAlert(alert)}
            />
          ))}
        </Drawer>
      </AuthBar>

      <Content>
        <Observer>
          {() => React.createElement(this.currentPage, { store: this })}
        </Observer>
      </Content>

      <Space />

      { this.authorized
        ? <NavBar>
            <Navigation store={this} />
          </NavBar>
        : null
      }
    </Layout>
  )
}

const Layout = styled.div`
  height: 100vh;
  background-size: cover;

  background: ${beige};
  color: ${darkgrey};

  display: grid;
  grid-row-gap: 1rem;
  grid-template-rows: 4rem auto 4rem;
`

const NavBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid ${lightgrey}; 
`

const AuthBar = styled.div`
  background-color: ${white};
  padding: 1rem;
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: baseline;

  border-radius: 2px;
  border-bottom: 2px solid rgba(100, 100, 100, 0.2);
`

// We need something to reserve the space of the bottom navigation bar.
const Space = styled.div`
`

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 0;
`

// A handy space just below the top bar,
// for showing miscellaneous content.
// Disappears when not in use.
const Drawer = styled.div`
  bottom: 0px;
  height: 0px;

  margin-left: auto;
  margin-right: auto;
  position: absolute;
  width: 90%;
  z-index: 10;
`

const Content = styled.div`
  padding: 0 1rem;
`

export default Assembly
