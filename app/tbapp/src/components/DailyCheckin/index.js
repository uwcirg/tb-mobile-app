import React from 'react';
import TopBar from '../TopBar';
import BottomNav from '../BottomNav';

import {Button} from 'react-bootstrap';
import "./DailyCheckin.css";

const DailyCheckin = () => <div className='row' id='daily-checkin'>
	<TopBar header="Notificación Diaria" />
	<div className='main'>
		<div className='v-center'>
			<div className='checkin-buttons'>
				<Button bsSize='large' block bsStyle='primary'>Reporte Diario</Button>
				<br />
				<Button bsSize='large' block>Photo Report</Button>
			</div>
		</div>
	</div>
	<BottomNav />
</div>


export default DailyCheckin;