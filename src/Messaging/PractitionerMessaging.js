import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper'
import ChevronRight from '@material-ui/icons/ChevronRight'
import WarningIcon from '@material-ui/icons/Warning';
import Channel from './PractitionerChannel';
import ChannelPreview from './ChannelPreview'
import { DateTime } from 'luxon'
import useStores from '../Basics/UseStores';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { observer, autorun } from 'mobx-react';
import OverTopBar from '../Patient/Navigation/OverTopBar';
import SearchBar from '../Basics/SearchBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Styles from '../Basics/Styles';

const useStyles = makeStyles({
    superContainer:{
        display: "flex"
    },
    container: {
        display: "flex",
        flexDirection: "column",
        width: "300px",
        backgroundColor: "white",
        height: "100vh",
    },
    channelList: {
        height: "auto",
        overflowY: "scroll",
        overflowX: "hidden",
        "& > h2": {
            fontSize: "1.25em"
        },
    },
    header:{
        ...Styles.flexRow,
        margin: ".5em"
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
    channelContainer: {
        flexBasis: "40%",
        flexGrow: "1",
        height: "100vh",
    },
    tabs: {
        minWidth: "50px",
        width: "50%",
        padding: "0"
    },
    selectChannel: {
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    }

});

const Messaging = observer(() => {

    const { t, i18n } = useTranslation('translation');
    const { messagingStore, practitionerStore, uiStore } = useStores();

    const classes = useStyles();
    const [search, setSearch] = useState("");
    const [patientSearch, setPatientSearch] = useState("");
    const [tab, setTab] = useState(0);

    //Get unread every time this rerenders
    useEffect(() => {
        messagingStore.getUnreadMessages();
    }, [uiStore.onSpecificChannel])

    //Only get channels on the first render
    useEffect(() => {
        messagingStore.getChannels();
    }, [])

    const handleBackFromChannel = () => {
        uiStore.goToMessaging();
        messagingStore.clearSelection();
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const handlePatientSearch = (e) => {
        setPatientSearch(e.target.value)
    }

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    const publicChannels = (messagingStore.channels.length > 0) ? messagingStore.channels.filter((channel) => {
        return (!channel.isPrivate && channel.title.toLowerCase().includes(search.toLowerCase()))
    }) : [];

    const coordinatorChannels = (messagingStore.channels.length > 0) ? messagingStore.channels.filter((channel) => { return (channel.isPrivate && channel.title.toLowerCase().includes(patientSearch.toLowerCase())) }) : [];

    return (
        <div className={classes.superContainer}>   
        <div className={classes.container}>                
        <Tabs
                    value={tab}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                    aria-label="message-type-tab"
                >
                    <Tab className={classes.tabs} label="Patients" />
                    <Tab className={classes.tabs} label="Public" />
                </Tabs>

                {tab === 0 ?
                    <div className={classes.header}>
                        <SearchBar kind={"patient"} handleChange={handlePatientSearch} placeholder={t("messaging.search")} />
                    </div> :
                     <div className={classes.header}>
                        <SearchBar kind={"discussion"} handleChange={handleSearch} placeholder={t("messaging.search")} />

                    </div>}
            <div className={classes.channelList}>
                {tab === 0 ? <Channels private channels={coordinatorChannels} /> : <Channels channels={publicChannels} /> }
            </div>
            </div>
            <div className={classes.channelContainer}>
                {uiStore.onSpecificChannel ?
                    <Channel
                        coordinatorView
                        userID={practitionerStore.userID}
                        selectedChannel={uiStore.pathNumber}
                        handleBack={handleBackFromChannel}
                    /> : <div className={classes.selectChannel}><h1> Select A Channel To Get Started</h1></div>
                }
            </div>
            </div>
        
    )

});


const Channels = observer((props) => {
    const classes = useStyles();
    const { messagingStore, uiStore, practitionerStore } = useStores();

    let channels = "";
    if (props.channels.length > 0) {
        channels = props.channels.map((channel) => {
            const title = (channel.isPrivate && practitionerStore.getPatient(channel.userId)) ? practitionerStore.getPatient(channel.userId).fullName : channel.title
            return <ChannelPreview
                selected={uiStore.pathNumber === channel.id}
                private={props.private}
                key={`channel${channel.id}`}
                title={title}
                subtitle={channel.subtitle}
                time={DateTime.fromISO(channel.lastMessageTime).toLocaleString(DateTime.DATETIME_24_SIMPLE)}
                unread={messagingStore.unreadInfo[channel.id] ? messagingStore.unreadInfo[channel.id].unreadMessages : 0}
                onClick={() => { uiStore.goToSpecificChannel(channel.id) }}
            />
        })
    } else {
        channels = <p className={classes.errorMessage}>No {!props.private ? "Topics" : "Patients"} Found</p>
    }


    return (
        <>{channels}</>
    )
});


export default Messaging;