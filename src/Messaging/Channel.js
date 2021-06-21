import React, { useRef, useEffect, useState, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Colors from '../Basics/Colors';
import { observer } from 'mobx-react';
import useStores from '../Basics/UseStores';
import MessageInput from './MessageInput';
import Message from './Message';
import { DateTime } from 'luxon';
import useOnScreen from '../Hooks/OnScreen'

const Channel = observer((props) => {
    const classes = useStyles();
    const { messagingStore, uiStore } = useStores();

    useEffect(() => {
        if (!messagingStore.selectedChannel.id) {
            messagingStore.fetchChannel(uiStore.pathNumber);
        }

    }, [uiStore.pathNumber])


    return (
        <div className={classes.combined}>
            <MessageList isPrivate={props.isPrivate} isCoordinator={props.isCoordinator} selectedChannel={props.selectedChannel} userID={props.userID} />
            <div className={classes.inputContainer}>
                <MessageInput value={messagingStore.newMessage}
                    setValue={(value) => { messagingStore.newMessage = value }}
                    disableSend={messagingStore.newMessage === "" && messagingStore.file === ""}
                    handleSend={messagingStore.uploadFileAndSendMessage}
                />
            </div>
        </div>
    )
});

const MessageList = observer((props) => {

    const classes = useStyles();
    const { messagingStore } = useStores();
    const { t } = useTranslation('translation');
    const messagesEndRef = useRef(null)
    const loadMoreRef = useRef(null)
    const newestMessageRef = useRef(null)
    const containerElement = useRef(null)

    const onScreen = useOnScreen(loadMoreRef);

    let messages = [];

    const scrollToBottom = () => {
        if (messagingStore.selectedChannel.firstLoad) {
            messagesEndRef.current.scrollIntoView()
        }
    }

    if (props.selectedChannel.messages &&
        props.selectedChannel.messages.length > 0) {
        let date = ""
        messages = messagingStore.selectedChannelMessages.map((message, index) => {

            let isNewDate = false;
            const isUser = props.userID === message.userId;
            const previousMessage = index > 0 && messagingStore.selectedChannelMessages[index - 1]
            const nextMessage = messagingStore.selectedChannelMessages.length > index + 1 && messagingStore.selectedChannelMessages[index + 1]
            const isMiddle = (
                previousMessage && previousMessage.userId === message.userId &&
                DateTime.fromISO(previousMessage.createdAt).toISODate() === DateTime.fromISO(message.createdAt).toISODate()) &&
                (nextMessage && nextMessage.userId === message.userId &&
                    DateTime.fromISO(nextMessage.createdAt).toISODate() === DateTime.fromISO(message.createdAt).toISODate()
                )

            if (DateTime.fromISO(message.createdAt).toISODate() !== date) {
                date = DateTime.fromISO(message.createdAt).toISODate()
                isNewDate = true;
            }
            return (
                <Fragment key={`message-fragment-${index}`} >
                     {message.id === messagingStore.selectedChannel.firstNewMessageId && <div ref={newestMessageRef}>New</div>}
                    {isNewDate && <h2 key={`date-${index}`} className={classes.dateSeperator}>{DateTime.fromISO(date).toLocaleString(DateTime.DATE_HUGE)}</h2>}
                    <Message
                        scrollToBottom={scrollToBottom}
                        isLast={index === props.selectedChannel.messages.length - 1}
                        hide={() => { messagingStore.setMessageHidden(message.id, true) }}
                        unhide={() => { messagingStore.setMessageHidden(message.id, false) }}
                        isCoordinator={props.isCoordinator}
                        isPrivate={props.isPrivate}
                        isMiddle={isMiddle}
                        key={`message-${index}`}
                        message={message}
                        isUser={isUser} 
                        
                        />
                </Fragment>
            )
        })
        // messages.unshift(<div ref={topRef} />)
        messages.unshift(<p key={`messages-begining`} className={classes.dateSeperator}>{t("messaging.begining")}</p>)
    
    }

    useEffect(() => {
        console.log("changed channel ")
        scrollToBottom();
    }, [messagingStore.selectedChannel.id])

    useEffect(() => {
        console.log("On screen change " + onScreen)
        if (messages.length > 0 && onScreen) {
            messagingStore.getOlderMessages().then( (newMessages) => {
                if(newMessages && newMessages.length > 0){
                    newestMessageRef.current.scrollIntoView();
                }
            })


        }

    }, [onScreen])

    return (
        <div ref={containerElement} className={classes.messageList} style={{ marginTop: props.isCoordinator ? 0 : "60px" }}>
            {/* style={{ backgroundColor: "red", height: "10px", width: "100%", margin: "0 0" }} */}
            <div ref={loadMoreRef} style={{height: "1px",width: "1px"}}>{" "}</div>
            {messages.length > 0 ? <>{messages}</> : <p className={classes.empty}>{t("messaging.empty")}</p>}
            <div ref={messagesEndRef} />
        </div>
    )
})

const useStyles = makeStyles({
    messageList: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "scroll",
        padding: "1em .5em 1em .5em",
        backgroundColor: "white"

    },
    inputContainer: {
        width: "100%",
        flexBasis: props => props.open ? "85px" : "70px",
        marginBottom: ".5em"
    },
    dateSeperator: {
        width: "100%",
        textAlign: "center",
        fontSize: ".75em !important",
        color: Colors.textGray
    },
    combined: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
    },
    imagePopover: {
        position: "fixed",
        zIndex: "100 !important",
        backgroundColor: "rgba(0,0,0,.5)",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        "& > img": {
            width: "100%",
            height: "100%",
            objectFit: "contain",
        }
    },
    imagePreviewButton: {
        width: "100%",
        display: "flex",
        flexDirection: "row-reverse",
        "& > button > svg": {
            color: "white"
        }
    },
    empty: {
        width: "100%",
        margin: "auto",
        textAlign: "center",
        color: Colors.textGray
    }

});

export default Channel;