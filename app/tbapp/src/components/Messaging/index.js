import React from 'react';
import TopBar from '../TopBar';
import BottomNav from '../BottomNav';

import './Messaging.css'

const Messaging = () => (
  <div className='row'>
    <TopBar header='Mensajería' />

    <div className='main scroll'>
        <div className='head-text'>
            <p>Aquí es donde puede conversar con su coordinador de tratamiento y ver los mensajes educativos que corresponden a su etapa de tratamiento.</p>
            <br />
            <p><strong>Nota: La mensajería no es para emergencias o problemas médicos urgentes.</strong>Si tiene una emergencia, haga <a href='' style={{textDecoration: 'line-through'}}>clic aquí para llamar al 911.</a></p>
            <p>Las horas de mensajería son de lunes a viernes, de 09:00 a 17:00. Su coordinador de tratamiento responderá tan pronto como sea posible, generalmente dentro de las 24 horas (durante la semana).</p>
        </div>

        <div className='message'>
            <div className='name'>Maria Barrientos</div>
            <div className='date active'>Hoy a las 11:53</div>
            <div className='clearfix'></div>
            <div className='text'>Maria: Hola Luis! ¿Cómo estás? Recibí tu mensaje sob...</div>
        </div>

        <div className='message'>
            <div className='name'>TB Tratamiento Semana 1 Información</div>
            <div className='date'>Ayer</div>
            <div className='clearfix'></div>
            <div className='text'>TB Tratamiento: Felicidades por compluir tu...</div>
        </div>

        <div className='message'>
            <div className='name'>TB Tratamiento Semana 1 Información</div>
            <div className='date'>Ayer</div>
            <div className='clearfix'></div>
            <div className='text'>TB Tratamiento: Felicidades por compluir tu...</div>
        </div>
      </div>
    <BottomNav />
  </div>
)


export default Messaging;
