import React, { Component } from 'react';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import loggingMiddleware from './middleware/loggingMiddleware';
import authMiddleware from './middleware/authMiddleware';

import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import reducer from './reducers';

import Login from './containers/Login'
import Logout from './containers/Logout'
import RedirectPage from './containers/RedirectPage';

// Components!
import DailyCheckin from './components/DailyCheckin';
import MyProgress from './components/MyProgress';
import Home from './components/Home';
import Placeholder from './components/Placeholder';
import Faqs from './components/Faqs';
import InfoEd from './components/InfoEd';
import SymptomOverview from './components/SymptomOverview';
import Messaging from './components/Messaging';
import TbQuiz from './components/TbQuiz';
import MyNotes from './components/MyNotes';

const Root = (props) => {
  const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(
      authMiddleware,
      loggingMiddleware
    )
  ));

  return (
    <Provider store={store}>
      <ConnectedApp />
    </Provider>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      console.log(rest.isLoggedIn);
      console.log(props);
      return rest.isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to='/startup' />
      )
    }}

  />
);

// wrapping/composing
const StartupRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => {
    console.log(rest);
    return rest.isLoggedIn ? (<Redirect to='/' />) : (<Login />)
  }}/>
)

const App = props => {
  return ( <div id='viewport'>
    <Router>
      <div className="bg">
        <Switch>
          <PrivateRoute exact path='/' isLoggedIn={props.isLoggedIn} component={Home} />

          <Route exact path='/redirect' component={RedirectPage} />
          <Route exact path='/logout' component={Logout} />
          <StartupRoute exact path='/startup' isLoggedIn={props.isLoggedIn} />
          <PrivateRoute path='/daily-checkin' isLoggedIn={props.isLoggedIn} component={DailyCheckin} />
          <PrivateRoute path='/my-progress' isLoggedIn={props.isLoggedIn} component={MyProgress} />
          <PrivateRoute path='/messages' isLoggedIn={props.isLoggedIn} component={Messaging} />
          <PrivateRoute exact path='/info' isLoggedIn={props.isLoggedIn} component={InfoEd} />
          <PrivateRoute exact path='/info/faqs' isLoggedIn={props.isLoggedIn} component={Faqs} />
          <PrivateRoute exact path='/info/symptom-overview' isLoggedIn={props.isLoggedIn} component={SymptomOverview} />
          <PrivateRoute exact path='/info/tb-quiz' isLoggedIn={props.isLoggedIn} component={TbQuiz} />
          <PrivateRoute path='/my-notes' isLoggedIn={props.isLoggedIn} component={MyNotes} />
          <Redirect to={{
            state: { error: true }
          }} />
        </Switch>
      </div>
    </Router>
  </div>
  )
}


const mapStateToProps = ({auth}) => ({
  isLoggedIn: auth.isLoggedIn
})

const ConnectedApp = connect(mapStateToProps, {})(App);

export default Root;
