import React, { useEffect } from 'react'
import useStores from './UseStores';
import isBroadcastChannelSupported from '../Utility/BroadcastChannelCheck'
import { useTranslation } from 'react-i18next';


//Handles the event when a push notification is clicked
const PushHandler = (props) => {
    const { uiStore } = useStores();
    const { t } = useTranslation('translation');

    const notificationTypes = {
        medication: {
            title: t('notifications.medication.title'),
            body: t('notifications.medication.body'),
            url: "/home",
            // data: { url: @app_url, id: @status.id, type: @status.notification_type },
            // actions: @actions
        }
    }



    const handleMessageFromServiceworker = (message) => {

        if (message.url) {
            uiStore.push(message.url)
        }
    }

    useEffect(() => {
        if (isBroadcastChannelSupported()) {
            const channel = new BroadcastChannel('notifications');

            const translationChannel = new BroadcastChannel('push-translation');

            translationChannel.addEventListener('message', event => {
                const { label, id } = event.data.json.data
                translationChannel.postMessage({
                    type: 'push-translation-return',
                    body: {
                        ...notificationTypes[label],
                        data: { id: id, url: notificationTypes[label].url  }
                    }, 
                    json: event.data.json
                })
            })

            channel.addEventListener('message', event => {
                handleMessageFromServiceworker(event.data);
            });
        }
    }, [])

    return (<>{props.children}</>)

}

export default PushHandler;