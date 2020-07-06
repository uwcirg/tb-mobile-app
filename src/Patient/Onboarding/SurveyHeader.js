import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react'
import Styles from '../../Basics/Styles';
import Colors from '../../Basics/Colors';

const useStyles = makeStyles({
  surveyHeader:{
      display: "flex",
      alignItems: "center",
      marginBottom: "2em",
      "& > span":{
          fontWeight: "bold",
          textAlign: "left"
      }
  },
  circle:{
      marginRight: "1em",
      maxWidth: "1.5em",
      maxHeight: "1.5em",
      minHeight: "1.5em",
      maxHeight: "1.5em",
      borderRadius: "50%",
      ...Styles.flexCenter,
      backgroundColor: Colors.accentBlue,
      color: "white"
  }
})

const SurveyHeader = (props) => {

    const classes = useStyles();

    return(<div className={classes.surveyHeader}> 
    <div className={classes.circle}>{props.number}</div> <span>{props.title}</span>
    </div>)

}

export default SurveyHeader;