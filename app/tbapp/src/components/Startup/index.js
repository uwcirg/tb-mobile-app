import React from 'react';
import LoginButton from '../LoginButton'
import { ButtonToolbar } from 'react-bootstrap';

import './Startup.css'

const Startup = ({login, isLoggedIn}) => <div className='row'>
  <div className='startup'>
  <div className='v-center'>
    <div className='startup-body'>
      <div className='v-center'>
        <div>
        <h1>TB Asistente Diario</h1>
        <ButtonToolbar className='signin-toolbar'>          
          <LoginButton login={login} />
          <a className='btn btn-lg btn-block btn-default' href='http://lvh.me:8080/account/signup'>Crea una Cuenta</a>
        </ButtonToolbar>
        </div>
      </div>
    </div>
  </div>
  </div>
</div>

export default Startup;
