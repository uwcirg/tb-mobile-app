import React from "react"
import ReactDOM from "react-dom"
import registerServiceWorker from "./registerServiceWorker"

import App from "./App"
import { startRouter } from "./Router"

import Patient from "./sessions/Patient"
import Provider from "./sessions/Provider"

let patient = new Patient(fetch)
let provider = new Provider(fetch)

startRouter(patient)
patient.loadSession()

ReactDOM.render(
  <App store={patient} />,
  document.getElementById('root')
);

registerServiceWorker();
