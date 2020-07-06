//Stores 
import {AccountStore} from './accountStore'
import LoginStore from './loginStore'
import {PractitionerStore} from './practitionerStore'
import { PatientStore } from "./patientStore"
import {UIStore} from "./uiStore"
import {MessagingStore} from "./messagingStore"
import LabPhotoStore from  "./labPhotoStore"
import PractitionerUIStore from './practitionerUIStore'
import APIHelper from './Requests'

//Testing router option ( would improve usibility on coordinator side)
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import {createBrowserHistory} from 'history';

import PatientUIStore from './patientUIStore';
import { ActivationStore } from './activationStore'

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

//This attaches the class containing the API fetch requests to the stores
//Doing it this way allows you to swap in other data retrival methods for testing
const apiHelper = new APIHelper();

export const history = syncHistoryWithStore(browserHistory, routingStore);

export const stores = {
    routingStore: routingStore,
    patientUIStore: new PatientUIStore(routingStore),
    practitionerUIStore: new PractitionerUIStore(routingStore),
    loginStore: new LoginStore(apiHelper),
    uiStore: new UIStore(routingStore),
    labPhotoStore: new LabPhotoStore(apiHelper),
    accountStore: new AccountStore(apiHelper),
    practitionerStore: new PractitionerStore(apiHelper),
    patientStore: new PatientStore(apiHelper),
    messagingStore: new MessagingStore(apiHelper),
    activationStore: new ActivationStore(apiHelper)
}

