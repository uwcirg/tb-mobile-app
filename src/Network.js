import { runInAction } from "mobx"

class Network {
  watches = []
  active = true

  constructor(url) {
    this.url = url
  }

  run(template, ...expressions) {
    return new Promise(resolve => {
      const code = template.reduce((accumulator, part, i) => {
        return accumulator + expressions[i - 1] + part
      })

      fetch(`${this.url}/evaluate`, {
        method: "POST",
        body: JSON.stringify({ code }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(resolve)
    }).then((result) => {
      if(this.active) {
        this.watches.forEach((watch) => watch())
      }

      return result;
    })
  }

  watch(template, ...expressions) {
    const code = template.reduce((accumulator, part, i) => {
      return accumulator + expressions[i - 1] + part
    })

    return (callback) => {
      let watch = () =>
        fetch(`${this.url}/evaluate`, {
          method: "POST",
          body: JSON.stringify({ code }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(result => {
            if(this.active) { runInAction(() => callback(result)) }
          })

      this.watches.push(watch)
      watch()
    }
  }

  clearWatches() {
    this.watches = []
  }

  destruct() {
    this.clearWatches()
    this.active = false
  }
}

export default Network
