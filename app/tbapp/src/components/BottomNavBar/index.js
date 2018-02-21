import React from 'react';
import PropTypes from 'prop-types'
import Login from '../../containers/Login';

/* TODO: put in proptypes */

// import { Row, Col, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavLink as BootNavLink, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {NavLink} from 'react-router-dom';

import "./BottomNavBar.css"
import { Clearfix } from 'react-bootstrap';

const BottomNavBar = ({collapsed, onToggle}) => <div>
  <section className="header-w3ls">
    <button id="trigger-overlay" type="button">
      <i className="fa fa-bars" aria-hidden="true"></i>
    </button>
    <div className="bottons-agileits-w3layouts">      
      <Login />
    </div>
    <Clearfix />
  </section>
</div>

export default BottomNavBar;
