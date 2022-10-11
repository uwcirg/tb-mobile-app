import { action, observable, computed } from "mobx";
import APIStore from "./apiStore";

const ROUTES = {
  addPatient: ["/patient", "POST"],
  getCohort: ["/patients", "GET"],
};

export default class CohortStore extends APIStore {
  @observable patients = [];

  constructor(strategy) {
    super(strategy, ROUTES);
  }

  @action setPatients = (patients) => {
    this.patients = patients;
  };

  @computed get patientList() {
    return Object.values(this.patients);
  }

  getPatients = (id) => {
    this.executeRequest("getCohort").then((response) => {
      console.log(response);
    });
  };

  // Creates a hash { patientID: total num issues}
  // @todo if the new dashboard gets adopted it would be good to do this on the serverside
  @computed get issuesPerPatient() {
    let issues = {};
    Object.values(this.filteredPatients).forEach((each) => {
      each.map((value) => {
        if (!value.url) {
          //Exclude photo requests ( not an "issue")
          const key = `${value.patientId}`;
          issues[key] ? (issues[key] += 1) : (issues[key] = 1);
        }
      });
    });
    return issues;
  }

  // Test Stuff for new sorted dashboard - need to move to a different store for better organization
  // Can flip value to 1 or -1 to sort
  @observable sortOptions = {
    issues: 0,
    adherence: 0,
  };

  @computed get sortedPatientList() {
    return Object.values(this.patients).sort((a, b) => {
      return (
        this.sortOptions.issues *
        ((this.issuesPerPatient[`${a.id}`] || 0) -
          (this.issuesPerPatient[`${b.id}`] || 0))
      );
    });
  }

  @action toggleIssueSort = () => {
    this.sortOptions.issues === -1
      ? (this.sortOptions.issues = 1)
      : (this.sortOptions.issues -= 1);
  };
}
