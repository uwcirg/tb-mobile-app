// Code snippets - possible future use.

// Dynamic import
  // if(props.hash)
  //   this.currentPage = import(props.hash)

// Transform dates
    // moment(event.timestamp).transform("YYYY-MM-DD 00:00:00.000")

// import IPFS from "ipfs"
// const ipfs = new IPFS({ EXPERIMENTAL: { pubsub: true } })
// ipfs.once("ready", () =>
//   ipfs.id((err, info) => { if(err) throw err; console.log(`Ready! ${info.id}`) })
// )

import React from "react"
import styled from "styled-components"

import { observable, computed,  autorun } from "mobx"
import { observer, Observer } from "mobx-react"

import { white, beige, lightgrey, darkgrey } from "./colors"

// Crypto & authentication
// import KJUR from "jsrsasign"

// Utility
import "moment-transform"
import auth from "./oauth2"
import moment from "moment"
// import { Client } from "minio"

import Network from "./Network"

// Layouts
import Faqs from "./components/Faqs"
import Flash from "./components/Flash"
import Home from "./components/Home"
import InfoEd from "./components/InfoEd"
import Menu from "./components/Menu"
import Navigation from "./components/Navigation"
import Notes from "./components/Notes"
import SymptomOverview from "./components/SymptomOverview"
import Login from "./components/Login"

// Language
import espanol from "./languages/es"
import english from "./languages/en"

// Optional data for coordinator assembly
import Coordinator from "./sessions/Coordinator"

let network = new Network(process.env.REACT_APP_URL_API)
window.network = network

// For when you'll need a few.
class Records {
  constructor(klass_name, instance_name) {
    this.klass_name = klass_name
    this.instance_name = instance_name

    // TODO change this to the account lookup
    this.reference = "User.first"
  }

  async fetch() {
    return network.run("cirg")`${this.reference}`
      .then(r => this.records = r.json())
      .catch(e => console.log(e))
  }

  // Always a chance that this cache can become out of date.
  @observable records = []

  assoc(association_name) {
    this.reference = `${this.reference}.${association_name}`
    return this
  }

  // These functions execute commands on the network

  create(attrs) {
    return network.run("cirg")`
      ${this.reference}.
        ${this.instance_name}.
        create!(JSON.parse('${JSON.stringify(attrs)}'))
    `
  }

  // Keep our records synced with the database.
  // Can be optimized with pub/sub event subscriptions
  //
  // TODO remove "cirg" argument; see comments in `src/Network.js`
  watch() {
    network.watch("cirg")`
      ${this.reference}.${this.instance_name}
    `(response => {
      response
        .json()
        .then(r => this.records = r)
        .catch(e => console.log(e))
    })
  }
}

@observer
class Assembly extends React.Component {
  @observable currentPage = Home
  @observable coordinator = null

  // TODO change from `User` to `Account`
  // Records("User", "user").first
  @observable registration_information = {
    name: null,
    phone_number: null,
    treatment_start_date: null,
    password: null,
  }

  @observable login_credentials = {
    phone: "",
    password: "",
  }

  @observable authorization = null

  @observable noteDraft = null
  @observable noteTitle = null

  // Recorded Data
  @observable medication_reports = new Records("MedicationReport", "medication_reports")
  @observable symptom_reports    = new Records("SymptomReport"   , "symptom_reports")
  @observable strip_reports      = new Records("StripReport"     , "strip_reports")
  @observable notes              = new Records("Note"           , "notes")

  // Current medication report
  @observable survey_date = moment().format("YYYY-MM-DD")
  @observable survey_medication_time = moment().format("HH:mm")

  // Current symptom report
  @observable symptoms = {
    nausea: false,
    redness: false,
    hives: false,
    fever: false,
    appetite_loss: false,
    blurred_vision: false,
    sore_belly: false,
    yellow_coloration: false,
    difficulty_breathing: false,
    facial_swelling: false,
    other: null,
  }

  @observable nausea_rating = 0

  // Current strip report
  @observable uploadedImages = []

  @observable language = "Español"

  @observable survey_anySymptoms = null
  @observable survey_tookMedication = null

  @observable alerts = []
  @observable provider = null

  @observable test_strip_timer_end = null
  @observable test_strip_timer_start = null
  test_strip_timer = null

  constructor(props) {
    super(props)

    this.medication_reports.watch()
    this.symptom_reports   .watch()
    this.strip_reports     .watch()
    this.notes             .watch()

    if(!this.authorization) { this.currentPage = Login }

    this.coordinator = new Coordinator()

    this.test_strip_timer = setInterval(
      () => this.test_strip_timer_end = moment(),
      1000,
    )

    // Inverse routing
    autorun(() => {
      if(this.currentPath !== window.location.pathname)
        window.history.pushState(null, null, this.currentPath)
    })

    // Behavior
    autorun(() => {
      if (this.symptoms.difficulty_breathing || this.symptoms.facial_swelling)
        this.alert(this.translate("symptom_overview.take_action_immediately"))
    })
  }

  // TODO: Change find(1) to find(${photo_id})
  setPhotoStatus(status) {
    this.network.run()`
      StripReport.find(1).update(status: "${status}")
    `
  }

  // Alerts
  alert(message) { this.alerts.push(message) }

  dismissAlert(message) {
    var index = this.alerts.indexOf(message);
    if (index > -1) this.alerts.splice(index, 1);
  }

  @computed get currentPath() { return this.currentPage.route }

  @computed get currentPageTitle() {
    switch(this.currentPage) {
      case Notes:           return this.translate("titles.notes")
      case Faqs:            return this.translate("titles.faqs")
      case SymptomOverview: return this.translate("titles.symptomOverview")
      case InfoEd:          return this.translate("titles.infoEd")
      case Home:            return this.translate("titles.home")
      default:              return this.translate("titles.default")
    }
  }

  @computed get authorized() {
    // return network.authorization
    return true
  }

   showPage(page) {
    this.currentPage = page
  }

  register() {
    debugger
  }

  login() {
    debugger
  }

  // TODO change out `author_id`
  saveNote() {
    this.notes.create({
      author_id: "abc123",
      author_type: "User",
      title: this.noteTitle,
      text: this.noteDraft,
    })
  }

  composeNote() {
    this.noteTitle = ""
    this.noteDraft = ""
  }

  storePhoto(photo) {
    // const minioClient = new Client({
    //   endPoint: "localhost",
    //   port: 9001,
    //   useSSL: false,
    //   accessKey: 'minio',
    //   secretKey: 'minio123'
    // });

    // let upload_name = "photo_upload_v1_" + moment().unix()

    // let reader = new FileReader()

    // reader.onload = (evt) => {
    //   let blob = evt.target.result

    //   minioClient.putObject(
    //     'foo',
    //     upload_name,
    //     blob,
    //     { 'Content-Type': photo.type },
    //     (err, etag) => {
    //       if (err) return console.log(err)
    //       console.log('File uploaded successfully.')
    //       this.uploadedImages.push(`data:${photo.type};base64,` + btoa(blob))
    //     }
    //   )
    // }

    // reader.readAsBinaryString(photo);

    this.strip_reports.create({
      timestamp: this.survey_datetime,
      // photo_url: upload_name,
    })
  }

  @computed get survey_datetime() {
    let survey_datetime = new moment(`${this.survey_date}T${this.survey_medication_time}:00.000`);
    return survey_datetime
  }

  reportMedication() {
    this.medication_reports.create({ timestamp: this.survey_datetime })
  }

  reportSymptoms() {
    // TODO Change key from `user` to `author` or `account`
    this.symptom_reports.create(this.symptoms, { user: this.account })
  }

  reportStrip() {
    // TODO Change key from `user` to `author` or `account`
    // TODO invalid data; should include `image_url`, `timer`, etc.
    this.strip_reports.create({ user: this.account })
  }

  translate(semantic) {
    var accessor = {
      "Español": espanol,
      "English": english,
    }[this.language];

    let semantic_words = semantic.split(".")

    // TODO this is a clumsy way to do a nested look up.
    for (var i=0; i < semantic_words.length; i++){
      if(!accessor[semantic_words[i]]) {
        console.log(
          `Error! Could not find translation of "${semantic_words[i]}", of ${semantic}`
        )

        return "Error! Translation not found."
      }

      accessor = accessor[semantic_words[i]];
    };

    return accessor;
  }

  render = () => (
    <Layout className="Assembly">
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

      <Content className="Content">
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

// TODO: Gurantee it pasts tests on more devices
// Testing getting rid of this ->  grid-row-gap: 1rem;
const Layout = styled.div`
  height: 100vh;
  background-size: cover;

  background: ${beige};
  color: ${darkgrey};

  display: grid;
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
  background: ${beige};
`

export default Assembly
