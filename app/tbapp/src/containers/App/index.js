import React from 'react';
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import {Container} from 'reactstrap';

import './App.css';

// import NavBar from '../../components/NavBar';
import Login from '../Login'
import Logout from '../Logout'
import RedirectPage from '../../containers/RedirectPage';
import DailyCheckin from '../../components/DailyCheckin';
import MyProgress from '../../components/MyProgress';
import Home from '../../components/Home';
import Placeholder from '../../components/Placeholder';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      console.log(rest.isLoggedIn);
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
      <div>
        <Container fluid={true}>
          <Switch>
            <PrivateRoute exact path='/' isLoggedIn={props.isLoggedIn} component={Home} />
            <Route exact path='/redirect' component={RedirectPage} />
            <Route exact path='/logout' component={Logout} />
            <StartupRoute exact path='/startup' isLoggedIn={props.isLoggedIn} />
            <PrivateRoute path='/daily-checkin' isLoggedIn={props.isLoggedIn} component={DailyCheckin} />
            <PrivateRoute path='/my-progress' isLoggedIn={props.isLoggedIn} component={MyProgress} />
            <PrivateRoute path='/messages' isLoggedIn={props.isLoggedIn} component={Placeholder} />
            <PrivateRoute path='/info' isLoggedIn={props.isLoggedIn} component={Placeholder} />
            <PrivateRoute path='/my-notes' isLoggedIn={props.isLoggedIn} component={Placeholder} />
          </Switch>
        </Container>
      </div>
    </Router>
  </div>
  )
}


const mapStateToProps = ({auth}) => ({
  isLoggedIn: auth.isLoggedIn
})

export default connect(mapStateToProps, {})(App);