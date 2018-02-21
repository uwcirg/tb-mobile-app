import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,

} from 'react-router-dom';

import {Container} from 'reactstrap';

import './App.css';

// import NavBar from '../../components/NavBar';
import NavBar from '../../components/NavBar';
import CollapseNav from '../../containers/CollapseNav';
import Dashboard from '../../components/Dashboard';
import Redirect from '../../containers/Redirect';

const App = props => {
  return ( <div id='viewport'> 
    <Router>
      <div>
        <NavBar />
        <Container fluid={true}>
          <Switch>
            <Route path='/redirect' component={Redirect} />
            <Route path='/' component={Dashboard} />
          </Switch>
        </Container>
        <CollapseNav />

      </div>
    </Router>
  </div>
  )
}

export default App;
