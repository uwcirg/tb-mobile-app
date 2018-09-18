import React from 'react';
import TopBar from '../TopBar';
import BottomNav from '../BottomNav';

import './MyProgress.css'

const MyProgress = () => <div className='row' id='my-progress'>
	<TopBar header="Mi Progreso" />
	<div className='main'>
	
	<div id='clock'>
		<div id='face'><i className='far fa-clock'></i></div>
		<div id='message'>
			<strong>¡Sólo quedan 3 meses y 4 días!</strong>
			<p>Eso significa que ya ha completado [2 meses, 26 días]. ¡Estás en camino!</p>
		</div>
	</div>
	<div id='history'>
		<h3>Historia</h3>
	</div>
	
	</div>
	<BottomNav />
</div>


export default MyProgress;