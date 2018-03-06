import React from 'react';
import PropTypes from 'prop-types'
/* TODO: put in proptypes */

// import { Row, Col, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavLink as BootNavLink, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import "./TopBar.css"

const TopBar = ({header, expand, message}) => <div>
  <section className={"top-bar " + (expand ? 'top-bar-expand' : '')}>
    <h3>{header}</h3>
    { message &&
      <button className='btn btn-default message-btn'>Iniciar una nueva conversación</button>
    }
    <div className="clearfix"> </div>
  </section> 
</div>

export default TopBar;
