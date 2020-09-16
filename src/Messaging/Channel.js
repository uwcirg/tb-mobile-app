import React, { useRef, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Colors from '../Basics/Colors';
import { observer } from 'mobx-react';
import useStores from '../Basics/UseStores';
import MessageInput from './MessageInput';
import Message from './Message';
import { DateTime } from 'luxon';
import IconButton from '@material-ui/core/IconButton'
import Clear from '@material-ui/icons/Clear'

const useStyles = makeStyles({
    messageList: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        overflowX: "hidden",
        padding: "1em .5em 1em .5em",
        backgroundColor: "white"

    },
    inputContainer: {
        width: "100%",
        flexBasis: props => props.open ? "85px" : "70px",
        marginBottom: "1em"
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
    }

});

function useOnScreen(ref, rootMargin = '0px') {
    // State and setter for storing whether element is visible
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Update our state when observer callback fires
                setIntersecting(entry.isIntersecting);
            },
            {
                rootMargin
            }
        );
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            observer.unobserve(ref.current);
        };
    }, []); // Empty array ensures that effect is only run on mount and unmount

    return isIntersecting;
}

const ImagePreview = observer((props) => {
    const { messagingStore } = useStores();
    const classes = useStyles();

    return (
        <div className={classes.imagePopover}>
            <div className={classes.imagePreviewButton}>
                <IconButton onClick={messagingStore.toggleImagePreview}>
                    <Clear />
                </IconButton>
            </div>
            <img src={messagingStore.file} />
        </div>

    )
})

const Channel = observer((props) => {
    const classes = useStyles();
    const { messagingStore } = useStores();
    const { t, i18n } = useTranslation('translation');

    return (
        <div className={classes.combined}>
            <MessageList isCoordinator={props.isCoordinator} selectedChannel={props.selectedChannel} userID={props.userID} />
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
    const { t, i18n } = useTranslation('translation');

    const messagesEndRef = useRef(null)
    const onScreen = useOnScreen(messagesEndRef, "10%")

    const scrollToBottom = () => {
        if (!onScreen) {
            messagesEndRef.current.scrollIntoView()
        }

    }

    useEffect(() => {
        if(messagingStore.selectedChannelMessages.length > 0){
            scrollToBottom()
        }
    });

    let messages = [];

    if (props.selectedChannel.messages &&
        props.selectedChannel.messages.length > 0) {
        let date = ""
        messages = messagingStore.selectedChannelMessages.map((message, index) => {

            let isNewDate = false;
            const isUser = props.userID === message.userId;
            const previousMessage = index > 0 && messagingStore.selectedChannelMessages[index - 1]
            const nextMessage = messagingStore.selectedChannelMessages.length > index + 1 && messagingStore.selectedChannelMessages[index + 1]
            const isMiddle = (previousMessage && previousMessage.userId === message.userId && DateTime.fromISO(previousMessage.createdAt).toISODate() === DateTime.fromISO(message.createdAt).toISODate()) && (nextMessage && nextMessage.userId === message.userId && DateTime.fromISO(nextMessage.createdAt).toISODate() === DateTime.fromISO(message.createdAt).toISODate())

            if (DateTime.fromISO(message.createdAt).toISODate() !== date) {
                date = DateTime.fromISO(message.createdAt).toISODate()
                isNewDate = true;
            }
            return (
                <>
                    {isNewDate && <h2 className={classes.dateSeperator}>{DateTime.fromISO(date).toLocaleString(DateTime.DATE_HUGE)}</h2>}
                    <Message 
                        hide={() => {messagingStore.hideMessage(message.id)}}
                        isCoordinator={props.isCoordinator}
                        isMiddle={isMiddle}
                        key={`message ${index}`}
                        message={message}
                        isUser={isUser} />
                </>
            )
        })
        messages.unshift(<p className={classes.dateSeperator}>{t("messaging.begining")}</p>)
    }

    return (
        <div className={classes.messageList}>
            {messages}
            <div ref={messagesEndRef} />
        </div>
    )
})

export default Channel;