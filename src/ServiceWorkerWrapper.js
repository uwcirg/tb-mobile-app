//Helpful Tutorial on https://felixgerschau.com/create-a-pwa-update-notification-with-create-react-app/

import React, { useEffect, useState } from "react";
import * as serviceWorker from "./serviceWorker";
import UpdatePopUp from "./Basics/UpdateAvailablePopUp";
import { usePageVisibility } from "./Hooks/PageVisibility";

const SWWrapper = (props) => {
  const [showReload, setShowReload] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState(null);
  const [optOut, setOptOut] = useState(false);

  const isVisible = usePageVisibility();

  const setUpdateAvailable = (registration) => {
    setShowReload(true);
    setWaitingWorker(registration.waiting);
  };

  const reloadPage = () => {
    waitingWorker?.postMessage({ type: "SKIP_WAITING" });
    setShowReload(false);
    window.location.reload(true);
  };

  //Check for service worker update when page goes from invisible to visible.
  //this helps us detect when the application is launched from installed
  useEffect(() => {
    if (document.visibilityState === "visible") {
      setOptOut(false);
      serviceWorker.newUpdate();
      serviceWorker.register(
        { onUpdate: setUpdateAvailable },
        setUpdateAvailable
      );
    }
  }, [isVisible]);

  //Also check for an update on the inital render
  useEffect(() => {
    serviceWorker.register(
      { onUpdate: setUpdateAvailable },
      setUpdateAvailable
    );
  }, []);

  const showPopUp = showReload && !optOut;

  return (
    <>
      {props.children}
      {showPopUp && (
        <UpdatePopUp
          optOut={() => {
            setOptOut(true);
          }}
          completeUpdate={reloadPage}
        />
      )}
    </>
  );
};

export default SWWrapper;
