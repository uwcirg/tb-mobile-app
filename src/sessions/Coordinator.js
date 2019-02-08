import { observable, action } from "mobx";
import Network from "../Network"

const patients = [
  {
    medication_report_dates: 'notreported',
    id: "pete",
    firstname: "Peter",
    lastname: "Campbell",
    phone: 15304120086,
    treatment_start_date: null,
    last_repored_date: null,
    side_effects: ["Nausea"],
    percent_since_start: 48,
    photo: [],
    patient_note: [],
    coordinator_note: [],
  },

  {
    // test dates and notes for both patient and coordinator
    medication_report_dates: 'confirmed',
    id: "lucky",
    firstname: "Lucky",
    lastname: "Campbell",
    phone: 15304120086,
    treatment_start_date: null,
    last_repored_date: null,
    side_effects: ["Nausea"],
    percent_since_start: 40,
    photo: [],
    patient_note: ["jsdjdjdjdjjdjdjdjdjdjdjdjdj"],
    coordinator_note: [],
  },

  {
    medication_report_dates: 'reported',
    id: "boyd",
    firstname: "Boyd",
    lastname: "Franklin",
    phone: 15304120086,
    treatment_start_date: null,
    last_repored_date: null,
    side_effects: ["Nausea"],
    percent_since_start: 10,
    photo: [],
    patient_note: [],
    coordinator_note: [],
  },

  {
    medication_report_dates: 'reported',
    id: "abc123",
    firstname: "Heriberto",
    lastname: "Schmitt",
    phone: 15304120086,
    treatment_start_date: null,
    last_repored_date: null,
    side_effects: ["Nausea", "Redness", "Appetite loss"],
    percent_since_start: 85,
    photo: [],
    patient_note: [],
    coordinator_note: [],
  },
]

class Coordinator {
  network = new Network(``)

  @observable patients = patients

  // here is where we would connect to our DB and get REAL patient information
  constructor() {
    // this.network.watch("cirg")`
    //   coordinator.patients
    // `(response => {
    //   response
    //     .json()
    //     .then(action(patients => {
    //       this.patients = patients
    //     }))
    // })
  }
}

export default Coordinator
