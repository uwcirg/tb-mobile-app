import React, { useEffect } from 'react';
import Channel from './Channel';
import useStores from '../Basics/UseStores';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import useResize from '../Hooks/Resize'
import MobileMessages from './MobilePractitionerMsg'
import ChannelNavigation from './ChannelNavigation'
import Sidebar from './Sidebar'
import { Typography } from '@material-ui/core';
import { ArrowLeft, KeyboardArrowLeft } from '@material-ui/icons';

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
        "& > h2": {
            fontSize: "1.25em"
        },
        justifyContent: "center",
        alignItems: "center"
    },
    sideBar: {
        flexGrow: 1
    },
    navContainer: {
        width: "320px",
        borderRight: "solid 1px lightgray",

    }

});

const Messaging = observer(() => {
    const { isMobile } = useResize();
    const { t } = useTranslation('translation');
    const { messagingStore, practitionerStore, uiStore } = useStores();
    const classes = useStyles();

    useEffect(() => {
        messagingStore.getChannels();
    }, [])

    useEffect(() => {
        messagingStore.selectedChannel.id = uiStore.pathNumber;
        messagingStore.updateSelectedChannel();
        messagingStore.initalizeChannel();
        messagingStore.getInitalMessages();

    }, [uiStore.pathNumber])


    if (isMobile) {
        return <MobileMessages />
    }

    return (
        <div className={classes.superContainer}>
            <div className={classes.navContainer}>
                <ChannelNavigation />
            </div>
            <div className={classes.channelContainer}>
                {messagingStore.selectedChannel && messagingStore.selectedChannel.id !== 0 ?
                    <Channel
                        isCoordinator
                        isPrivate={messagingStore.coordinatorSelectedChannel && messagingStore.coordinatorSelectedChannel.isPrivate}
                        userID={practitionerStore.userID}
                        selectedChannel={messagingStore.selectedChannel}
                    />
                    : <div className={classes.selectChannel}>
                        <KeyboardArrowLeft />
                        <Typography align="center" variant="h2">{t('messaging.selectChannel')}</Typography>
                        </div>
                }
            </div>
            <div className={classes.sideBar}>
                <Sidebar />
            </div>
        </div>
    )
});

export default Messaging;