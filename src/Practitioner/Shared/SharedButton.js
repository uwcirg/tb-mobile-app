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
        alignItems: "center",
        backgroundColor: props => props.color,
        borderRadius: "5px",
        width: "100%",
        textTransform: "capitalize",
        padding: "1em",
        color: "white",
        fontSize: "1em",
        lineHeight: "1.2em",
        "& > span > svg":{
            fontSize: ".95em",
            marginRight: "5px"
        },
        "&:hover":{
            backgroundColor: Colors.accentBlue
        }
    },
    icon: {
        padding: "0 1em",
        "& > svg": {
            fontSize: "1em"
        }
    }
})

const SharedButton = (props) => {
    const styleProps = { color: props.color ? props.color : Colors.buttonBlue }
    const classes = useStyles(styleProps);

    const { practitionerStore } = useStores();

    return (
        <Button className={`${classes.button} ${props.className}`} onClick={props.onClick}>
            {props.icon ? props.icon : <CheckIcon />}
            {props.text ? props.text : "Button"}
        </Button>
    )
}


export default SharedButton;