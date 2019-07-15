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
import { DateTime, Duration } from "luxon"

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
import AddCoordinator from "./components/AddCoordinator"
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

  @observable menu = {}
  @observable coordinator_menu = {}

  @observable participant_registration = {
    name: "",
    phone_number: "",
    treatment_start: DateTime.local().toISODate(),
    password: "",
  }

  @observable participant_login = {
    phone_number: "",
    password: "",
  }

  @observable noteDraft = null
  @observable noteTitle = null

  // Current medication report
  @observable survey = {
    date: null,
    medication_time: null,
    not_taking_medication_reason: null,
    took_medication: null,
  }

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
    other: "",
  }

  @observable resolution_notes = null

  @observable photos_uploaded = {}
  @observable any_symptoms = null

  @observable capturing = false

  // ------ Coordinator ------

  @observable coordinator_account = new Account(network, "Coordinator", {
    name: "",
    email: "",
    password: "",
  })

  @observable coordinator_login = {
    email: "",
    password: "",
  }


  @observable coordinator_timer = null
  @observable coordinator_note = {}

  // - - - Coordinator's view of participant information
  @observable participant_history = new Account(network, "Participant", {})

  @observable new_coordinator = {
    name: "",
    email: "",
    password: "",
  }

  fetch = (tag) => {
    let data = this
    tag
      .split(".")
      .forEach(part => data = data[part])
    return data
  }

  // ------ Misc ------
  @observable language = "Español"
  @observable alerts = []
  @observable currentPage = null

  @observable discussionBoard = [];

  constructor(props) {
    super(props)

    // Behavior
    autorun(() => {
      if (this.symptoms.difficulty_breathing || this.symptoms.facial_swelling)
        this.alert(this.translate("symptom_overview.take_action_immediately"))
    })

    // This solution fixes a redirect error. Prior, it saved a network watch
    // request for the participants history and would go to the history page
    // Now we ditch the network watch when we had to a history page.
    // This has not been thoroughly tested for regression yet.
    autorun(() => {
      if (this.currentPage === CoordinatorParticipantHistory)
        network.clearLast();
    })

    // Every 5 minutes refresh the coordinator home
    autorun(() => {
      if(this.currentPage === CoordinatorHome)
        this.coordinator_timer = setInterval(
          () => network.refresh(),
          5 * 60 * 1000, // 5 minutes, 60 s/min, 1000 ms/s
        )
      else if(this.coordinator_timer) {
        clearInterval(this.coordinator_timer)
        this.coordinator_timer = null
      }
    })

    this.survey.date = DateTime.local().setLocale(this.locale).toLocaleString()
    this.survey.medication_time = DateTime.local().setLocale(this.locale).toLocaleString(DateTime.TIME_24_SIMPLE)

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

    autorun(() => {
      this.menu.name = this.participant_account.information.name
      this.menu.phone_number = this.participant_account.information.phone_number
      this.menu.treatment_start = this.participant_account.information.treatment_start
    })

    autorun(() => {
      this.coordinator_menu.name = this.coordinator_account.information.name
      this.coordinator_menu.email = this.coordinator_account.information.email
    })

    // Attach to the window for debugging
    // window.assembly = this
  }

  // Given...
  // * the remembered route
  // * all of the data present in the application
  //
  // ...determine what to display.
  @action route() {

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
          JSON.stringify(this.fetch(`coordinator_note.${participant.uuid}`) || "")
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


  getMessages(user){
    return network.getMessages(user);
  }

  register_participant() {
    this.participant_account.persist(this.participant_registration)
      .then(() => { this.currentPage = Home })
  }

  login() {
    this.participant_account.authenticate(
      { phone_number: this.participant_login.phone_number },
      this.participant_login.password,
    ).then((uuid) => {
      localStorage.setItem("participant.uuid", uuid)
      this.currentPage = Home
    })
  }

  set(tag, value) {
    let data = this
    let parts = tag.split(".")

    parts.forEach((part, index) => {
      if(index === parts.length - 1)
        data[part] = value
      else
        data = data[part]
    })
  }

  add_coordinator() {
    network.run`
    Coordinator.create!(
      name: ${JSON.stringify(this.new_coordinator.name)},
      email: ${JSON.stringify(this.new_coordinator.email)},
      password_digest:  BCrypt::Password.create(${JSON.stringify(this.new_coordinator.password)}),
      uuid: SecureRandom.uuid,
    )
    `
  }

  login_coordinator() {
    this.coordinator_account.authenticate(
      { email: this.coordinator_login.email },
      this.coordinator_login.password,
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
    this.noteTitle = null
    this.noteDraft = null
  }

  composeNote() {
    this.noteTitle = ""
    this.noteDraft = ""
  }

  reportMedication() {
    if (this.survey.took_medication != null) {
      this.participant_account.create(
        "medication_reports",
        {
          timestamp: `${this.survey.date}T${this.survey.medication_time}:00.000`,
          took_medication: this.survey.took_medication,
          not_taking_medication_reason: this.survey.not_taking_medication_reason,
        },
      )
    }
  }

  reportSymptoms() {
    this.participant_account.create(
      "symptom_reports",
      Object.assign(
        { timestamp: `${this.survey.date}T${this.survey.medication_time}:00.000` },
        this.symptoms,
      ),
    )

    // KYLECHANGE: Not really sure why they were doing this?
    // Because we use survey date and time for both medication
    // and side effect reports we need to reset here
    /*
    this.survey = {
      date: DateTime.local().setLocale(this.locale).toISODate(),
      medication_time: DateTime.local().setLocale(this.locale).toLocaleString(DateTime.TIME_24_SIMPLE),
      not_taking_medication_reason: null,
      took_medication: null,
      any_symptoms: null,
    }
    */

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
      other: "",
    }
  }

  storePhoto(photo) {
    this.participant_account.create(
      "strip_reports",
      {
        timestamp: `${this.survey.date}T${this.survey.medication_time}:00.000`,
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

  @computed  get timeSinceTreatment(){
    let dt = DateTime.fromSQL(this.participant_account.information.treatment_start).toObject();
    console.log(dt);
    let duration = Duration.fromObject(dt);
    console.log(duration)
    return duration.days;
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
          <Title>{this.translate("titles.default")}</Title>
        </InternalLink>

        <WithCredentials account={this.participant_account} >
          <Menu assembly={this} />
        </WithCredentials>

        <WithCredentials account={this.coordinator_account} >
          <AddCoordinator assembly={this} />
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

  display: grid;
  grid-template-columns: 1fr auto auto;
  grid-column-gap: 1rem;
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
