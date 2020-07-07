import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Main from './Main';
import { Provider } from 'mobx-react';
import {reaction} from 'mobx';
import './App.css';

//Internationalization
import i18n from "./Language/i18n";
import { I18nextProvider} from 'react-i18next';
import { MuiPickersUtilsProvider } from '@material-ui/pickers/MuiPickersUtilsProvider';
import DateFnsUtils from '@date-io/luxon';

//Object Containing MobX Stores in ./Datastores file
import  {stores,history} from './DataStores'
import { Router } from 'react-router';
import { Settings } from 'luxon';

//Sync Language + Time Locale Changes 
reaction(
    () => stores.uiStore.locale,
    locale => {
      i18n.changeLanguage(locale);
      Settings.defaultLocale = locale;
    }
  );

ReactDOM.render(
    <Provider {...stores}>
        <I18nextProvider i18n={i18n}>
            <Suspense fallback="Page Loading">
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
            <Router history={history}>
              <Main />
              </Router>
              </MuiPickersUtilsProvider>
            </Suspense>
        </I18nextProvider>
      </Provider>
        , document.getElementById('root'));

serviceWorker.register();
