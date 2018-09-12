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
import Faqs from '../../components/Faqs';
import InfoEd from '../../components/InfoEd';
import SymptomOverview from '../../components/SymptomOverview';
import Messaging from '../../components/Messaging';
import TbQuiz from '../../components/TbQuiz';
import MyNotes from '../../components/MyNotes';



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
      <div>
        <Container fluid={true}>
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
