import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';


import { composeWithDevTools } from 'redux-devtools-extension';

import loggingMiddleware from '../../middleware/loggingMiddleware';
import authMiddleware from '../../middleware/authMiddleware';

import App from '../App';
import reducer from '../../reducers';

const Root = (props) => {
  const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(
      authMiddleware,
      loggingMiddleware
    )
  ));  

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default Root;