import React, { useState } from 'react';
import LoginForm from './LoginForm';

const Login = (props) => {

  return (
    <div>
      <LoginForm {...props} />
    </div>
  )
};

export default Login;