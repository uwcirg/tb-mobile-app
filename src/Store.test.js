import Store from "./Store"
import sinon from "sinon"
import fetchMock from "fetch-mock"
import moment from "moment"

describe("Store", () => {
  beforeEach(() => process.env.REACT_APP_API_PATH = "http://tb-api.example.com")
  afterEach(() => fetchMock.reset())

  describe("#saveNote()", () => {
    it("Saves the note draft", function () {
      let clock = sinon.useFakeTimers()
      let now = moment().format("YYYY-MM-DD HH:mm:ss")
      fetchMock.post(`path:/api/v1.0/notes`, 4)

      let store = new Store()
      store.loadNotes = sinon.fake()
      store.patient_id = 88
      store.noteTitle = "Hello"
      store.noteDraft = "World!"

      store.saveNote().then(() => {
        expect(store.loadNotes.calledOnce).toBeTruthy()
        expect(store.noteDraft).toBe(null)
      })

      let serverReceivedRequest = fetchMock.called((url, { method, headers, body }) => {
        let params = JSON.parse(body)

        return (
          url === `${process.env.REACT_APP_API_PATH}/api/v1.0/notes` &&
          method === "POST" &&
          headers["Content-Type"] === "application/json" &&
          params.title === "Hello" &&
          params.created === now &&
          params.lastmod === now &&
          params.patient_id === 88 &&
          params.text === "World!"
        )
      })

      expect(serverReceivedRequest).toBeTruthy()

      clock.restore()
    })
  })

  describe("#loadNotes()", () => {
    it("fetches notes from the server", () => {
      fetchMock.get("path:/api/v1.0/notes", { notes: [ noteData ] })

      let store = new Store()
      store.patient_id = 88

      store.loadNotes().then(() => {
        expect(store.notes.length).toBe(1)

        let note = store.notes[0]
        expect(note.author_id).toBe(noteData.author_id)
        expect(note.created).toBe(noteData.created)
        expect(note.id).toBe(noteData.id)
        expect(note.lastmod).toBe(noteData.lastmod)
        expect(note.patient_id).toBe(noteData.patient_id)
        expect(note.text).toBe(noteData.text)
      })

      let serverReceivedRequest = fetchMock.called((url, { headers }) =>
        url === `${process.env.REACT_APP_API_PATH}/api/v1.0/notes?patient_id=88` &&
        headers['Content-Type'] === 'application/json'
      )

      expect(serverReceivedRequest).toBeTruthy()
    })
  })

  let noteData = {
    "author_id": 0,
    "created": "Thu, 20 Sep 2018 17:49:13 GMT",
    "id": 4,
    "lastmod": "Thu, 20 Sep 2018 17:49:13 GMT",
    "patient_id": 88,
    "text": "Note text"
  }
})
