import React from 'react';
import TopBar from '../TopBar';
import BottomNav from '../BottomNav';

import './MyNotes.css'

const MyNotes = () => <div className='row'>
    <TopBar header='Mis Notas' expand />
    <div className='main notes-main'>
        <h3><i className='fas fa-angle-right'></i>&nbsp;Sobre "Mis Notas"</h3>
        <textarea className='form-control' placeholder='Aquí puede escribir sus notas...' />
    </div>
	<BottomNav />
</div>


export default MyNotes;