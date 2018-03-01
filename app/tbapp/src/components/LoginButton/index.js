import React from 'react';
import Button from 'react-bootstrap';

const LoginButton = ({login}) => 
  <Button bsSize='lg' block bsStyle='primary' onClick={login}><i className="fa fa-sign-in" aria-hidden="true"></i>Login</Button>

export default LoginButton;