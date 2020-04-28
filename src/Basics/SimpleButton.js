import React from 'react';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import Colors from './Colors';
import Styles from './Styles';


const useStyles = makeStyles({
    button:{
      backgroundColor: Colors.buttonBlue,
      color: "white",
      fontSize: "1em",
      textTransform: "capitalize",
      padding: ".5em"
    },
    inner:{
      padding: "0 .75em 0 .75em"
    },
    aligned:{
      ...Styles.alignRight
    }

  })

const SimpleButton = (props) => {

    const classes = useStyles();

    const Base = <Button className={classes.button} onClick={props.onClick} variant="contained" disabled={props.disabled}><div className={classes.inner}>{props.children}</div></Button>;
    
      return(
        <div className={`${props.alignRight && classes.aligned} ${props.className && props.className}`} >
          {Base}
        </div>
      )
};

export default SimpleButton;