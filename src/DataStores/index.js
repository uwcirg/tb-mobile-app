//Stores 
import {PasswordStore} from './passwordStore'
import LoginStore from './loginStore'
import {PractitionerStore} from './practitionerStore'
import { PatientStore } from "./patientStore"
import {UIStore} from "./uiStore"
import {MessagingStore} from "./messagingStore"
import LabPhotoStore from  "./labPhotoStore"
import PractitionerUIStore from './practitionerUIStore'
import APIHelper from './Requests'
import ReminderStore from './reminderStore'

//Testing router option ( would improve usibility on coordinator side)
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import {createBrowserHistory} from 'history';

import PatientUIStore from './patientUIStore';
import { ActivationStore } from './activationStore'
import AdminStore from './adminStore'
import DashboardStore from './dashboardStore'
import DailyReportStore from './dailyReportStore'

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

//This attaches the class containing the API fetch requests to the stores
//Doing it this way allows you to swap in other data retrival methods for testing
const uiStore = new UIStore(routingStore)
const apiHelper = new APIHelper(uiStore);

export const history = syncHistoryWithStore(browserHistory, routingStore);

export const stores = {
    routingStore: routingStore,
    dashboardStore: new DashboardStore(apiHelper),
    passwordStore: new PasswordStore(apiHelper),
    patientUIStore: new PatientUIStore(routingStore),
    adminStore: new AdminStore(apiHelper),
    practitionerUIStore: new PractitionerUIStore(routingStore),
    loginStore: new LoginStore(apiHelper),
    uiStore: uiStore,
    labPhotoStore: new LabPhotoStore(apiHelper),
    practitionerStore: new PractitionerStore(apiHelper),
    patientStore: new PatientStore(apiHelper),
    messagingStore: new MessagingStore(apiHelper),
    activationStore: new ActivationStore(apiHelper),
    reminderStore: new ReminderStore(apiHelper),
    dailyReportStore: new DailyReportStore(apiHelper)
}


