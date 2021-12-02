import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NewButton from '../../Basics/NewButton';
import Colors from '../../Basics/Colors';

const useStyles = makeStyles({
        button: {
            margin: 0,
            backgroundColor: props => props.backgroundColor,
            border: "none",
            color: props => props.color || Colors.textDarkGray,
            width: "100%",
            fontSize: "1em",
            borderRadius: "5px",
            "& p:first-of-type, & svg:first-of-type": {
                fontWeight: "bold",
                padding: ".25em .5em",
                margin: "0"
            },
            "& span": {
                margin: "0 .5em",
            },
            "& svg:last-of-type":{
                padding: 0
            }
        },
})

const ActionButton = ({text, icon, backgroundColor, onClick, color}) => {

    const classes = useStyles({backgroundColor: backgroundColor, color: color});

    return( <NewButton onClick={onClick} style={{backgroundColor: backgroundColor}} className={classes.button} text={text} icon={icon} />)

}

export default ActionButton;