import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';


import { composeWithDevTools } from 'redux-devtools-extension';

import loggingMiddleware from '../../middleware/loggingMiddleware';
import apiMiddleware from '../../middleware/apiMiddleware';
import { authMiddleware } from '../../redux-implicit-oauth2';

import App from '../App';
import reducer from '../../reducers';
// import auth from '../../reducers/auth';

const Root = (props) => {
  const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(
      authMiddleware,
      loggingMiddleware,
      apiMiddleware,
    )
  )); 

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default Root;