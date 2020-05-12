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
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        backgroundColor: "white",
        "& > div:last-of-type":{
            marginBottom: "100px"
        }

    },
    container:{
        height: "100%",
        width: "100%",
        position: "relative"
    },
    test: {
        height: "40px",
        width: "100%",
        backgroundColor: "lightblue",
        position: "absolute",
        bottom: "0"
    }

});

const Channel = observer((props) => {
    const classes = useStyles();
    const { messagingStore } = useStores();

    let messages = [];
    if (props.selectedChannel.messages &&
        props.selectedChannel.messages.length > 0) {
        messages = messagingStore.selectedChannelMessages.map( (message, index) => {
            const isUser = props.userID === message.user_id;
            return <Message username={`${message.user_id}`} key={`message ${index}`} message={message} isUser={isUser} />
        })

        messages.push(<ScrollRef key={'message -1'}/>)
    }

    return (
        <div className={classes.container}>
            <div className={classes.messageList}>
                {messages}
            </div>
            <div className={classes.test}></div>
        </div>
    )
});

export default Channel;