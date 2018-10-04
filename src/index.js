import React from "react"
import ReactDOM from "react-dom"
import registerServiceWorker from "./registerServiceWorker"

import App from "./App"
import Store from "./Store"
import { startRouter } from "./Router"

let store = new Store(fetch)
window.store = store
store.loadSession()
store.loadNotes()
startRouter(store)

ReactDOM.render(<App store={store} />, document.getElementById('root'));
registerServiceWorker();
