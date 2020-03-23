import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { ButtonBase } from '@material-ui/core';
import Colors from './Colors';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles({
  text:{
      color: Colors.buttonBlue,
      background: "none",
      textTransform: "capitalize",
      fontSize: ".8em"
  },
  icon:{
      marginRight: ".25em"
  }
})

const ClickableText = (props) => {

    const classes = useStyles();

    return(
    <ButtonBase className={`${classes.text} ${props.className}`} onClick={props.onClick}>
        { !props.hideIcon && <ErrorOutlineIcon className={classes.icon} /> }
        {props.text}
    </ButtonBase>
    )
}

export default ClickableText;