import React from 'react'
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores'
import ClearIcon from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check'
import Colors from '../../Basics/Colors';

const useStyles = makeStyles({
    button: {
        flexDirection: "row",
        display: "flex",
        backgroundColor: props =>  props.color,
        borderRadius: "10px", 
        width: "100%",
        textTransform: "capitalize",
        padding: "1em",
        color:"white"
    },
    text:{
       marginLeft: "5px"
    },
    icon:{
        marginLeft: "5px",
        "& > svg":{
            fontSize: "1em"
        }
    }
})

const SharedButton = (props) => {
    const styleProps = {color: props.color? props.color : Colors.buttonBlue}
    const classes = useStyles(styleProps);

    const { practitionerStore } = useStores();

    return (
        <Button className={`${classes.button} ${props.className}`} onClick={props.onClick}>
            <div className={classes.icon}>{props.icon ? props.icon :  <CheckIcon />}</div>
            <div className={classes.text}>{props.text ? props.text : "Button"}</div>
        </Button>
    )
}


export default SharedButton;