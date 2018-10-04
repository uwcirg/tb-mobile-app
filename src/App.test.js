import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Store from "./Store"
import { mount } from "enzyme"

describe("<App />", () => {
  it("renders without crashing", () => {
    const store = new Store();

    mount(<App store={store} />);
  });
})
