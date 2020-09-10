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
import { DateTime } from 'luxon';
import IconButton from '@material-ui/core/IconButton'
import Clear from '@material-ui/icons/Clear'

const useStyles = makeStyles({
    messageList: {
        marginTop: "60px",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
        overflowX: "hidden",
        padding: "1em .5em 1em .5em"

    },
    inputContainer: {
        width: "100%",
        flexBasis: props => props.open ? "85px" : "70px"
    },
    dateSeperator:{
        width: "100%",
        textAlign: "center",
        fontSize: ".75em !important",
        color: Colors.textGray
    },
    combined:{
        position: "fixed",
        top: 0,
        width: "100%",
        maxHeight: "100vh",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        zIndex: 2
    },
    imagePopover:{
        position: "fixed",
        zIndex: "100 !important",
        backgroundColor: "rgba(0,0,0,.5)",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        "& > img":{
            width: "100%",
            height: "100%",
            objectFit: "contain",
        }
    },
    imagePreviewButton:{
        width: "100%",
        display: "flex",
        flexDirection: "row-reverse",
        "& > button > svg":{
            color: "white"
        }
    }

});

const ImagePreview = observer((props) => {
    const {messagingStore} = useStores();
    const classes = useStyles();

    return(
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

    useEffect(()=>{
        messagingStore.getUploadUrl();
    },[])

    


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
            {messagingStore.showImagePreview && <ImagePreview />}
            <OverTopBar altColor={props.isPersonalChannel} handleBack={props.handleBack} title={props.isCoordinatorChannel ? t("userTypes.coordinator") : props.selectedChannel.title} />
            <div className={classes.combined}>
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
            </div>
        </>
    )
});

export default Channel;