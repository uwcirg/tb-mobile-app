//Tutorial on https://felixgerschau.com/create-a-pwa-update-notification-with-create-react-app/

import React, {useEffect, useState} from 'react'
import { Snackbar, Button, Typography } from '@material-ui/core';
import * as serviceWorker from './serviceWorker';
import UpdatePopUp from './Basics/UpdateAvailablePopUp'


const SWWrapper = (props) => {
    const [showReload, setShowReload] = useState(false);
    const [waitingWorker, setWaitingWorker] = useState(null);
  
    const setUpdateAvailable = (registration) => {
        setShowReload(true)
        setWaitingWorker(registration.waiting);
    }


      const reloadPage = () => {
        waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
        setShowReload(false);
        window.location.reload(true);
      };

    //Called On render
    useEffect(() => {
        // Add this back in{ onUpdate: onSWUpdate }
        serviceWorker.register({ onUpdate: setUpdateAvailable },setUpdateAvailable);

    }, []);

    return (<>
    {props.children}
    {/* <UpdatePopUp /> */}
    {/* <Snackbar
      open={showReload}
      message="A new version is available!"
      onClick={reloadPage}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      action={
        <Button
          color="inherit"
          size="small"
          onClick={reloadPage}
        >
          Reload Application
        </Button>
      } */}
    />
    </>)
}

export default SWWrapper;