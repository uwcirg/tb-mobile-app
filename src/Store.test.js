import Store from "./Store"
import sinon from "sinon"
import fetchMock from "fetch-mock"
import moment from "moment"

describe("Store", () => {
  // Sets a global environment variable;
  // this is not good practice and the variable should be removed from the app.
  beforeEach(() => process.env.REACT_APP_API_PATH = "http://tb-api.example.com")
  afterEach(() => fetchMock.reset())

  describe("#saveNote()", () => {
  })
})
