import React, { useEffect, useState } from 'react';
import Channel from './Channel';
import ChannelPreview from './ChannelPreview'
import { DateTime } from 'luxon'
import useStores from '../Basics/UseStores';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import OverTopBar from '../Patient/Navigation/OverTopBar';
import SearchBar from '../Basics/SearchBar';
import Div100vh from 'react-div-100vh'
import PreventOffline from '../Basics/PreventOffline';

const useStyles = makeStyles({
    root: {
        backgroundColor: "white",
        "& > div > div > h2": {
            marginLeft: ".5em",
            fontSize: "1.25em"
        }
    },

    warning: {
        fontSize: ".8em",
        backgroundColor: "#f2f2f2",
        display: "flex",
        margin: 0,
        padding: ".5em",
        alignItems: "center",
        justifyContent: "space-between"
    },
    errorMessage: {
        width: "100%",
        textAlign: "center"
    },
    singleChannelContainer: {
        position: "fixed",
        top: 0,
        width: "100vw",
        zIndex: "3"
    }
});

const Messaging = observer(() => {

    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');
    const { messagingStore, patientStore, uiStore } = useStores();
    const [search, setSearch] = useState("");

    useEffect(() => {
        messagingStore.getUnreadMessages();
    }, [])

    const handleBackFromChannel = () => {
        uiStore.goToMessaging();
        messagingStore.clearSelection();
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const publicChannels = (messagingStore.channels.length > 0) ? messagingStore.channels.slice().filter((channel) => {
        return (!channel.isPrivate && channel.title.toLowerCase().includes(search.toLowerCase()))
    }) : [];
    const coordinatorChannel = (messagingStore.channels.length > 0) ? [messagingStore.channels.find((channel) => { return (channel.isPrivate) })] : [];

    const siteChannel = (messagingStore.channels.length > 0) ? [messagingStore.channels.find((channel) => { return (channel.isSiteChannel) })] : [];

    useEffect(() => messagingStore.getChannels(), []);

    return (
        <div className={classes.root}>
            {!uiStore.onSpecificChannel ? <div id="intro-messaging">
                <div id="intro-chat">
                    <h2>{t("userTypes.coordinator")}</h2>
                    <Channels private channels={coordinatorChannel} />
                </div>
                <div>
                    <h2>Your Site</h2>
                    <Channels isSiteChannel channels={siteChannel} />
                </div>
                <div id="intro-chat-public">
                    <h2>{t("messaging.groupDiscussion")}</h2>
                    {/* Removing Search function for now - not many channels and need space for the 
                    site messaging
                    <SearchBar handleChange={handleSearch} placeholder={t("messaging.search")} /> */}
                    <Channels channels={publicChannels} />
                </div>
            </div>
                :
                <>
                 <OverTopBar handleBack={handleBackFromChannel} title={messagingStore.selectedChannel.isCoordinatorChannel ? t("userTypes.coordinator") : messagingStore.selectedChannel.title} />
                <Div100vh className={classes.singleChannelContainer}>
                    <Channel
                        isPrivate={messagingStore.selectedChannel.isCoordinatorChannel}
                        userID={patientStore.id}
                        selectedChannel={messagingStore.selectedChannel}
                        handleBack={handleBackFromChannel}
                        userID={patientStore.userID} />
                </Div100vh>
                </>}

        </div>
    )

});

const Channels = observer((props) => {
    const classes = useStyles();
    const { messagingStore, uiStore } = useStores();
    const { t, i18n } = useTranslation('translation');

    let channels = "";
    if (props.channels.length > 0) {
        channels = props.channels.map((channel) => {

            return <ChannelPreview
                isSiteChannel={props.isSiteChannel}
                private={props.private}
                key={`channel${channel.id}`}
                title={props.private ? `${t("userTypes.coordinator")}` : channel.title}
                subtitle={channel.subtitle}
                time={DateTime.fromISO(channel.lastMessageTime).toLocaleString(DateTime.DATETIME_24_SIMPLE)}
                unread={messagingStore.unreadInfo[channel.id] ? messagingStore.unreadInfo[channel.id].unreadMessages : 0}
                onClick={() => {
                    if (props.private && !props.isSiteChannel) {
                        messagingStore.selectedChannel.isCoordinatorChannel = true;
                    }

                    messagingStore.selectedChannel.creator = channel.userId
                    messagingStore.selectedChannel.id = channel.id
                    messagingStore.selectedChannel.title = channel.title
                    messagingStore.getSelectedChannel();
                    uiStore.goToSpecificChannel(channel.id);
                }}
            />
        })
    } else {
        channels = <p className={classes.errorMessage}>No Topics Found</p>
    }

    return (
        <>{channels}</>
    )
});

const MessagingWithOfflineOverride = () => {
    
    const {t} = useTranslation('translation');
    
    return(
        <PreventOffline type={t('patient.tabNames.messaging')}>
            <Messaging />
        </PreventOffline>
    )
}


export default MessagingWithOfflineOverride;