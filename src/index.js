import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Main from './Main';
import { Provider } from 'mobx-react';
import {reaction} from 'mobx';

//Internationalization
import i18n from "./Language/i18n";
import { I18nextProvider} from 'react-i18next';

//Stores 
import {AccountStore} from './DataStores/accountStore'
import LoginStore from './DataStores/loginStore'
import {PractitionerStore} from './DataStores/practitionerStore'
import { PatientStore } from "./DataStores/patientStore"
import {UIStore} from "./DataStores/uiStore"
import {MessagingStore} from "./DataStores/messagingStore"
import LabPhotoStore from  "./DataStores/labPhotoStore"
import APIHelper from './DataStores/Requests'
//This attaches the class containing the API fetch requests to the stores
//Doing it this way allows you to swap in other data retrival methods for testing
const apiHelper = new APIHelper();

import { MuiPickersUtilsProvider } from '@material-ui/pickers/MuiPickersUtilsProvider';
import DateFnsUtils from '@date-io/luxon';

const stores = {
    loginStore: new LoginStore(apiHelper),
    uiStore: new UIStore(),
    labPhotoStore: new LabPhotoStore(apiHelper),
    accountStore: new AccountStore(apiHelper),
    practitionerStore: new PractitionerStore(apiHelper),
    patientStore: new PatientStore(apiHelper),
    messagingStore: new MessagingStore(apiHelper)
}

reaction(
    () => stores.uiStore.language,
    locale => {
      console.log("change language");
      i18n.changeLanguage(locale);
    }
  );

ReactDOM.render(
    <Provider {...stores}>
        <I18nextProvider i18n={i18n}>
            <Suspense fallback="Page Loading">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Main />
              </MuiPickersUtilsProvider>
            </Suspense>
        </I18nextProvider>
      </Provider>
        , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
