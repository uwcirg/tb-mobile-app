import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import Store from "./Store"
import { mount } from "enzyme"

import Notes from "./components/Notes"

describe("<App />", () => {
  it("renders without crashing", () => {
    const store = new Store();

    mount(<App store={store} />);
  });

  [
    Notes,
  ].map(page => {
    it (`displays the ${page.route} page`, () => {
      const store = new Store();

      mount(<App store={store} />);
      store.showPage(page)
    })
  })
})
