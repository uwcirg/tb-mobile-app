import React, { useEffect,useState } from 'react';
import Paper from '@material-ui/core/Paper'
import ChevronRight from '@material-ui/icons/ChevronRight'
import WarningIcon from '@material-ui/icons/Warning';
import Channel from './Channel';
import ChannelPreview from './ChannelPreview'
import { DateTime } from 'luxon'
import useStores from '../Basics/UseStores';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import OverTopBar from '../Patient/Navigation/OverTopBar';
import SearchBar from '../Basics/SearchBar';

const useStyles = makeStyles({
    root: {
        "& > div > h2": {
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
    errorMessage:{
        width: "100%",
        textAlign: "center"
    }

});

const Messaging = observer(() => {

    const { t, i18n } = useTranslation('translation');
    const { messagingStore, patientStore } = useStores();
    const classes = useStyles();
    const [search,setSearch] = useState("");


    const handleSearch = (e) => {
        setSearch(e.target.value)
    }


    const publicChannels = (messagingStore.channels.length > 0) ? messagingStore.channels.filter((channel) => { 
        return (!channel.isPrivate && channel.title.toLowerCase().includes(search)) 
    }) : [];
    const coordinatorChannel = (messagingStore.channels.length > 0) ? [messagingStore.channels.find((channel) => { return (channel.isPrivate) })] : [];

    useEffect(() => messagingStore.getChannels(), []);

    return (
        <div className={classes.root}>
            
            {messagingStore.selectedChannel === 0 ? <div>
                <h2>Private Chat</h2>
                <Channels private channels={coordinatorChannel} />
                <h2>Patient Discussion</h2>
                <SearchBar handleChange={handleSearch} placeholder={t("messaging.search")} />
                <Channels channels={publicChannels} />
                </div>:
                <Channel isPersonalChannel={patientStore.userID == messagingStore.selectedChannelCreator}
                    userID={patientStore.userID} />}
        </div>
    )

});

const Channels = (props) => {
    const classes = useStyles();
    const { messagingStore } = useStores();

    let channels = "";
    if (props.channels.length > 0) {
        channels = props.channels.map((channel) => {
            
            return <ChannelPreview
                private={props.private}
                key={`channel${channel.id}`}
                title={channel.title}
                subtitle={channel.subtitle}
                time={DateTime.fromISO(channel.lastMessageTime).toLocaleString(DateTime.DATETIME_24_SIMPLE)}
                unread={channel.unreadMessages}
                onClick={() => {
                    messagingStore.selectedChannelInfo.creator = channel.userId
                    messagingStore.selectedChannel = channel.id
                    messagingStore.selectedChannelInfo.title = channel.title
                    messagingStore.getSelectedChannel();
                }}
            />
        })
    }else{
        channels = <p className={classes.errorMessage}>No Topics Found</p>
    }


    return (
        <>{channels}</>
    )
}


export default Messaging;