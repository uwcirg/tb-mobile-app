import React from "react"
import styled from "styled-components"

import { observable, computed,  autorun, action } from "mobx"
import { observer, Observer } from "mobx-react"
import { Image } from "reakit"
import { white, beige, lightgrey, darkgrey } from "./colors"
import logo from "./logo.png"
import ErrorBoundary from "./primitives/ErrorBoundary"

// Crypto & authentication
// import KJUR from "jsrsasign"

// Utility
import Account from "./Account"
import { DateTime } from "luxon"

// Pages
import Contact from "./components/Contact"
import CoordinatorHome from "./components/CoordinatorHome"
import CoordinatorLogin from "./components/CoordinatorLogin"
import CoordinatorMenu from "./components/CoordinatorMenu"
import CoordinatorParticipantHistory from "./components/CoordinatorParticipantHistory"
import Faqs from "./components/Faqs"
import Flash from "./components/Flash"
import Home from "./components/Home"
import InfoEd from "./components/InfoEd"
import Login from "./components/Login"
import Menu from "./components/Menu"
import Navigation from "./components/Navigation"
import Notes from "./components/Notes"
import Progress from "./components/Progress"
import Register from "./components/Register"
import Survey from "./components/Survey"
import SymptomOverview from "./components/SymptomOverview"

import InternalLink from "./primitives/InternalLink"
import WithCredentials from "./primitives/WithCredentials"

// Language
import espanol from "./languages/es"
import english from "./languages/en"

import Network from "./Network"
let network = new Network(process.env.REACT_APP_URL_API)

@observer
class Assembly extends React.Component {
  // ------ Participant ------
  @observable participant_account = new Account(network, "Participant", {
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

  // Current medication report
  @observable survey_date = null
  @observable survey_medication_time = null
  @observable survey_tookMedication = null
  @observable survey_notTakingMedicationReason = null

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

  @observable resolution_notes = null

  @observable photos_uploaded = {}
  @observable survey_anySymptoms = null

  @observable capturing = false

  // ------ Coordinator ------

  @observable coordinator_account = new Account(network, "Coordinator", {
    name: "",
    email: "",
    password: "",
  })

  @observable coordinator_login_credentials = {
    email: "",
    password: "",
  }

  // TODO this is not a great concept -
  // it's a sub-account loaded on top of a coordinator account.
  // The possibility of the two accounts interfering with each other is quite high.
  //
  // If this is not set, then render an error.
  @observable participant_history = new Account(network, "Participant", {})

  // ------ Misc ------

  @observable language = "Español"
  @observable alerts = []
  @observable currentPage = null

  constructor(props) {
    super(props)

    // Behavior
    autorun(() => {
      if (this.symptoms.difficulty_breathing || this.symptoms.facial_swelling)
        this.alert(this.translate("symptom_overview.take_action_immediately"))
    })

    this.survey_date = DateTime.local().setLocale(this.locale).toLocaleString()
    this.survey_medication_time = DateTime.local().setLocale(this.locale).toLocaleString(DateTime.TIME_24_SIMPLE)

    // When the page loads,
    // immediately look for stored credentials in `localStorage`.
    let coordinator_uuid = localStorage.getItem("coordinator.uuid")
    let participant_uuid = localStorage.getItem("participant.uuid")

    if(coordinator_uuid)
      this.coordinator_account.watch(coordinator_uuid, () => this.route())
    else if(participant_uuid)
      this.participant_account.watch(participant_uuid, () => this.route())
    else {
      this.currentPage = Login
      localStorage.removeItem("current_page")
    }

    // Determine what to display
    this.route()

    // Save the current page
    autorun(() =>
      window.localStorage.setItem(
        "current_page",
        this.currentPage ? this.currentPage.route : null
      )
    )

    // Attach to the window for debugging
    window.assembly = this
  }

  // Given...
  // * the remembered route
  // * all of the data present in the application
  //
  // ...determine what to display.
  @action route() {
    console.log(`Set the current page for "${localStorage.getItem('current_page')}"`)

    // Note: `Login` does not have a route;
    // it is handled internally by Assemble
    // so should not appear in this list.
    this.currentPage = {
      "/": Home,
      "/contact": Contact,
      "/coordinator": CoordinatorHome,
      "/coordinator_login": CoordinatorLogin,
      "/coordinator_participant_history": CoordinatorParticipantHistory,
      "/info": InfoEd,
      "/info/faqs": Faqs,
      "/info/symptom-overview": SymptomOverview,
      "/notes": Notes,
      "/progress": Progress,
      "/register": Register,
      "/survey": Survey,
    }[localStorage.getItem("current_page")] || Login
  }

  setPhotoStatus(id, status) {
    network.run`
      StripReport.find(${id}).update(status: "${status}")
    `
  }

  // Alerts
  alert(message) { this.alerts.push(message) }

  dismissAlert(message) {
    var index = this.alerts.indexOf(message);
    if (index > -1) this.alerts.splice(index, 1);
  }

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

  @action
  resolve_participant_records(participant, status) {
    network.run`
      Resolution.create!(
        participant_uuid: ${JSON.stringify(participant.uuid)},
        status: ${JSON.stringify(status)},
        timestamp: ${JSON.stringify(DateTime.local().toISO())},

        note: ${
          JSON.stringify(`${status}: ${this.coordinator_note[participant.uuid] || ""}`)
        },

        medication_reports: [ ${
          participant.medication_reports.map(record =>
          `MedicationReport.find(${record.id})`
          ).join(",")
        } ],

        strip_reports: [ ${
          participant.strip_reports.map(record =>
          `StripReport.find(${record.id})`
          ).join(",")
        } ],

        symptom_reports: [ ${
          participant.symptom_reports.map(record =>
          `SymptomReport.find(${record.id})`
          ).join(",")
        } ],

        uuid: SecureRandom.uuid,
        author: Coordinator.find_by(uuid: "${this.coordinator_account.information.uuid}"),
      )
    `
  }

  @observable coordinator_note = {}

  register() {
    this.participant_account.persist()
      .then(() => { this.currentPage = Home })
  }

  login() {
    this.participant_account.authenticate(
      { phone_number: this.login_credentials.phone_number },
      this.login_credentials.password,
    ).then((uuid) => {
      localStorage.setItem("participant.uuid", uuid)
      this.currentPage = Home
    })
  }

  coordinator_register() {
    this.coordinator_account.persist()
      .then(() => { this.currentPage = CoordinatorHome })
  }

  coordinator_login() {
    this.coordinator_account.authenticate(
      { email: this.coordinator_login_credentials.email },
      this.coordinator_login_credentials.password,
    ).then((uuid) => {
      localStorage.setItem("coordinator.uuid", uuid)
      this.currentPage = CoordinatorHome
    })
  }

  // TODO change out `author_id`
  saveNote() {
    this.participant_account.create(
      "notes",
      { title: this.noteTitle, text: this.noteDraft },
    )
  }

  composeNote() {
    this.noteTitle = ""
    this.noteDraft = ""
  }

  reportMedication() {
    if (this.survey_tookMedication != null) {
      this.participant_account.create(
        "medication_reports",
        {
          timestamp: `${this.survey_date}T${this.survey_medication_time}:00.000`,
          took_medication: this.survey_tookMedication,
          not_taking_medication_reason: this.survey_notTakingMedicationReason,
        },
      )
    }
  }

  reportSymptoms() {
    this.participant_account.create(
      "symptom_reports",
      Object.assign(
        { timestamp: `${this.survey_date}T${this.survey_medication_time}:00.000` },
        this.symptoms,
      ),
    )

    // Because we use survey date and time for both medication
    // and side effect reports we need to reset here
    this.survey_date = DateTime.local().setLocale(this.locale).toISODate();
    this.survey_medication_time = DateTime.local().setLocale(this.locale).toLocaleString(DateTime.TIME_24_SIMPLE)
    this.survey_tookMedication = null
    this.survey_notTakingMedicationReason = null

    this.survey_anySymptoms = null;
    this.symptoms = {
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
  }

  storePhoto(photo) {
    this.participant_account.create(
      "strip_reports",
      {
        timestamp: `${this.survey_date}T${this.survey_medication_time}:00.000`,
        photo: photo,
      },
    ).then(r => {  r.json().then(photo => this.photos_uploaded[photo.id] = photo) })
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

  @computed get locale() {
    return { "Español": "es", "English": "en" }[this.language];
  }

  logout() {
    this.participant_account.information = {}
    this.coordinator_account.information = {}

    // Remove stored credentials
    localStorage.removeItem("coordinator.uuid")
    localStorage.removeItem("participant.uuid")

    network.clearWatches()
    this.currentPage = Login
  }

  render = () => (
    <Layout>
      <AuthBar>
        <InternalLink to={Login} assembly={this} >
          <Image src={logo} width="1.5rem" height="1.5rem"/>
          <Title>{this.currentPageTitle}</Title>
        </InternalLink>

        <WithCredentials account={this.participant_account} >
          <Menu assembly={this} />
        </WithCredentials>

        <WithCredentials account={this.coordinator_account} >
          <CoordinatorMenu assembly={this} />
        </WithCredentials>

        <Drawer>
          <Observer>
            {() => this.alerts.map(alert => (
              <Flash
                key={alert}
                message={alert}
                onDismiss={() => this.dismissAlert(alert)}
              />
            ))}
          </Observer>
        </Drawer>
      </AuthBar>

      <Space />

      <Content>
        <Observer>
          {() =>
            this.currentPage
            ? <ErrorBoundary assembly={this}>
                { React.createElement(this.currentPage, { assembly: this }) }
              </ErrorBoundary>
            : null
          }
        </Observer>
      </Content>

      <WithCredentials account={this.participant_account} >
        <Space />

        <NavBar>
          <Navigation assembly={this} />
        </NavBar>
      </WithCredentials>
    </Layout>
  )
}

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
  position: fixed;
  z-index: 10;
  right: 0;
  left: 0;

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
  display: inline-block;
  color: black;
  vertical-align: super;
  padding-left: 0.25em;
`

// A handy space just below the top bar, for showing miscellaneous content.
// Disappears when not in use.
const Drawer = styled.div`
  bottom: 0px;
  height: 0px;

  margin-left: auto;
  margin-right: auto;
  position: absolute;
  width: 90%;
`

const Content = styled.div`
  padding: 0 1rem;
  background: ${beige};
`

export default Assembly
