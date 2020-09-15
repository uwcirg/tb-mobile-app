import React, { useState } from 'react'
import Colors from '../Basics/Colors'
import { makeStyles } from '@material-ui/core/styles';
import { DateTime } from 'luxon';

const useStyles = makeStyles({

    messageContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column"
    },
    message: {
        padding: ".7em",
        maxWidth: "75%",
        position: "relative",
        fontSize: ".85em",
        borderRadius: "10px",
        marginBottom: "2px",
        overflowWrap: "break-word"
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
        margin: ".5em 0 .5em 0"
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
        textAlign: "right",
        marginTop: ".5em"
    },
    messageImage:{
        height: props => props.imageLoaded? "unset" : "300px",
        maxWidth: "100%",
        maxHeight: "300px",
        objectFit: "contain"
    }

})

const Message = (props) => {

    const [imageLoaded,setImageLoaded] = useState(false)
    const classes = useStyles({ isUser: props.isUser, imageLoaded: imageLoaded });

    const processTime = (time) => {
        return (DateTime.fromISO(time).toLocaleString(DateTime.TIME_24_SIMPLE))
    }

    return (<div className={classes.messageContainer}>

        <div key={props.message.id} className={`${classes.message} ${props.isUser ? classes.myMessage : classes.otherMessage}`}>
            {props.message.photoUrl && <>
            <img onLoad={()=>{setImageLoaded(true)}} className={classes.messageImage} src={props.message.photoUrl} />
            <br />
            </>
            }
            {props.message.body}
            <span className={classes.time}>{processTime(props.message.createdAt)}</span>
        </div>

    </div>)

}

export default Message;