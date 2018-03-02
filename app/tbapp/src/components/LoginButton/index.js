import React from 'react';
import { Button } from 'react-bootstrap';

const LoginButton = ({login}) => 
  <Button bsSize='lg' block bsStyle='primary' onClick={login}>Registrarse</Button>
 
export default LoginButton;