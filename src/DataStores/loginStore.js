import { action, observable, computed } from "mobx";
import APIStore from "./apiStore";

const ROUTES = {
  login: ["/auth", "POST"],
  deleteCookie: ["/auth/cookie", "DELETE"],
};

const PATIENT = "Patient";
const PRACTITIONER = "Practitioner";

export default class LoginStore extends APIStore {
  constructor(strategy, routingStore) {
    super(strategy, ROUTES);
    this.routingStore = routingStore;
    this.userType = localStorage.getItem("user.type");
  }

  //@observable selectedUserType = "";
  @observable userType = "";
  @observable error = 0;
  @observable loading = false;

  @observable identifier = "";
  @observable password = "";

  //Patient Activation
  @observable activationWasRequested = false;
  @observable activationWasSuccessful = false;
  @observable activationLoading = false;

  activationBody = {
    phoneNumber: "",
    activationCode: "",
    username: "",
    password: "",
    passwordConfirmation: "",
  };

  @computed get isPatient() {
    return this.selectedUserType === PATIENT;
  }

  @computed get isLoggedIn() {
    return this.userType !== "";
  }

  @action submit = () => {
    let body = {
      password: this.password,
    };

    if (this.selectedUserType === PATIENT) {
      body.phoneNumber = this.identifier;
    } else {
      body.email = this.identifier;
    }

    return this.executeRequest("login", body).then((response) => {
      if (response.status > 400) {
        this.error = response.status;
        return;
      }

      this.userType = this.handleAuthentication(response);
      this.goHome();
    });
  };

  @action clearError = () => {
    this.error = "";
  };

  persistUserData = (json) => {
    localStorage.setItem("user.type", json.user_type);
  };

  @action handleAuthentication = (json) => {
    if (json && json.user_id) {
      this.persistUserData(json);
      return json.user_type;
    }
    return false;
  };

  @action selectPatient = () => {
    this.routingStore.push("/login/patient");
  };

  @action selectPractitioner = () => {
    this.routingStore.push("/login/practitioner");
  };

  @action goToForgotPassword = () => {
    this.routingStore.push("/login/forgot-password");
  };

  @action goHome = () => {
    this.routingStore.push("/");
  };

  @action logout = () => {
    this.userType = "";
    localStorage.removeItem("user.type");
    localStorage.removeItem("cachedProfile");
  };

  @computed get selectedUserType() {
    switch (this.routingStore.location.pathname) {
      case "/login/patient":
        return PATIENT;
      case "/login/practitioner":
        return PRACTITIONER;
      default:
        return "";
    }
  }

  @computed get onForgotPassword() {
    return this.routingStore.location.pathname === "/login/forgot-password";
  }

  @action setPassword = (password) => {
    this.password = password;
  };

  @action setIdentifier = (identifier) => {
    this.identifier = identifier;
  };

  deleteCookie = () => {
    this.executeRequest("deleteCookie");
  };

  @action submitCombinedLogin = () => {
    const isEmail = this.identifier.includes("@");

    let body = {
      password: this.password,
      [isEmail ? "email" : "phoneNumber"]: this.identifier,
    };

    this.loading = true;
    return this.executeRequest("login", body).then((response) => {
      this.loading = false;
      if (response.status > 400) {
        this.error = response.status;
        return;
      }

      this.userType = this.handleAuthentication(response);
      this.goHome();
    });
  };
}
