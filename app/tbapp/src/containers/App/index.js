import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,

} from 'react-router-dom';

import {Container} from 'reactstrap';

import './App.css';

// import NavBar from '../../components/NavBar';
import Login from '../../containers/Login'
import Redirect from '../../containers/Redirect';
import DailyCheckin from '../../components/DailyCheckin';
import MyProgress from '../../components/MyProgress';
import Home from '../../components/Home';
import Placeholder from '../../components/Placeholder';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      props.isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);


const App = props => {
  return ( <div id='viewport'> 
    <Router>
      <div>
        <Container fluid={true}>
          <Switch>
            <PrivateRoute path='/home' component={Home} />
            <PrivateRoute path='/redirect' component={Redirect} />
            <Route exact path='/' component={Login} />
            <PrivateRoute path='/daily-checkin' component={DailyCheckin} />
            <PrivateRoute path='/my-progress' component={MyProgress} />
            <PrivateRoute path='/messages' component={Placeholder} />
            <PrivateRoute path='/info' component={Placeholder} />
            <PrivateRoute path='/my-progress' component={MyProgress} />
            <PrivateRoute path='/my-notes' component={Placeholder} />
          </Switch>
        </Container>
      </div>
    </Router>
  </div>
  )
}

export default App;
