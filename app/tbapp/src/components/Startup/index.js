import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginButton from '../../containers/Login'

import './Startup.css'

const Startup = ({login, isLoggedIn}) => <div className='row'>
  <div className='startup'>
  <div className='v-center'>
    <div className='startup-body'>
      <h1>TB Asistente Diario</h1>
      <ButtonToolbar className='signin-toolbar'>
        <LoginButton login={login} />
        <Link className='btn btn-lg btn-block' to='https://play.authlib.org/account/signup' />
        <Button id='create-account' bsSize='large' block>Crea una Cuenta</Button>        
      </ButtonToolbar>
    </div>
  </div>
  </div>
</div>

export default Startup;
