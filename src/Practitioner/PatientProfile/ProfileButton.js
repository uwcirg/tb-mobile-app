import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Colors from '../../Basics/Colors';

const useStyles = makeStyles({
    button: {
        padding: ".2em .5em .2em .5em",
        borderRadius: "4px",
        fontSize: ".875em",
        color: props => props.color || "white",
        backgroundColor: props => props.backgroundColor || Colors.buttonBlue,
        border: props => props.border ? `solid 2px ${props.color}` : "none",
        "& > span": {
            fontSize: "1em",
            textTransform: "capitalize",
            letterSpacing: ".15px"
        },
        "& > span  > svg": {
            fontSize: "1em",
            marginRight: ".5em"
        }
    }

})

const ProfileButton = (props) => {

    const classes = useStyles(props);

    return (<Button onClick={props.onClick} size="small" className={classes.button}>
        {props.children}
    </Button>)

}

export default ProfileButton;