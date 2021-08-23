import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Colors from '../Basics/Colors';

const useStyles = makeStyles({
    button:{
        backgroundColor: Colors.buttonBlue,
        color: "white",
        fontSize: "1em",
        textTransform: "capitalize",
        padding: ".5em .75em .5em .75em",
        "&:focus": {
          background: Colors.buttonBlue
        }
      }
})

const ReportButton = (props) => {
    const classes = useStyles();
    return(<Button variant="text" {...props} className={classes.button} color="default">{props.children}</Button>)
}

export default ReportButton;