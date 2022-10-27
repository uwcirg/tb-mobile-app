//Stores
import { PasswordStore } from "./passwordStore";
import LoginStore from "./loginStore";
import { PractitionerStore } from "./practitionerStore";
import { PatientStore } from "./patientStore";
import { UIStore } from "./uiStore";
import { MessagingStore } from "./messagingStore";
import PractitionerUIStore from "./practitionerUIStore";
import APIHelper from "../API/Requests";

import { RouterStore, syncHistoryWithStore } from "mobx-react-router";
import { createBrowserHistory } from "history";

import PatientUIStore from "./patientUIStore";
import { ActivationStore } from "./activationStore";
import CohortStore from "./cohortStore";
import DailyReportStore from "./dailyReportStore";
import PatientProfileStore from "./patientProfileStore";

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

//This attaches the class containing the API fetch requests to the stores
//Doing it this way allows you to swap in other data retrival methods for testing
const uiStore = new UIStore(routingStore);
const apiHelper = new APIHelper(uiStore);

export const history = syncHistoryWithStore(browserHistory, routingStore);

export const stores = {
  uiStore: uiStore,
  routingStore: routingStore,
  cohortStore: new CohortStore(apiHelper),
  passwordStore: new PasswordStore(apiHelper),
  patientUIStore: new PatientUIStore(routingStore),
  practitionerUIStore: new PractitionerUIStore(routingStore),
  loginStore: new LoginStore(apiHelper, routingStore),
  practitionerStore: new PractitionerStore(apiHelper),
  patientStore: new PatientStore(apiHelper),
  messagingStore: new MessagingStore(apiHelper),
  activationStore: new ActivationStore(apiHelper),
  dailyReportStore: new DailyReportStore(apiHelper),
  patientProfileStore: new PatientProfileStore(),
};
