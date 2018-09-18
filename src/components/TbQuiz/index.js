import React from 'react';
import TopBar from '../TopBar';
import BottomNav from '../BottomNav';


const Placeholder = () => <div className='row'>
    <TopBar header='TB Quiz' />
    <div className='main'>
        <h2>Prueba tu conocimiento sobre la tuberculosis!</h2>
        <p>Como sabe, ¡Hay muchos conceptos erróneos sobre la tuberculosis! Haga esta prueba divertida para poner a prueba su conocimiento y aprender más acerca de esta enfermedad relativamente común pero a menudo incomprendida.</p>
        <button className='btn btn-default btn-lg btn-block'>Atrás</button>
        <button className='btn btn-primary btn-lg btn-block'>Empezar</button>
    </div>
	<BottomNav />
</div>


export default Placeholder;