import React from "react";
import Notes from "./Notes";
import Store from "../Store"
import { Observer } from "mobx-react";
import sinon from "sinon"
import mountWithHelpers from "../test_utils/enzyme_helpers.js"

describe("<Notes/>", () => {
  it("shows a button to add a new note", () => {
    let store = new Store()
    let component = mountWithHelpers(<Notes store={store} />)

    expect(component.find("textarea").length).toBe(0)

    component.clickButton("Nueva")
    expect(component.find("textarea").length).not.toBe(0)
  })

  it("records a draft", () => {
    let store = new Store()
    let component = mountWithHelpers(<Notes store={store} />)

    component.clickButton("Nueva")
    component.fillFirstTextArea("Hello")
    component.fillLastTextArea("World")

    expect(store.noteTitle).toBe("Hello")
    expect(store.noteDraft).toBe("World")

    expect(component.find("textarea").first().prop("value")).toBe("Hello")
    expect(component.find("textarea").last().prop("value")).toBe("World")
  });

  it("saves a note", () => {
    let store = new Store()
    store.saveNote = sinon.fake()
    let component = mountWithHelpers(<Notes store={store} />)

    component.clickButton("Nueva")
    component.fillFirstTextArea("Hello")
    component.clickButton("Save")

    expect(store.saveNote.called).toBeTruthy()
  });

  xit("updates a note", () => {
  });

  it("displays existing notes", () => {
    let store = new Store()
    store.notes = [
      { id: 1, title: "Note 1", text: "Hello!" },
      { id: 2, title: "Note 2", text: "Goodbye!" },
    ]

    let component = mountWithHelpers(<Notes store={store} />)

    expect(component
      .findWhere(n => n.text() === "Note 1")
      .length
    ).not.toBe(0)

    expect(component
      .findWhere(n => n.text() === "Note 2")
      .length
    ).not.toBe(0)
  });
})
