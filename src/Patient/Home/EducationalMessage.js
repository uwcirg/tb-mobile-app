import PopUp from '../Navigation/PopUp'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import NewButton from '../../Basics/NewButton'
import { Typography, ButtonGroup } from '@material-ui/core';
import Button from '@material-ui/core/IconButton'
import Styles from '../../Basics/Styles';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Colors from '../../Basics/Colors';

const useStyles = makeStyles({
    container: {
        width: "80%",
        minHeight: "80vh",
        ...Styles.flexColumn
        
    },
    body: {
        padding: ".5em",
        "& > p": {
            textAlign: "left",
        },
        "& > h2":{
            fontWeight: "bold",
            fontSize: "1em",
            textAlign: "left"
        },
        margin: "auto"
    },
    header: {
        fontSize: "1.25em",
        fontWeight: "bold",
        marginTop: "1em"
    },
    thumbsContainer:{
        width: "100%",
        "& > p":{
            fontWeight: "bold"
        }
    },
    buttonGroup:{
        alignSelf: "center",
        width: "90%",
        marginTop: "auto",
        "& > button":{
            width: "50%",
            color: Colors.buttonBlue
        }
    }
})

const EducationalMessage = (props) => {

    const classes = useStyles();

    return (
        props.visible ?
            <PopUp className={classes.container} handleClickAway={props.handleClickAway}>
                <Typography className={classes.header} variant="h1">Treatment Update</Typography>
                <div className={classes.body}>
                    <h2>Week 2:</h2>
                    <p>La Tuberculosis Pulmonar se contagia cuando una persona enferma al toser, estornudar o al hablar elimina con la tos secreciones que contienen los bacilos que producen la enfermedad. Siempre tratar de toser en lugar bien ventilado, nunca cerrado, si es posible cubrirse la boca y/o utilizar barbijo.</p>

                    <p> This Information will be availble in the information tab in the future.</p>
                </div>

                <div className={classes.thumbsContainer}>
                    <p>Was this helpful?</p>
                <ButtonGroup className={classes.buttonGroup}>
                       <Button> <ThumbDownIcon /></Button>   
                       <Button><ThumbUpIcon /></Button>
                    </ButtonGroup>
                    </div>
            </PopUp> : "")

}

export default EducationalMessage;