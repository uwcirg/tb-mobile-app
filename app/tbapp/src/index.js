import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import registerServiceWorker from './registerServiceWorker';
import { ActivityIndicator, ListView, Text, View } from 'react';

// import 'bootstrap/dist/css/bootstrap.css';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  )
}

render(Root)

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    render(Root)
  })
}

registerServiceWorker();
