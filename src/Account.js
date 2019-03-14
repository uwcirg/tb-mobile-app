import { observable } from "mobx"

class Account {
  @observable network = null
  @observable model = ""
  @observable information = {}

  constructor(network, model, information) {
    this.network = network
    this.model = model
    this.information = information
  }

  // For registration
  persist() {
    this.network.run`
      ${this.model}.create!(
        uuid: SecureRandom.uuid,
        password_digest:  BCrypt::Password.create("${this.information.password}"),
        ${
          Object
          .keys(this.information)
          .diff(["password"])
          .map(key => (
            `${key}: ${JSON.stringify(this.information[key])}`
          )).join(", ")
        }
      ).uuid
    `.then(response => response.json().then(uuid => this.watch(uuid)))
  }

  // Pulls in patient information from DB
  watch(uuid) {
    this.network.watch`
      ${this.model}.find_by(uuid: ${JSON.stringify(uuid)})
    `(response => {
      response.json()
        .then(r => this.information = r)
        .catch(e => console.log(e))
    })
  }

  // Log in
  authenticate(attributes, password) {
    return new Promise((resolve, reject) =>
      this.network.run`
        BCrypt::Password.new(
          ${this.model}.find_by(JSON.parse('${JSON.stringify(attributes)}')).
            password_digest
        ) == ${JSON.stringify(password)} ?
        ${this.model}.find_by(JSON.parse('${JSON.stringify(attributes)}')).uuid :
        {}
    `.then(response => response.json().then(uuid => this.watch(uuid) ))
    )
  }

  // Update sidebar with profile information
  update(uuid) {
    return new Promise((resolve, reject) =>
      this.network.run`
        ${this.model}.find_by(uuid: ${JSON.stringify(uuid)}).
        update(JSON.parse('${JSON.stringify(this.information)}'))
      `.then(response => {
        response
          .json()
          .then(information => resolve(information))
      })
    )
  }

  // Used for notes, medication reports, etc
  create(path, attrs) {
    return this.network.run`
      ${this.model}.find_by(uuid: '${this.information.uuid}').
        ${path}.
        create!(JSON.parse('${JSON.stringify(attrs)}'))
    `
  }

  // Used for notes, medication reports, etc
  forget(path, attrs) {
    return this.network.run`
      ${this.model}.find_by(uuid: '${this.information.uuid}').
        ${path}.
        find_by(JSON.parse('${JSON.stringify(attrs)}')).
        destroy
    `
  }
}

export default Account
