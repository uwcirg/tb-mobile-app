//Tutorial on https://felixgerschau.com/create-a-pwa-update-notification-with-create-react-app/

import React, { useEffect, useState } from 'react'
import * as serviceWorker from './serviceWorker';
import UpdatePopUp from './Basics/UpdateAvailablePopUp';
import {observer} from 'mobx-react';
import useStores from './Basics/UseStores';

const SWWrapper = observer((props) => {
  //TODO! Update this to default to false - set to true for dev
  const [showReload, setShowReload] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState(null);
  const [optOut, setOptOut] = useState(false);

  const {uiStore} = useStores();

  const isVisible = usePageVisibility();

  const setUpdateAvailable = (registration) => {
    setShowReload(true)
    setWaitingWorker(registration.waiting);
  }


  const reloadPage = () => {
    waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
    setShowReload(false);
    window.location.reload(true);
  };

  // function listener(){
  //   if(document.visibilityState === "visible"){
  //     console.log("visibility change detected")
  //     serviceWorker.register({ onUpdate: setUpdateAvailable }, setUpdateAvailable);
  //   }
    
  // }

  useEffect(() =>{
    if(document.visibilityState === "visible"){
      serviceWorker.register({ onUpdate: setUpdateAvailable }, setUpdateAvailable);
      uiStore.visibilityChangeCount += 1;
    }

  },[isVisible])

  //Called On render
  useEffect( () => {
    serviceWorker.register({ onUpdate: setUpdateAvailable }, setUpdateAvailable);
  }, []);

  const showPopUp = showReload && !optOut;

  return (<>
    {props.children}
    {showPopUp && <UpdatePopUp
      optOut={() => { setOptOut(true) }}
      completeUpdate={reloadPage}
    />}
  </>)
});


function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(getIsDocumentHidden())
  const onVisibilityChange = () => setIsVisible(getIsDocumentHidden())
  useEffect(() => {
    const visibilityChange = getBrowserVisibilityProp()
    document.addEventListener(visibilityChange, onVisibilityChange, false)
    return () => {
      document.removeEventListener(visibilityChange, onVisibilityChange)
    }
  })
  return isVisible
}

export function getBrowserVisibilityProp() {
  if (typeof document.hidden !== "undefined") {
    // Opera 12.10 and Firefox 18 and later support
    return "visibilitychange"
  } else if (typeof document.msHidden !== "undefined") {
    return "msvisibilitychange"
  } else if (typeof document.webkitHidden !== "undefined") {
    return "webkitvisibilitychange"
  }
}
export function getBrowserDocumentHiddenProp() {
  if (typeof document.hidden !== "undefined") {
    return "hidden"
  } else if (typeof document.msHidden !== "undefined") {
    return "msHidden"
  } else if (typeof document.webkitHidden !== "undefined") {
    return "webkitHidden"
  }
}
export function getIsDocumentHidden() {
  return !document[getBrowserDocumentHiddenProp()]
}




export default SWWrapper;