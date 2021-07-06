/*

Checks if web push permission has been granted, and updates on changes to this permission

Possible states: 

unsupported ( this browser does not support push notifications )
default ( awaiting response to prompt)
granted ( all good, notifications are enabled )
denied ( user had selected block, notifications are not enabled )

*/

import { useEffect, useState , useRef } from 'react'

export default function usePushEnabled() {

    const [permissionState, setPermissionState] = useState('default');
    const mounted = useRef(false);


    const checkAndSetState = () => {
        if(mounted.current){
             if (!("Notification" in window)) {
            setPermissionState('unsupported')
            return
        }
        setPermissionState(Notification.permission)
        }
       
    }

    const listenForPermissionsChange = () => {
        if ('permissions' in navigator) {
            navigator.permissions.query({ name: 'notifications' }).then((notificationPerm) => {
                notificationPerm.onchange = checkAndSetState
            });
        }
    }

    useEffect(() => {
        mounted.current = true;
        listenForPermissionsChange();
        checkAndSetState();

        return function cleanup(){
           //Mark unmount to prevent updating state on unmounted component - for help https://stackoverflow.com/questions/57624060
            mounted.current = false;
        }
    }, []);

    return permissionState;
}