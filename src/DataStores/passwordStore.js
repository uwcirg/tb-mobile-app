import { action, observable} from "mobx";
import APIStore from "./apiStore";

const ROUTES = {
  updatePassword: ["/user/me/password", "PATCH"]
}

export class PasswordStore extends APIStore {

  //Takes in a data fetching strategy, so you can swap out the API one for testing data
  constructor(strategy) {
    super(strategy, ROUTES);
    this.strategy = strategy;

  }

  @observable currentPassword = ""
  @observable newPassword = ""
  @observable newPasswordConfirmation = ""
  @observable errors = []
  @observable message = ""
  @observable loading = false
  @observable success = false

  @action updatePassword = () => {
    this.errors = []
    this.message = ""
    this.loading = true;
    this.success = false;

    return this.executeRequest("updatePassword", this, { allowErrors: true, includeStatus: true }).then(json => {
      this.loading = false;
      if (json.httpStatus >= 400) {
        this.errors = json.fields
        this.message = json.error
        return false
      } else {
        this.success = true;
        this.message = json.message;
        return true
      }

    });
  }

  @action resetPasswordUpdateState = () => {
    this.currentPassword = ""
    this.newPassword = ""
    this.newPasswordConfirmation = ""
    this.errors = []
    this.message = ""
    this.loading = false
    this.success = false
  }

}