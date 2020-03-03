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
      margin: "auto",
      marginTop: "10px",
      padding: "1em",
      width:"85%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderRadius: "10px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)"
  },
  date:{
      ...Styles.secondaryText,
      textAlign: "left",
      marginLeft: "10%"


  }
})

const ActionBox = () => {

    const classes = useStyles();

    const handleClick = () =>{
        console.log("clicky")
    }

    return(<div className={classes.superContainer}>
        <span className={classes.date}>{DateTime.local().toLocaleString(DateTime.DATE_HUGE)}</span>
        <Paper className={classes.container}>
            <NewButton onClick={handleClick} icon={<Clipboard />} text="Log Medication" />
            <NewButton onClick={handleClick} icon={<Camera />} text="Test Strip Photo" />

            <NewButton onClick={handleClick} positive icon={<Clipboard />} text="Test Check Button" />
        </Paper>
    </div>)

}

export default ActionBox;