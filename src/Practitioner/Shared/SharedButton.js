import React from 'react'
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores'
import ClearIcon from '@material-ui/icons/Clear';
import ButtonBase from '@material-ui/core/ButtonBase';
import CheckIcon from '@material-ui/icons/Check'
import Colors from '../../Basics/Colors';

const useStyles = makeStyles({
    button: {
        flexDirection: "flex-start",
        display: "flex",
        backgroundColor: props =>  props.color,
        borderRadius: "10px",
        minWidth: "35%",
        height: "50px",
        justifyContent: "flex-start",
        color: "white",
        fontSize: "1em",
        alignContent: "center",
        justifyContent: "flex-start",
        padding: "0 5px 0 5px"
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
        <ButtonBase className={classes.button}>
            <div className={classes.icon}>{props.icon ? props.icon :  <CheckIcon />}</div>
            <div className={classes.text}>{props.text ? props.text : "Button"}</div>
        </ButtonBase>
    )
}


export default SharedButton;