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
  persist(information) {
    return this.network.run`
      ${this.model}.create!(
        uuid: SecureRandom.uuid,
        password_digest:  BCrypt::Password.create("${information.password}"),
        ${
          diff(Object.keys(information), ["password"])
          .map(key => (
            `${key}: ${JSON.stringify(information[key])}`
          )).join(", ")
        }
      ).uuid
    `.then(response =>
      response
      .json()
      .then(uuid => this.watch(uuid))
    )
  }

  // Pulls in patient information from DB
  watch(uuid, callback) {
    this.network.watch`
      ${this.model}.find_by(uuid: ${JSON.stringify(uuid)})
    `(response => {
      response
        .json()
        .then(r => this.information = r)
        .then(() => { if(callback) callback() })
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
      `.then(response =>
        response
        .json()
        .then(uuid => {
          // uuid exists here
          this.watch(uuid)
          resolve(uuid)
        })
      )
    )
  }

  // Update account with new information
  update(information) {
    return new Promise((resolve, reject) =>
      this.network.run`
        ${this.model}.find_by(uuid: ${JSON.stringify(this.information.uuid)}).
        update(JSON.parse('${JSON.stringify(information)}'))
      `.then(response => {
        response
          .json()
          .then(info => resolve(info))
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

const diff = (first, second) =>
  first.filter(element => second.indexOf(element) < 0)

export default Account
