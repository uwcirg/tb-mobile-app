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

const useStyles = makeStyles({
    messageList: {
        marginBottom: "100px",
        margin: ".5em",
        display: "flex",
        flexDirection: "column"

    },
    inputContainer:{
        position: "fixed",
        bottom: "0px",
        zIndex: "100",
        width: "100%"
    }

});

const Channel = observer((props) => {
    const classes = useStyles();
    const { messagingStore } = useStores();
    const { t, i18n } = useTranslation('translation');
    

    let messages = [];
    if (props.selectedChannel.messages &&
        props.selectedChannel.messages.length > 0) {
        messages = messagingStore.selectedChannelMessages.map( (message, index) => {
            const isUser = props.userID === message.user_id;
            return <Message key={`message ${index}`} message={message} isUser={isUser} />
        })

        messages.push(<ScrollRef  key={'message -1'}/>)
    }

    return (
        <>
            <OverTopBar altColor={props.isPersonalChannel} handleBack={props.handleBack} title={props.isCoordinatorChannel ? t("userTypes.coordinator") : props.selectedChannel.title } />
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