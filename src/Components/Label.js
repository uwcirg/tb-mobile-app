import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  label:{
      width: "unset",
      fontSize: ".8em",
      display: "block",
      padding: "3px .5em",
      backgroundColor: props => props.backgroundColor || "inital",
      textTransform: "uppercase",
      color: "white !important",
      borderRadius: "5px"
  }
})

const Label = ({text, backgroundColor, className}) => {

    const classes = useStyles({backgroundColor: backgroundColor});

    return(<Typography className={`${classes.label} ${className} category-label`} variant="body1">{text}</Typography>)

}

export default Label;