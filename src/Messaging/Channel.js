import React, { useRef, useEffect, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Colors from '../Basics/Colors';
import { observer } from 'mobx-react';
import useStores from '../Basics/UseStores';
import MessageInput from './MessageInput';
import Message from './Message';
import { DateTime } from 'luxon';
import ClickableText from '../Basics/ClickableText';
import HistoryIcon from '@material-ui/icons/History';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    const newestMessageRef = useRef(null)

    let messages = [];

    const scrollToBottom = () => {
        if (messagingStore.selectedChannel.firstLoad) {
            messagesEndRef.current.scrollIntoView();
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
                    {message.id === messagingStore.selectedChannel.firstMessageId && <p key={`messages-begining`} className={classes.dateSeperator}>{t("messaging.begining")}</p>}
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
                    {message.id === messagingStore.selectedChannel.firstNewMessageId && <div className={classes.newLoadingPlaceholder} ref={newestMessageRef}></div>}
                </Fragment>
            )
        })
    }

    useEffect(() => {
        scrollToBottom();
    }, [messagingStore.selectedChannel.id])

    useEffect(() => {
        messagingStore.initalizeChannel();
    }, [messagingStore.selectedChannel.id])

    return (
        <div className={classes.messageList} style={{ marginTop: props.isCoordinator ? 0 : "60px" }}>
            <TopOfChannelDetails newestMessageRef={newestMessageRef} />
            {messages.length > 0 ? <>{messages}</> : <p className={classes.empty}>{t("messaging.empty")}</p>}
            <div ref={messagesEndRef} />
        </div>
    )
})

const TopOfChannelDetails = observer(({newestMessageRef}) => {
    const classes = useStyles();
    const { messagingStore } = useStores();
    const { t } = useTranslation('translation');

    const getOldMessages = () => {
        messagingStore.getOlderMessages().then((newMessagesLength) => {
            if (newMessagesLength > 0) {
                newestMessageRef.current.scrollIntoView({behavior: "smooth", block: "end"});
            }
        })
    }

    return (
        <>
            {!messagingStore.selectedChannel.olderMessagesLoading && !messagingStore.allMessagesLoaded && <ClickableText icon={<HistoryIcon />} onClick={getOldMessages} text={t('messaging.loadMore')} />}
            {messagingStore.selectedChannel.olderMessagesLoading && <CircularProgress className={classes.loadingCircle} variant="indeterminate" />}
        </>
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
    },
    newLoadingPlaceholder: {
        width: "100%",
        height: "2px",
        margin: "2px 0",
        borderBottom: "dashed 1px lightgray"
    },
    loadingCircle: {
        margin: "auto"
    }

});

export default Channel;