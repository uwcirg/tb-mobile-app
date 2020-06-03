import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../../Basics/Colors';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton'


const useStyles = makeStyles({
    superContainer: {
        borderRadius: "1em",
        backgroundColor: Colors.lightgray,
        width: "90%",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25);",
        overflow: "hidden"
    },
    header: {
        display: "flex",
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
    collapse: {
        marginLeft: "auto",
        marginRight: ".5em",
        fontSize: "2em"
    }

})

const Card = (props) => {

    const classes = useStyles();
    const [visible, setVisible] = useState(true);

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (<div className={classes.superContainer}>
        <div className={classes.header}>
            {props.icon}
            <h2>{props.title}</h2>
            <IconButton className={classes.collapse} onClick={toggleVisibility}>{visible ? <DownIcon /> : <UpIcon />}</IconButton>
        </div>
        {visible && props.children}
    </div>)

}

export default Card;