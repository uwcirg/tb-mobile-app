import React, { useContext, useEffect } from 'react';
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react';
import PatientIssueContext from './PatientIssuesContext';
import MessagingPopover from './MessagingPopover';

const MessagePatient = observer(() => {

    const {uiStore} = useStores();
    const { patients} = useContext(PatientIssueContext)

    const channelId = new URLSearchParams(uiStore.urlSearchParams).get('onMessagingChannelId')
    const channelName = patients?.find(each => {
        return each.channelId === parseInt(channelId)
    })?.fullName

    // useEffect(() => {
    //     if (!!channelId) { execute() }
    // }, [channelId])

    return( <MessagingPopover channelName={channelName} channelId={channelId} open={!!channelId} />)

});

export default MessagePatient;