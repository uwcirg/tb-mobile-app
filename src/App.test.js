import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Store from "./Store"

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = new Store();

  ReactDOM.render(<App store={store} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
