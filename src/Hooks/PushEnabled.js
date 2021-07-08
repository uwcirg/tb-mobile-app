/*

    Checks if web push permission has been granted, and updates on changes to this permission

    Possible states: 

    unsupported ( this browser does not support push notifications )
    default ( awaiting response to prompt)
    granted ( all good, notifications are enabled )
    denied ( user had selected block, notifications are not enabled )

*/

import { useEffect, useState, useRef } from 'react';
import getNotificationPreference from '../Utility/GetNotificationPreference';
import useStores from '../Basics/UseStores';

export default function usePushEnabled() {

    const [permissionState, setPermissionState] = useState('default');
    const { patientStore } = useStores();

    const prevPref = useRef();
    const mounted = useRef(false);

    const checkAndSetState = () => {
        if (mounted.current) { //Ensure component is currently rendered to prevent memory leak error
            setPermissionState(getNotificationPreference());
        }
    }

    const listenForPermissionsChange = () => {
        if ('permissions' in navigator) {
            navigator.permissions.query({ name: 'notifications' }).then((notificationPerm) => {
                notificationPerm.onchange = checkAndSetState;
            });
        }
    }

    useEffect(()=>{
        if(prevPref.current === "denied" && permissionState === "granted"){ //If newly opted in, ensure that credentials are up to date
            patientStore.subscribeToNotifications();
        }else if(permissionState === "denied"){ //Log change on server if newly denied, opt
            patientStore.logPushPermissionStatus();
        }
        prevPref.current = permissionState;
    },[permissionState])

    useEffect(() => {
        mounted.current = true;
        listenForPermissionsChange();
        checkAndSetState();

        return function cleanup() {
            //Mark unmount to prevent updating state on unmounted component - for help https://stackoverflow.com/questions/57624060
            mounted.current = false;
        }
    }, []);



    return permissionState;
}