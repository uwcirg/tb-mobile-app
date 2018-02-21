import React from 'react';
import PropTypes from 'prop-types'
/* TODO: put in proptypes */

// import { Row, Col, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavLink as BootNavLink, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {NavLink} from 'react-router-dom';

import "./NavBar.css"

const NavBar = ({collapsed, onToggle}) => <div>
  <section className="header-w3ls">
    <h1>
      <a href="/">TB Mobile App</a>
    </h1>
    <div className="clearfix"> </div>
  </section>
</div>

export default NavBar;
