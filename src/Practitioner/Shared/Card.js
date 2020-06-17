import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../../Basics/Colors';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton'


const useStyles = makeStyles({
    superContainer: {
        borderRadius: "1em",
        backgroundColor: "white",
        width: "90%",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25);",
        paddingBottom: ".5em"
    },
    header: {
        display: "flex",
        borderRadius: "1em 1em 0 0",
        backgroundColor: Colors.lightgray,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: ".5em 0 .5em .5em",
        "& > h2": {
            margin: 0,
            padding: 0,
            fontSize: "1.25em",
            marginLeft: ".5em"
        }
    },
    collapse: props => ({
        marginLeft: props.headerChildren ? "" : "auto",
        marginRight: ".5em",
        fontSize: "2em"
    })

})

const Card = (props) => {

    const classes = useStyles(props);
    const [visible, setVisible] = useState(true);

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (<div className={`${classes.superContainer} ${props.className} `}>
        <div className={classes.header}>
            {props.icon}
            <h2>{props.title}</h2>
            {props.headerChildren}
            <IconButton className={classes.collapse} onClick={toggleVisibility}>{visible ? <DownIcon /> : <UpIcon />}</IconButton>
        </div>
        <div className={props.bodyClassName}>
        {visible && props.children}
        </div>
    </div>)

}

export default Card;