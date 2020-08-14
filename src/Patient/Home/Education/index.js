import PopUp from '../../Navigation/PopUp'
import React, { useState } from 'react'
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

const messages = JSON.parse(file)

const EducationalMessage = observer((props) => {

    const { t, i18n } = useTranslation('translation');

    const classes = useStyles();
    const {patientUIStore} = useStores();
    const  {educationStore: education} = useStores().patientStore;
    const [visible,setVisible] =  useState(education.messageNumber >= 0 && messages[education.messageNumber])
    //const [visible,setVisible] =  useState(false)


    const handleClose = (isExit) => {
        setVisible(!visible)
        if(isExit) education.markEducationAsRead();
    }

    return (
        (visible && !patientUIStore.onWalkthrough) ?
            <PopUp className={classes.container} handleClickAway={handleClose}>
                <Typography className={classes.header} variant="h1">{t("educationalMessages.header")}</Typography>
                <div className={classes.body}>
                    <h2>{t("educationalMessages.week")} {education.educationMessage}:</h2>
                    <p>{messages[education.messageNumber]}</p>
                </div>

                <div className={classes.thumbsContainer}>
                    <p>{t("educationalMessages.helpful")}</p>
                <ButtonGroup className={classes.buttonGroup}>
                       <Button> <ThumbDownIcon /></Button>   
                       <Button><ThumbUpIcon /></Button>
                    </ButtonGroup>
                    </div>
            </PopUp> : "")

})

export default EducationalMessage;