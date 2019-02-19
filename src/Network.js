import { runInAction } from "mobx"

class Network {
  constructor(authorization) {
    this.url = ""
    this.authorization = authorization
    this.watches = {}
    this.active = true
  }

  // TODO remove "system" argument;
  // this isn't necessarily the place for it.
  run(system) {
    return (template, ...expressions) => new Promise(resolve => {
      const code = template.reduce((accumulator, part, i) => {
        return accumulator + expressions[i - 1] + part
      })

      fetch(`${this.url}/evaluate`, {
        method: "POST",
        body: JSON.stringify({ system, code }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(resolve)
    }).then((result) => {
      let watches = this.watches[system]
      if(this.active && watches !== undefined) {
        watches.forEach((watch) => watch())
      }

      return result;
    })
  }

  // TODO remove "system" argument;
  // this isn't necessarily the place for it.
  watch(system) {
    if(this.watches[system] === undefined) {
      this.watches[system] = []
    }

    let templating = (template, ...expressions) => {
      const code = template.reduce((accumulator, part, i) => {
        return accumulator + expressions[i - 1] + part
      })

      return (callback) => {
        let watch = () =>
          fetch(`${this.url}/evaluate`, {
            method: "POST",
            body: JSON.stringify({ system, code }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(result => {
              if(this.active) { runInAction(() => callback(result)) }
            })

        this.watches[system].push(watch)
        watch()
      }
    }

    return templating
  }

  destruct() {
    this.watches = {}
    this.active = false
  }
}

export default Network
