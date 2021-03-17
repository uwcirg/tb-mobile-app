import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';
import { Provider } from 'mobx-react';

//Internationalization
import i18n from "./Language/i18n";
import { I18nextProvider } from 'react-i18next';

//Stores 
import { PatientStore } from "./DataStores/patientStore";
import { UIStore } from "./DataStores/uiStore"

import { stores, history } from './DataStores'

import APIHelper from './DataStores/Requests'
//This attaches the class containing the API fetch requests to the stores
//Doing it this way allows you to swap in other data retrival methods for testing

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <TestWrapper stores={stores} history={history}>
      <Main />
    </TestWrapper>, div);
  ReactDOM.unmountComponentAtNode(div);
});


