import React, { useEffect } from 'react';
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

const useStyles = makeStyles({
    root: {
        "& > div > h2": {
            marginLeft: ".5em"
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
    }

});

const Messaging = observer(() => {

    const { t, i18n } = useTranslation('translation');
    const { messagingStore, patientStore } = useStores();
    const classes = useStyles();


    const publicChannels = (messagingStore.channels.length > 0) ? messagingStore.channels.filter((channel) => { return (!channel.is_private) }) : [];
    const coordinatorChannel = (messagingStore.channels.length > 0) ? [messagingStore.channels.find((channel) => { return (channel.is_private) })] : [];

    useEffect(() => messagingStore.getChannels(), []);

    return (
        <div className={classes.root}>
            {messagingStore.selectedChannel === 0 ? <div>
                <h2>Private Channels</h2>
                <Channels private channels={coordinatorChannel} />
                <h2>Public Discussion</h2>
                <Channels channels={publicChannels} />
                </div>:
                <Channel isPersonalChannel={patientStore.userID == messagingStore.selectedChannelCreator}
                    userID={patientStore.userID} />}
        </div>
    )

});

const Channels = (props) => {
    let channels = "";
    if (props.channels.length > 0) {
        channels = props.channels.map((channel) => {
            return <ChannelPreview
                private={props.private}
                key={`channel${channel.id}`}
                title={channel.title}
                subtitle={channel.subtitle}
                time={DateTime.fromISO(channel.updated_at).toLocaleString(DateTime.TIME_24_SIMPLE)}
                number={channel.unreadMessages}
                onClick={() => {
                    messagingStore.selectedChannelInfo.creator = channel.user_id
                    messagingStore.selectedChannel = channel.id
                    messagingStore.selectedChannelInfo.title = channel.title
                    messagingStore.getSelectedChannel();
                }}
            />
        })
    }


    return (
        <>{channels}</>
    )
}

export default Messaging;