import React from 'react';

import TopBar from '../TopBar';

import { Link } from 'react-router-dom';
import { ButtonGroup } from 'react-bootstrap';

import "./Home.css";

const Home = () => <div className='row' id='daily-checkin'>
  <TopBar header="Inicio" />
  <div className='main home-main'>
    <div className='v-center'>
      <div className='home-nav'>
          <ButtonGroup vertical>
              <Link className='btn btn-lg' to='/daily-checkin'><i className="far fa-fw fa-calendar-check"></i>&nbsp;&nbsp;Notificación Diaria</Link>
              <Link className='btn btn-lg' to='/messages'><i className="far fa-fw fa-envelope"></i>&nbsp;&nbsp;Mensajería</Link>
              <Link className='btn btn-lg' to='/info'><i className="fas fa-fw fa-info"></i>&nbsp;&nbsp;Información y Educación</Link>
              <a className='btn btn-lg' href={ process.env.REACT_APP_CPRO_PATH+'/users/care' }><i className="fas fa-fw fa-chart-line"></i>&nbsp;&nbsp;Mi Progreso</a>
              <Link className='btn btn-lg' to='/my-notes'><i className="fas fa-fw fa-pencil-alt"></i>&nbsp;&nbsp;Mis Notas</Link>
          </ButtonGroup>
        </div>
      </div>
    </div>
</div>

export default Home;
