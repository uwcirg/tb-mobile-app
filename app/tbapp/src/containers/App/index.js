import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,

} from 'react-router-dom';

import {Container} from 'reactstrap';

import './App.css';

// import NavBar from '../../components/NavBar';
import Startup from '../../components/Startup'
import Redirect from '../../containers/Redirect';
import DailyCheckin from '../../components/DailyCheckin';
import MyProgress from '../../components/MyProgress';
import Home from '../../components/Home';
import Placeholder from '../../components/Placeholder';

const App = props => {
  return ( <div id='viewport'> 
    <Router>
      <div>
        <Container fluid={true}>
          <Switch>
            <Route path='/home' component={Home} />
            <Route path='/redirect' component={Redirect} />
            <Route exact path='/' component={Startup} />
            <Route path='/daily-checkin' component={DailyCheckin} />
            <Route path='/my-progress' component={MyProgress} />
            <Route path='/messages' component={Placeholder} />
            <Route path='/info' component={Placeholder} />
            <Route path='/my-progress' component={MyProgress} />
            <Route path='/my-notes' component={Placeholder} />
          </Switch>
        </Container>
      </div>
    </Router>
  </div>
  )
}

export default App;
