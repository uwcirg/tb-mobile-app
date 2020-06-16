import PopUp from '../Navigation/PopUp'
import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import NewButton from '../../Basics/NewButton'

const useStyles = makeStyles({
  container:{
      width: "80%",
      minHeight: "80vh"
  },
  body:{
      "& > p": {
          textAlign: "justify",
          padding: "1em"
      }
  }
})

const EducationalMessage = (props) => {

    const classes = useStyles();

    return(
    props.visible ?
    <PopUp className={classes.container} handleClickAway={props.handleClickAway}>
        <div className={classes.body}>
        <h1>Treatment Update: Week 1</h1>
        <p>La Tuberculosis Pulmonar se contagia cuando una persona enferma al toser, estornudar o al hablar elimina con la tos secreciones que contienen los bacilos que producen la enfermedad. Siempre tratar de toser en lugar bien ventilado, nunca cerrado, si es posible cubrirse la boca y/o utilizar barbijo.</p>

        <p> This Information will be availble in the information tab in the future.</p>
        <NewButton text="Okay" />
        </div>
    </PopUp> : "")

}

export default EducationalMessage;