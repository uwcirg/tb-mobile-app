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

reaction(
    () => stores.uiStore.language,
    locale => {
      i18n.changeLanguage(locale);
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
