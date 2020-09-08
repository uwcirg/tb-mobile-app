import React from 'react'
import Colors from '../Basics/Colors'
import { makeStyles } from '@material-ui/core/styles';
import { DateTime } from 'luxon';

const useStyles = makeStyles({

    messageContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column"
    },
    timestamp: {
        position: "absolute",
        bottom: 0,
        color: "gray",
        fontSize: ".6em",
        bottom: "-20px",
        width: "50vw"
    },
    message: {
        padding: ".7em",
        maxWidth: "75%",
        position: "relative",
        fontSize: ".85em",
        borderRadius: "10px",
        marginBottom: "2px"
    },
    myMessage: {
        backgroundColor: Colors.messageBlue,
        alignSelf: "flex-end",
        marginRight: "5px",
        color: "white"

    },
    myTimestamp: {
        right: "10px",
        textAlign: "right"
    },
    otherMessage: {
        backgroundColor: Colors.lightgray,
        alignSelf: "flex-start",
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
        width: "100%",
        textAlign: props => props.isUser ? "right" : "left",
        marginTop: ".5em"
    }

})

const Message = (props) => {

    const classes = useStyles({isUser: props.isUser});

    const processTime = (time) => {
        return (DateTime.fromISO(time).toLocaleString(DateTime.TIME_24_SIMPLE))
    }

    return (<div className={classes.messageContainer}>

        <div key={props.message.id} className={`${classes.message} ${props.isUser ? classes.myMessage : classes.otherMessage}`}>
           {/* <div className={props.isUser ? classes.myTriangle : classes.triangle}></div> */}
            {props.message.body}
            <span className={classes.time}>{processTime(props.message.created_at)}</span>
            {/*
            <div className={`${classes.timestamp} ${props.isUser ? classes.myTimestamp : ""}`}>
                <p>
                    <span className={classes.username}>{props.username ? props.username : "user" }</span> at {processTime(props.message.created_at)}
                </p>
            </div>
            */}
        </div>

    </div>)

}

export default Message;