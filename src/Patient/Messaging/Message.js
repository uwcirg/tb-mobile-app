import React from 'react'
import Colors from '../../Basics/Colors'
import { makeStyles } from '@material-ui/core/styles';
import { DateTime } from 'luxon';

const useStyles = makeStyles({

    messageContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        margin: '.5em'
    },
    timestamp: {
        position: "absolute",
        bottom: 0,
        color: "gray",
        fontSize: ".2em",
        bottom: "-20px",
        width: "100vw"
    },
    message: {
        padding: ".75em",
        margin: ".5em 0 .5em 0",
        maxWidth: "75%",
        position: "relative",
        fontSize: ".85em",
    },
    myMessage: {
        borderRadius: "15px 15px 0 15px",
        backgroundColor: Colors.blue,
        alignSelf: "flex-end",
        marginRight: "5px",
        color: "white"
    },
    myTimestamp: {
        right: "10px",
        textAlign: "right"
    },
    otherMessage: {
        borderRadius: "0px 15px 15px 15px",
        backgroundColor: Colors.lightgray,
        alignSelf: "flex-start"
    },
    triangle: {
        position: "absolute",
        width: 0,
        height: 0,
        borderLeft: "0px solid transparent",
        borderRight: "10px solid transparent",
        borderBottom: `10px solid ${Colors.lightgray}`,
        top: "-8px",
        left: "0"
    },
    myTriangle: {
        position: "absolute",
        width: 0,
        height: 0,
        borderRight: "0px solid transparent",
        borderLeft: "10px solid transparent",
        borderTop: `10px solid ${Colors.blue}`,
        bottom: "-8px",
        right: "0"
    },
    username: {
        color: "black"
    }
  
})

const Message = (props) => {

    const classes = useStyles();

    const processTime = (time) => {
        return(DateTime.fromISO(time).toLocaleString(DateTime.DATETIME_SHORT))
    }

    return(<div className={classes.messageContainer}>
                
        <div key={props.message.id} className={`${classes.message} ${props.isUser ? classes.myMessage : classes.otherMessage}`}>
            <div className={props.isUser ? classes.myTriangle: classes.triangle}></div>
            {props.message.body} z
            <div className={`${classes.timestamp} ${props.isUser ? classes.myTimestamp: ""}`}><p><span className={classes.username}>username</span> at {processTime(props.message.created_at)}</p></div>
        </div>
       
    </div>)

}

export default Message;