import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import App from './App';
import Store from './Store';
import { startRouter } from "./Router"

let store = new Store(fetch)
window.store = store
startRouter(store)

ReactDOM.render(<App store={store} />, document.getElementById('root'));
registerServiceWorker();
