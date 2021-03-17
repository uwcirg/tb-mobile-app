import React, { Suspense } from 'react';
import { Provider } from 'mobx-react';
import { render } from '@testing-library/react'

//Internationalization
import i18n from "../Language/i18n";
import { I18nextProvider } from 'react-i18next';
import { MuiPickersUtilsProvider } from '@material-ui/pickers/MuiPickersUtilsProvider';
import DateFnsUtils from '@date-io/luxon';

//Object Containing MobX Stores in ./Datastores file
import { Router } from 'react-router';

const AllTheProviders = (props) => {

    return(
  <Provider {...props.stores}>
    <I18nextProvider i18n={i18n}>
      <Suspense fallback="Page Loading">
          <MuiPickersUtilsProvider utils={DateFnsUtils} >
            <Router history={props.history}>
              {props.children}
            </Router>
          </MuiPickersUtilsProvider>
      </Suspense>
    </I18nextProvider>
  </Provider>
    )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }

/*

import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'my-ui-lib'
import { TranslationProvider } from 'my-i18n-lib'
import defaultStrings from 'i18n/en-x-default'

const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider theme="light">
      <TranslationProvider messages={defaultStrings}>
        {children}
      </TranslationProvider>
    </ThemeProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }

*/