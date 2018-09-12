import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Row } from 'react-bootstrap';

const BottomNav = () =>(
  <div>
    <Navbar className='bottom-nav' fixedBottom fluid>
      <Row>
      <NavLink exact to='/daily-checkin'><i className="far fa-calendar-check"></i></NavLink>
      <NavLink exact to='/messages'><i className="far fa-envelope"></i></NavLink>
      <NavLink exact to='/info'><i className="fas fa-info"></i></NavLink>
      <a href={ process.env.REACT_APP_CPRO_PATH+'/users/care' }><i className="fas fa-chart-line"></i></a>
      <NavLink exact to='/my-notes'><i className="fas fa-pencil-alt"></i></NavLink>
      </Row>
    </Navbar>
  </div>

export default BottomNav;
