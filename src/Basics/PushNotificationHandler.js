import React, {useEffect} from 'react'
import useStores from './UseStores';
import isBroadcastChannelSupported from '../Utility/BroadcastChannelCheck'
import { useTranslation } from 'react-i18next';

//Handles the event when a push notification is clicked
const PushHandler = (props) => {
    const {uiStore} = useStores();
    const { t } = useTranslation('translation');

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
                console.log("handling this push event from client code")
                translationChannel.postMessage({type: 'push-translation', string: t('testStripInstructions.four'), json: event.data.json})
            })

            channel.addEventListener('message', event => {
                handleMessageFromServiceworker(event.data);
            });
        }
    }, [])

    return (<>{props.children}</>) 

}

export default PushHandler;