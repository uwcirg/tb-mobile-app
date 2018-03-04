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
				<a href='https://mpower-dev.cirg.washington.edu/mpower_tb-ivanc/surveys/new_session?project=daily_check_in' className='btn btn-lg btn-primary btn-block'>Reporte Diario</a>
				<br />
				<Button bsSize='large' block>Photo Report</Button>
			</div>
		</div>
	</div>
	<BottomNav />
</div>


export default DailyCheckin;
