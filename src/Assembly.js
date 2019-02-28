// Code snippets - possible future use.

// Dynamic import
  // if(props.hash)
  //   this.currentPage = import(props.hash)

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
import Network from "./Network"
import { DateTime } from "luxon"

// Layouts
import Faqs from "./components/Faqs"
import Flash from "./components/Flash"
import Home from "./components/Home"
import InfoEd from "./components/InfoEd"
import Login from "./components/Login"
import Menu from "./components/Menu"
import Navigation from "./components/Navigation"
import Notes from "./components/Notes"
import SymptomOverview from "./components/SymptomOverview"

// Language
import espanol from "./languages/es"
import english from "./languages/en"

let network = new Network(process.env.REACT_APP_URL_API)
window.network = network

// For when you'll need a few.
class Records {
  constructor(klass_name, instance_name) {
    this.klass_name = klass_name
    this.instance_name = instance_name
  }

  // Always a chance that this cache can become out of date.
  @observable records = []

  // These functions execute commands on the network
  create(attrs, uuid) {
    return network.run("cirg")`
      Participant.find_by(uuid: '${uuid}').
        ${this.instance_name}.
        create!(JSON.parse('${JSON.stringify(attrs)}'))
    `
  }

  // Keep our records synced with the database.
  // Can be optimized with pub/sub event subscriptions
  //
  // TODO remove "cirg" argument; see comments in `src/Network.js`
  watch(uuid) {
    network.watch("cirg")`
      Participant.find_by(uuid: '${uuid}').${this.instance_name}
    `(response => {
      response
        .json()
        .then(r => this.records = r)
        .catch(e => console.log(e))
    })
  }
}

class Account {
  @observable information = {}

  constructor(information) {
    this.information = information
    console.log(this.information)
  }

  persist() {
    return new Promise((resolve, reject) =>
      network.run("cirg")`
        Participant.create!(
          uuid: SecureRandom.uuid,
          treatment_start: ${JSON.stringify(this.information.treatment_start)},
          phone_number: ${JSON.stringify(this.information.phone_number)},
          name: ${JSON.stringify(this.information.name)},
          password_digest:  BCrypt::Password.create("${this.information.password}"),
        )
      `.then(response => {
          response
            .json()
            .then(information => { this.information = information; resolve(information) })
        })
    )
  }

  request(attributes, password) {
    return new Promise((resolve, reject) =>
      network.run("cirg")`
        BCrypt::Password.new(
          Participant.find_by(JSON.parse('${JSON.stringify(attributes)}')).
            password_digest
        ) == ${JSON.stringify(password)} ?
        Participant.find_by(JSON.parse('${JSON.stringify(attributes)}')) :
        {}
      `.then(response => {
        response
          .json()
          .then(information => { this.information = information; resolve(information) })
      })
    )
  }

  update(uuid) {
    return new Promise((resolve, reject) =>
      network.run("cirg")`
        Participant.find_by(uuid: ${JSON.stringify(uuid)}).
        update(JSON.parse('${JSON.stringify(this.information)}'))
      `.then(response => {
        response
          .json()
          .then(information => resolve(information))
      })
    )
  }
}

@observer
class Assembly extends React.Component {
  @observable currentPage = Home
  @observable coordinator = {
    patients: [
      {
        med_report_status: 'notreported',
        id: "pete",
        took_medication: 'Yes',
        firstname: "Peter",
        lastname: "Campbell",
        phone: 15304120086,
        treatment_start: null,
        last_repored_date: null,
        side_effects: ["Nausea", "Redness"],
        percent_since_start: 48,
        photo: [],
        patient_note: [],
        coordinator_note: [],
      },
    ]
  }

  @observable uuid = null
  @observable registration = new Account({
    name: "",
    phone_number: "",
    treatment_start: DateTime.local().toISODate(),
    password: "",
  })

  @observable login_credentials = {
    phone_number: "",
    password: "",
  }

  @observable noteDraft = null
  @observable noteTitle = null

  // Recorded Data
  @observable medication_reports = new Records("MedicationReport", "medication_reports")
  @observable symptom_reports    = new Records("SymptomReport",    "symptom_reports")
  @observable strip_reports      = new Records("StripReport",      "strip_reports")
  @observable notes              = new Records("Note",             "notes")

  // Current medication report
  @observable survey_date = DateTime.local().toISODate()
  @observable survey_medication_time = DateTime.local().toLocaleString(DateTime.TIME_24_SIMPLE)

  // Current symptom report
  @observable symptoms = {
    nausea: false,
    nausea_rating: 0,
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

  // Current strip report
  @observable photos_uploaded = []

  @observable language = "Español"

  @observable survey_anySymptoms = null
  @observable survey_tookMedication = null

  @observable alerts = []
  @observable provider = null

  @observable capturing = false

  constructor(props) {
    super(props)

    if(!this.authorized) { this.currentPage = Login }

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

    // Debugging
    autorun(() => {
      if(this.uuid) {
        this.medication_reports.watch(this.uuid)
        this.symptom_reports.watch(this.uuid)
        this.strip_reports.watch(this.uuid)
        this.notes.watch(this.uuid)
      }
    })

    window.assembly = this
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
    return this.uuid
  }

   showPage(page) {
    this.currentPage = page
  }

  register() {
    this.registration.persist()
      .then(information => {
        this.uuid = information.uuid
        if(this.authorized) this.showPage(Home)
      })
  }

  login() {
    this.registration.request(
      { phone_number: this.login_credentials.phone_number },
      this.login_credentials.password,
    )
      .then(information => {
        this.uuid = information.uuid
        if(this.authorized) this.showPage(Home)
      })
      .catch(e => this.alert(e))
  }

  // TODO change out `author_id`
  saveNote() {
    this.notes.create({
      author_id: "abc123",
      author_type: "Participant",
      title: this.noteTitle,
      text: this.noteDraft,
    }, this.uuid)
  }

  composeNote() {
    this.noteTitle = ""
    this.noteDraft = ""
  }

  reportMedication() {
    this.medication_reports.create({ timestamp: `${this.survey_date}T${this.survey_medication_time}:00.000` }, this.uuid)
  }

  reportSymptoms() {
    this.symptom_reports.create(this.symptoms, this.uuid)
  }

  storePhoto(photo) {
    this.strip_reports.create({
      timestamp: DateTime.local().toISO(),
      photo: photo,
    }, this.uuid).then(r => { if(r.ok) { this.photos_uploaded.push(photo) } })
  }

  translate(semantic) {
    let semantic_words = semantic.split(".")
    let dictionary = { "Español": espanol, "English": english }[this.language];

    // TODO this is a clumsy way to do a nested look up.
    for (var i=0; i < semantic_words.length; i++) {
      if(!dictionary[semantic_words[i]]) {
        console.log(`Error! Could not find translation of "${semantic_words[i]}", of ${semantic}`)
        return "Error! Translation not found."
      }

      dictionary = dictionary[semantic_words[i]];
    }

    return dictionary;
  }

  logout() {
    this.uuid = null
  }

  render = () => (
    <Layout>
      <AuthBar>
        <Title>{this.currentPageTitle}</Title>

        <Menu store={this} />

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

      <NavBar>
        <Navigation store={this} />
      </NavBar>
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
