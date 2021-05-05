import React, {useEffect} from 'react'
import useStores from './UseStores';
import isBroadcastChannelSupported from '../Utility/BroadcastChannelCheck'

const PushHandler = (props) => {
    const {uiStore} = useStores();

    const handleMessageFromServiceworker = (message) => {
        if (message.url) {
            uiStore.push(message.url)
        }
    }

    useEffect(() => {
        if (isBroadcastChannelSupported()) {
            const channel = new BroadcastChannel('notifications');
            channel.addEventListener('message', event => {
                handleMessageFromServiceworker(event.data);
            });
        }
    }, [])



    return (<>{props.children}</>) 

}

export default PushHandler;