/*

Checks if web push permission has been granted, and updates on changes

Possible states: 

unsupported ( this browser does not support push notifications )
default ( awaiting response to prompt)
granted ( all good, notifications are enabled )
denied ( user had selected block, notifications are not enabled )

*/

import { useEffect, useState } from 'react'

export default function usePushEnabled() {

    const [permissionState, setPermissionState] = useState('default');


    const checkAndSetState = () => {
        if (!("Notification" in window)) {
            setPermissionState('unsupported')
            return
        }
        setPermissionState(Notification.permission)
    }

    const listenForPermissionsChange = (onChange) => {
        if ('permissions' in navigator) {
            navigator.permissions.query({ name: 'notifications' }).then((notificationPerm) => {
                notificationPerm.onchange = () => {
                    onChange();
                }
            });
        }
    }

    useEffect(() => {
        //Listen for user changes to permissions, and update state accordingly
        listenForPermissionsChange(checkAndSetState);
        checkAndSetState();
    }, []);

    return permissionState;
}