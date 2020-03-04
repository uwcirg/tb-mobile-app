import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { DateTime } from 'luxon';
import NewButton from '../../Basics/NewButton';
import Styles from '../../Basics/Styles'

import Clipboard from '@material-ui/icons/Assignment'
import Paper from '@material-ui/core/Paper';
import Camera from '@material-ui/icons/CameraAlt';



const useStyles = makeStyles({

    superContainer:{
        width: "100vw"
        
    },
  container:{
      ...Styles.modifiedPaper,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "1em",
      padding: ".5em"
  },
  upperText:{
      ...Styles.secondaryText,
      textAlign: "left",
      marginLeft: "10%"
  },
  noPadding:{
      
  }
})

const InteractionCard = (props) => {

    const classes = useStyles();

    return(<div className={classes.superContainer}>
        <span className={classes.upperText}>{props.upperText}</span>
        <Paper className={`${classes.container}  ${props.noPadding && classes.noPadding}`}>
            {props.children}
        </Paper>
    </div>)

}

export default InteractionCard;