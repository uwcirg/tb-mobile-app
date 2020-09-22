import React, { useState, useEffect } from 'react'
import Colors from '../Basics/Colors'
import { makeStyles } from '@material-ui/core/styles';
import { DateTime } from 'luxon';
import IconButton from '@material-ui/core/IconButton'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Visibility from '@material-ui/icons/Visibility';
import ToolTip from '@material-ui/core/Tooltip'
import ButtonBase from '@material-ui/core/Button';
import Down from '@material-ui/icons/KeyboardArrowDown'
import Up from '@material-ui/icons/KeyboardArrowUp'
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react'
import useStores from '../Basics/UseStores'

const useStyles = makeStyles({

    messageContainer: {
        flexShrink: 0,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        "& > div > .expand": {
            display: "none"
        },
        "&:hover": {
            "& > div > .expand": {
                display: "block",
                position: "absolute",
                top: 0,
                right: props => props.isUser ? "unset" : "-1.5em",
                left: props => props.isUser ? "-1.5em" : "unset",
            }
        }
    },
    message: {
        position: "relative",
        padding: ".7em",
        paddingBottom: "0",
        maxWidth: "75%",
        position: "relative",
        fontSize: ".85em",
        borderRadius: "8px",
        marginBottom: "2px",
        overflowWrap: "break-word"
    },
    myMessage: {
        backgroundColor: Colors.messageBlue,
        alignSelf: "flex-end",
        marginRight: "5px",
        color: "white"

    },
    otherMessage: {
        backgroundColor: Colors.lightgray,
        alignSelf: "flex-start",
        "& > span": {
            textAlign: "left"
        }
    },
    triangle: {
        position: "absolute",
        width: 0,
        height: 0,
        borderLeft: "0px solid transparent",
        borderRight: "10px solid transparent",
        borderBottom: `10px solid ${Colors.lightgray}`,
        top: "-10px",
        left: "0"
    },
    myTriangle: {
        position: "absolute",
        width: 0,
        height: 0,
        borderRight: "0px solid transparent",
        borderLeft: "10px solid transparent",
        borderTop: `10px solid ${Colors.messageBlue}`,
        bottom: "-10px",
        right: "0"
    },
    time: {
        display: "block",
        color: props => props.isUser ? "white" : "black",
        fontSize: ".5em",
        textAlign: "right",
        marginTop: ".5em",
        padding: "2px",
        width: "100%"
    },
    messageImage: {
        height: props => props.imageLoaded ? "unset" : "300px",
        maxWidth: "100%",
        maxHeight: "300px",
        objectFit: "contain"
    },
    hide: {
        fontSize: ".75em",
        color: Colors.textGray

    },
    moreButton: {
        padding: "5px"
    },
    bottomContent: {
        alignItems: "center",
        justifyContent: "flex-end",
        display: "flex"
    },
    expand: {
        color: Colors.buttonBlue,
        textTransform: "capitalize"
    },
    hidden: {
        fontSize: ".75em",
        color: Colors.textGray,
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    }

})

const Message = (props) => {

    const [imageLoaded, setImageLoaded] = useState(false)
    const classes = useStyles({ isUser: props.isUser, imageLoaded: imageLoaded });

    const processTime = (time) => {
        return (DateTime.fromISO(time).toLocaleString(DateTime.TIME_24_SIMPLE))
    }

    const toggleVisibility = () => {
        if (props.message.isHidden) {
            props.unhide()
        } else {
            props.hide()
        }
    }

    return (<div className={classes.messageContainer}>
        <div key={props.message.id} className={`${classes.message} ${props.isUser ? classes.myMessage : classes.otherMessage}`}>
            {props.message.photoUrl && <>
                <img onLoad={() => { setImageLoaded(true) }} className={classes.messageImage} src={props.message.photoUrl} />
                <br />
            </>}
            {props.message.body}
            <br />
            <span className={classes.time}>
                {!props.isPrivate && <SenderInfo type={props.message.userType} id={props.message.userId} />}
                 {processTime(props.message.createdAt)}
            </span>
            {props.isCoordinator && <ToolTip title={props.message.isHidden ? "Unhide" : "Hide from patients"}>
                <IconButton onClick={toggleVisibility} className={`expand ${classes.moreButton}`}>
                    {props.message.isHidden ? <Visibility className={classes.hide} /> : <VisibilityOffIcon className={classes.hide} />}
                </IconButton>
            </ToolTip>}
        </div>
    </div>)

}

const SenderInfo = (props) => {
    const { t, i18n } = useTranslation('translation');
    return (
        <>{props.type === "Practitioner" ? t('userTypes.coordinator') : <PatientName id={props.id} />} - </>
    )
}

const PatientName = observer((props) => {
    const { practitionerStore } = useStores();
    const patient = practitionerStore.getPatient(props.id);
    const { t, i18n } = useTranslation('translation');

    return (
        <>{patient ? patient.fullName : t('userTypes.patient')}</>
    )
})

const WrappedMessage = (props) => {

    const [showHidden, setShowHidden] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        if (props.isLast) {
            props.scrollToBottom();
        }
    }, [])

    if (!props.message.isHidden) {
        return <Message {...props} />
    }

    return (
        <>
            {props.isCoordinator &&
                <>
                    <div className={classes.hidden}>
                        <span>This message has been hidden from patients</span>
                        <ButtonBase className={classes.expand} onClick={() => { setShowHidden(!showHidden) }}>
                            {showHidden ? "Hide" : "View"}
                            {showHidden ? <Up /> : <Down />}
                        </ButtonBase>
                    </div>
                    {showHidden && <Message {...props} />}
                </>}


        </>
    )
}

export default WrappedMessage;