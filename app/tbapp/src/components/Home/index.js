import React from 'react';
import PropTypes from 'prop-types';

/* TODO: prop types */
import { Container, Row, Col, Button } from 'reactstrap';

import Patients from '../Patients';
import Users from '../Users';
import UpdateJumbo from '../../containers/UpdateJumbo';

const Home = ({match}) =>{
  console.log("PROPSAGAIN")
  console.log(match)
  
  const { timezone, patientId } = match.params;
  return (
  <div>
    <UpdateJumbo timezone={timezone} patientId={patientId} />

    <br />

    <Row>
      {/* <Col sm='6'><Users /></Col>
      <Col sm='6'><Patients /></Col> */}
    </Row>
  </div>);
};

export default Home;