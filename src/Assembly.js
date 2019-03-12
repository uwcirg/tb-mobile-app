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

import { observable, computed,  autorun, reaction } from "mobx"
import { observer, Observer } from "mobx-react"
import { Image } from "reakit"
import { white, beige, lightgrey, darkgrey } from "./colors"
import logo from "./logo.png"

// Crypto & authentication
// import KJUR from "jsrsasign"

// Utility
import Account from "./Account"
import { DateTime } from "luxon"

// Layouts
import Faqs from "./components/Faqs"
import Flash from "./components/Flash"
import Home from "./components/Home"
import CoordinatorHome from "./components/CoordinatorHome"
import InfoEd from "./components/InfoEd"
import Login from "./components/Login"
import Menu from "./components/Menu"
import Navigation from "./components/Navigation"
import Notes from "./components/Notes"
import SymptomOverview from "./components/SymptomOverview"

import InternalLink from "./primitives/InternalLink"
import WhenAuthenticated from "./primitives/WhenAuthenticated"

// Language
import espanol from "./languages/es"
import english from "./languages/en"

import Network from "./Network"
let network = new Network(process.env.REACT_APP_URL_API)

@observer
class Assembly extends React.Component {
  // ------ Participant ------

  @observable registration = new Account(network, "Participant", {
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

  @observable photos_uploaded = []
  @observable survey_anySymptoms = null

  @observable capturing = false

  // ------ Coordinator ------

  @observable coordinator_registration = new Account(network, "Coordinator", {
    name: "",
    email: "",
    password: "",
  })

  @observable coordinator_login_credentials = {
    email: "",
    password: "",
  }

  // ------ Misc ------

  @observable language = "Español"
  @observable alerts = []
  @observable currentPage = Login

  constructor(props) {
    super(props)

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

    // When the UUID changes, set the currentPage to Home
    reaction(
      () => this.registration.information.uuid,
      (uuid) => this.currentPage = Home,
    )

    reaction(
      () => this.coordinator_registration.information.uuid,
      (uuid) => this.currentPage = CoordinatorHome,
    )

    this.survey_date = DateTime.local().setLocale(this.locale).toISODate()
    this.survey_medication_time = DateTime.local().setLocale(this.locale).toLocaleString(DateTime.TIME_24_SIMPLE)

    window.assembly = this
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

  register() {
    this.registration.persist()
  }

  login() {
    this.registration.authenticate(
      { phone_number: this.login_credentials.phone_number },
      this.login_credentials.password,
    )
  }

  coordinator_register() {
    this.coordinator_registration.persist()
  }

  coordinator_login() {
    this.coordinator_registration.authenticate(
      { email: this.coordinator_login_credentials.email },
      this.coordinator_login_credentials.password,
    )
  }

  // TODO change out `author_id`
  saveNote() {
    this.registration.create(
      "notes",
      { title: this.noteTitle, text: this.noteDraft },
      this.registration.information.uuid
    )
  }

  composeNote() {
    this.noteTitle = ""
    this.noteDraft = ""
  }

  reportMedication() {
    if (this.survey_tookMedication != null) {
      this.registration.create(
        "medication_reports",
        {
          timestamp: `${this.survey_date}T${this.survey_medication_time}:00.000`,
          took_medication: this.survey_tookMedication,
          not_taking_medication_reason: this.survey_notTakingMedicationReason,
        },
        this.registration.information.uuid,
      )
    }

    this.survey_date = DateTime.local().setLocale(this.locale).toISODate();
    this.survey_medication_time = DateTime.local().setLocale(this.locale).toLocaleString(DateTime.TIME_24_SIMPLE)
    this.survey_tookMedication = null
    this.survey_notTakingMedicationReason = null
  }

  reportSymptoms() {
    this.registration.create("symptom_reports", this.symptoms,
                            this.registration.information.uuid)

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
    this.registration.create(
      "strip_reports",
      { timestamp: DateTime.local().toISO(), photo: photo },
      this.registration.information.uuid
    ).then(r => { if(r.ok) { this.photos_uploaded.push(photo) } })
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
    this.registration.information = {}
    this.coordinator_registration.information = {}
    this.currentPage = Login
    network.clearWatches()
  }

  render = () => (
    <Layout>
      <AuthBar>
        <InternalLink to={Login} assembly={this} >
          <Image src={logo} width="1.5rem" height="1.5rem"/>
          <Title>{this.currentPageTitle}</Title>
        </InternalLink>

        <WhenAuthenticated account={this} >
          <Menu assembly={this} />
        </WhenAuthenticated>

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
          {() => React.createElement(this.currentPage, { assembly: this })}
        </Observer>
      </Content>

      <Space />

      <WhenAuthenticated account={this} >
        <NavBar>
          <Navigation assembly={this} />
        </NavBar>
      </WhenAuthenticated>
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

// Subtract one array from another
Array.prototype.diff = function(otherArray) {
  return this.filter(function(element) {return otherArray.indexOf(element) < 0;});
};

export default Assembly
