import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export const RedirectBody = () => (
    <div>
        <h1>Redirected!</h1>
    </div>    

)

export const Redirect = () => {
    return <RedirectBody  />
}
    
export default Redirect;