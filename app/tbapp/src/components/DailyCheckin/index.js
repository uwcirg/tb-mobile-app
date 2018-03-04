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
				<Button bsSize='large' block>Carga la Foto</Button>
			</div>
		</div>
	</div>
	<BottomNav />
</div>


export default DailyCheckin;
