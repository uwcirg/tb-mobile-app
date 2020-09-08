import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Colors from '../Basics/Colors';
import { observer } from 'mobx-react';
import useStores from '../Basics/UseStores';
import OverTopBar from '../Patient/Navigation/OverTopBar';
import MessageInput from './MessageInput';
import ScrollRef from '../Basics/ScrollRef'
import Message from './Message';
import { DateTime } from 'luxon';

const useStyles = makeStyles({
    messageList: {
        marginBottom: "100px",
        margin: ".5em",
        display: "flex",
        flexDirection: "column"

    },
    inputContainer: {
        position: "fixed",
        bottom: "0px",
        zIndex: "100",
        width: "100%"
    },
    dateSeperator:{
        width: "100%",
        textAlign: "center",
        fontSize: ".75em",
        color: Colors.textGray
    }

});

const Channel = observer((props) => {
    const classes = useStyles();
    const { messagingStore } = useStores();
    const { t, i18n } = useTranslation('translation');


    let messages = [];

    if (props.selectedChannel.messages &&
        props.selectedChannel.messages.length > 0) {
        let date = ""
        
        messages = messagingStore.selectedChannelMessages.map((message, index) => {

            let isNewDate = false;
            const isUser = props.userID === message.user_id;
            const previousMessage = messagingStore.selectedChannelMessages[index-1]
            const nextMessage = messagingStore.selectedChannelMessages[index+1]
            const isMiddle = (previousMessage && previousMessage.user_id  === message.user_id && DateTime.fromISO(previousMessage.created_at).toISODate() === DateTime.fromISO(message.created_at).toISODate()) && (nextMessage && nextMessage.user_id === message.user_id && DateTime.fromISO(nextMessage.created_at).toISODate() === DateTime.fromISO(message.created_at).toISODate())

            if(DateTime.fromISO(message.created_at).toISODate() !== date){
                date = DateTime.fromISO(message.created_at).toISODate()
                isNewDate = true;
            }
            return (
                <>
                    {isNewDate && <h2 className={classes.dateSeperator}>{DateTime.fromISO(date).toLocaleString(DateTime.DATE_HUGE)}</h2>}
                    <Message isMiddle={isMiddle} key={`message ${index}`} message={message} isUser={isUser} />
                </>
            )
        })
        messages.unshift(<p className={classes.dateSeperator}>{t("messaging.begining")}</p>)
        messages.push(<ScrollRef key={'message -1'} />)
    }

    return (
        <>
            <OverTopBar altColor={props.isPersonalChannel} handleBack={props.handleBack} title={props.isCoordinatorChannel ? t("userTypes.coordinator") : props.selectedChannel.title} />
            <div className={classes.messageList}>
                {messages}
            </div>
            <div className={classes.inputContainer}>
                <MessageInput value={messagingStore.newMessage}
                    setValue={(value) => { messagingStore.newMessage = value }}
                    disableSend={messagingStore.newMessage == ""}
                    handleSend={messagingStore.sendMessage}
                />
            </div>
        </>
    )
});

export default Channel;