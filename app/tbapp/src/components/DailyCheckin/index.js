import React from 'react';
import TopBar from '../TopBar';
import BottomNav from '../BottomNav';

import {Button} from 'react-bootstrap';
import "./DailyCheckin.css";

const DailyCheckin = () => <div className='row' id='daily-checkin'>
	<TopBar header="Notificación Diaria" />
	<div className='main'>
		<div className='v-center'>
			<div className='main-menu-buttons'>
				<a href={ process.env.REACT_APP_CHECKIN_PATH } className='btn btn-lg btn-primary btn-block'>Notificación Diaria</a>
				<br />
				<a href='https://mpower-dev.cirg.washington.edu/mpower_tb-ivanc/surveys/new_session?project=symptoms_side_effects' className='btn btn-lg btn-block btn-primary'>Mis Sintomas</a> 
				<br />
				<a href="https://mpower-dev.cirg.washington.edu/mpower_tb-ivanc/surveys/new_session?project=mPOWer%20-%20Photo%20Upload" className='btn btn-lg btn-block btn-default'>Carga la Foto</a>
			</div>
		</div>
	</div>
	<BottomNav />
</div>


export default DailyCheckin;
