import PopUp from '../../Navigation/PopUp'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import NewButton from '../../../Basics/NewButton'
import { Typography, ButtonGroup } from '@material-ui/core';
import Button from '@material-ui/core/IconButton'
import Styles from '../../../Basics/Styles';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Colors from '../../../Basics/Colors';
import {observer} from 'mobx-react';
import useStores from '../../../Basics/UseStores';
import { useTranslation } from 'react-i18next';
import raw from "raw.macro";

const file = raw("../../../Content/TreatmentMessages.json");

const useStyles = makeStyles({
    container: {
        width: "80%",
        minHeight: "80vh",
        ...Styles.flexColumn
        
    },
    body: {
        maxHeight: "60vh",
        overflow: "scroll",
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
        marginTop: "1em",
        textTransform: "capitalize"
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

const messages = JSON.parse(file)

const EducationalMessage = observer((props) => {

    const { t} = useTranslation('translation');

    const classes = useStyles();
    const {patientUIStore, patientStore} = useStores();
    const  {educationStore: education} = useStores().patientStore;
    const [visible,setVisible] =  useState(false);


    useEffect(()=>{
        setVisible(patientStore.patientInformation.loaded && education.messageNumber >= 0 && messages[education.messageNumber] != null)
    },[education.messageNumber,patientStore.patientInformation.loaded])


    const handleClose = (isExit) => {
        setVisible(!visible)
        if(isExit) education.markEducationAsRead();
    }

    const handleRate = (rate) => {
        setVisible(!visible)
        education.markEducationAsRead(rate);
        patientUIStore.setAlert(t("educationalMessages.feedback"),"success")
    }

    return (
        <>
        {visible && !patientUIStore.onWalkthrough ?
            <PopUp className={classes.container} handleClickAway={handleClose}>
                <Typography className={classes.header} variant="h1">{t("educationalMessages.header")}: {t("time.week")} {Math.round(education.messageNumber / 7)}</Typography>
                <div className={classes.body}>
                    <p>{messages[education.messageNumber]}</p>
                </div>

                <div className={classes.thumbsContainer}>
                    <p>{t("educationalMessages.helpful")}</p>
                <ButtonGroup className={classes.buttonGroup}>
                       <Button onClick={() =>{handleRate(false)}}> <ThumbDownIcon /></Button>   
                       <Button onClick={() =>{handleRate(true)}}><ThumbUpIcon /></Button>
                    </ButtonGroup>
                    </div>
            </PopUp> : ""}
            </>)

})

export default EducationalMessage;