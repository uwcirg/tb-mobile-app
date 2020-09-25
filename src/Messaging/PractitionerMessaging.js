import React, { useEffect, useState, useRef } from 'react';
import Channel from './Channel';
import ChannelPreview from './ChannelPreview'
import { DateTime } from 'luxon'
import useStores from '../Basics/UseStores';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import Styles from '../Basics/Styles';
import AddTopic from './AddTopic';
import useResize from '../Hooks/Resize'
import MobileMessages from './MobilePractitionerMsg'
import ChannelNavigation from './ChannelNavigation'
import Sidebar from './Sidebar'

const useStyles = makeStyles({
    superContainer: {
        display: "flex"
    },
    channelContainer: {
        minWidth: "50%",
        maxWidth: "50% !important",
        height: "100vh",
        borderRight: "1px solid lightgray"
    },
    selectChannel: {
        display: "flex",
        width: "100%",
        height: "100%",
        "& > h1": {
            padding: "2em",
            width: "60%"
        },
        justifyContent: "center",
        alignItems: "center"
    },
    sideBar: {
        flexGrow: 1
    },
    navContainer:{
        width: "320px",
        borderLeft: "solid 1px lightgray",
        borderRight: "solid 1px lightgray",

    }

});

const Messaging = observer(() => {
    const {isMobile} = useResize();
    const { t, i18n } = useTranslation('translation');
    const { messagingStore, practitionerStore, uiStore } = useStores();
    const classes = useStyles();

    useEffect(() => {
        messagingStore.getChannels();
    }, [])

    useEffect(() => {
        messagingStore.selectedChannel.id = uiStore.pathNumber;
        messagingStore.updateSelectedChannel();
        messagingStore.getSelectedChannel()

    }, [uiStore.pathNumber])


    if(isMobile){
        return <MobileMessages />
    }

    return (
        <div className={classes.superContainer}>
            <div className={classes.navContainer}>
            <ChannelNavigation />
            </div>
            <div className={classes.channelContainer}>
                {messagingStore.selectedChannel && messagingStore.selectedChannel.id !== "" ?
                    <Channel
                        isCoordinator
                        isPrivate={messagingStore.coordinatorSelectedChannel && messagingStore.coordinatorSelectedChannel.isPrivate}
                        userID={practitionerStore.userID}
                        selectedChannel={messagingStore.selectedChannel}
                    />
                    : <div className={classes.selectChannel}><h1> {t('messaging.selectChannel')}</h1></div>
                }
            </div>
            <div className={classes.sideBar}>
                <Sidebar />
            </div>
        </div>
    )
});

export default Messaging;