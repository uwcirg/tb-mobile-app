import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Colors from '../Basics/Colors';
import { observer } from 'mobx-react';
import useStores from '../Basics/UseStores';
import OverTopBar from '../Patient/Navigation/OverTopBar';
import MessageInput from './MessageInput';
import ScrollRef from '../Basics/ScrollRef'
import Message from './Message';
import { DateTime } from 'luxon'

const useStyles = makeStyles({
    messageList: {
        margin: "auto",
        width: "90%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        overflowX: "hidden",
        backgroundColor: "white",
        "& > div:last-of-type": {
            marginBottom: "100px"
        }

    },
    container: {
        height: "100%",
        position: "relative",
        overflowX: "hidden"
    },
    input: {
        width: "100%",
        backgroundColor: "lightblue",
        position: "absolute",
        bottom: "0",
    },
    dateSeperator: {
        width: "100%",
        textAlign: "center",
        fontSize: ".75em",
        color: Colors.textGray
    }

});

const Channel = observer((props) => {
    const classes = useStyles();
    const { messagingStore, uiStore } = useStores();

    useEffect(() => {
        messagingStore.selectedChannel.id = uiStore.pathNumber;
        messagingStore.getSelectedChannel()

    }, [uiStore.pathNumber])

    let messages = [];
    let date = ""

    if (messagingStore.selectedChannel.messages &&
        messagingStore.selectedChannel.messages.length > 0) {

        messages = messagingStore.selectedChannelMessages.map((message, index) => {
            let isNewDate = false;
            if (DateTime.fromISO(message.created_at).toISODate() !== date) {
                date = DateTime.fromISO(message.created_at).toISODate()
                isNewDate = true;
            }
            const isUser = props.userID === message.user_id;
            return <>
                {isNewDate && <h2 className={classes.dateSeperator}>{DateTime.fromISO(date).toLocaleString(DateTime.DATE_HUGE)}</h2>}
                <Message username={`${message.user_id}`} key={`message ${index}`} message={message} isUser={isUser} />
            </>
        })

        messages.push(<ScrollRef key={'message -1'} />)
    }

    return (
        <div className={classes.container}>
            <div className={classes.messageList}>
                {messages}
            </div>
            <div className={classes.input}>
                <MessageInput value={messagingStore.newMessage}
                    setValue={(value) => { messagingStore.newMessage = value }}
                    disableSend={messagingStore.newMessage == ""}
                    handleSend={messagingStore.sendMessage} />
            </div>
        </div>
    )
});

export default Channel;