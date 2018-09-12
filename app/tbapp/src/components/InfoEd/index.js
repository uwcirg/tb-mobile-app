import React from 'react';
import TopBar from '../TopBar';
import BottomNav from '../BottomNav';
import { Link } from 'react-router-dom';

const InfoEd = () => <div className='row'>
    <TopBar header='Información y Educación' />
    <div className='main'>
        <div className='v-center'>
			<div className='main-menu-buttons'>
                <Link className='btn btn-lg btn-default btn-block' to='/info/faqs'>Preguntas frecuentes<br /> y respuestas</Link>
                <br />
                <Link className='btn btn-lg btn-default btn-block' to='/info/symptom-overview'>Resumen de los síntomas<br /> y efectos secundarios</Link>
                <br />
                <Link className='btn btn-lg btn-default btn-block' to='/info/tb-quiz'>Prueba tu conocimiento<br /> sobre la tuberculosis!</Link>
			</div>
		</div>
    </div>
	<BottomNav />
</div>


export default InfoEd;
