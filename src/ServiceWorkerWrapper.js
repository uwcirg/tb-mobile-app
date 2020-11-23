//Tutorial on https://felixgerschau.com/create-a-pwa-update-notification-with-create-react-app/

import React, { useEffect, useState } from 'react'
import * as serviceWorker from './serviceWorker';
import UpdatePopUp from './Basics/UpdateAvailablePopUp'


const SWWrapper = (props) => {
  //TODO! Update this to default to false - set to true for dev
  const [showReload, setShowReload] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState(null);
  const [optOut, setOptOut] = useState(false);

  const setUpdateAvailable = (registration) => {
    setShowReload(true)
    setWaitingWorker(registration.waiting);
  }


  const reloadPage = () => {
    waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
    setShowReload(false);
    window.location.reload(true);
  };

  function listener(){
    if(document.visibilityState === "visible"){
      console.log("visibility change detected")
      serviceWorker.register({ onUpdate: setUpdateAvailable }, setUpdateAvailable);
    }
    
  }

  //Called On render
  useEffect( () => {
    serviceWorker.register({ onUpdate: setUpdateAvailable }, setUpdateAvailable);
    document.addEventListener('visibilitychange', listener)

  }, []);

  //useEffect(()=>{console.log(visibleNumber)},[visibleNumber])

  const showPopUp = showReload && !optOut;

  return (<>
    {props.children}
    {showPopUp && <UpdatePopUp
      optOut={() => { setOptOut(true) }}
      completeUpdate={reloadPage}
    />}
  </>)
}



export default SWWrapper;