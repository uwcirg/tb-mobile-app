import React, { useEffect } from 'react';
import { makeStyles, Drawer, Button } from '@material-ui/core';
import useStores from '../../Basics/UseStores';
import Channel from '../../Messaging/Channel';
import { observer } from 'mobx-react';

const useStyles = makeStyles({
    body: {
        height: "100vh"
    }
})

const ChannelDisplay = observer(({channelId}) => {
    
    const { practitionerStore, messagingStore } = useStores();

    useEffect(()=>{
        messagingStore.getChannelDetails(channelId);
        return function cleanup(){
            messagingStore.clearSelection();
        }
    },[])

    return(
        <>
        {messagingStore.selectedChannel.id && <Channel isCoordinator isPrivate selectedChannel={messagingStore.selectedChannel} userId={practitionerStore.userId} />}
        </>
    )
});

const MessagingPopover = ({ channelId, open }) => {

    const { uiStore } = useStores();
    const classes = useStyles();


    return (<Drawer classes={{ paper: classes.body }} anchor="bottom" open={open}>
        <Button onClick={uiStore.goBack}>Close</Button>
        {channelId && <ChannelDisplay channelId={channelId} />}
    </Drawer>)

};

export default MessagingPopover;