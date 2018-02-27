import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './Startup.css'

const Startup = () => <div className='row'>
  <div className='startup'>
  <div className='v-center'>
    <div className='startup-body'>
      <h1>TB Asistente Diario</h1>
      <ButtonToolbar className='signin-toolbar'>
        <Link className='btn btn-primary btn-lg btn-block' to='/home'>Registrarse</Link>
        <Button id='create-account' bsSize='large' block>Crea una Cuenta</Button>        
      </ButtonToolbar>
    </div>
  </div>
  </div>
</div>

export default Startup;
