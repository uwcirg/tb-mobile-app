import React from 'react';
import TopBar from '../TopBar';
import BottomNav from '../BottomNav';

const MyProgress = () => <div className='row' id='my-progress'>
	<TopBar header="Mi Progreso" />
	<div className='main'></div>
	<BottomNav />
</div>


export default MyProgress;