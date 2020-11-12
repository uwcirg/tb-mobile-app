import React, {useEffect} from 'react'
import { Snackbar, Button } from '@material-ui/core';
import * as serviceWorker from './serviceWorker';

const SWWrapper = (props) => {

    //Called On render
    useEffect(() => {
        // Add this back in{ onUpdate: onSWUpdate }
        //serviceWorker.register();
    }, []);

    return (<>{props.children}</>)
}

export default SWWrapper;