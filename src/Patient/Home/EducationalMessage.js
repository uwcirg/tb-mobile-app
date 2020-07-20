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
import {observer} from 'mobx-react';
import useStores from '../../Basics/UseStores';
import { useTranslation } from 'react-i18next';

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

const EducationalMessage = observer((props) => {

    const { t, i18n } = useTranslation('education-messages');

    const messages = t('messages',{ returnObjects: true})

    const classes = useStyles();
    const  {educationStore: education} = useStores().patientStore;
    //const [visible,setVisible] =  useState(education.educationMessage >= 0 && messages[education.educationMessage])
    const [visible,setVisible] =  useState(false)
    

    const handleClose = () => {
        setVisible(!visible)
        education.markEducationAsRead();
    }

    return (
        visible ?
            <PopUp className={classes.container} handleClickAway={handleClose}>
                <Typography className={classes.header} variant="h1">{t("header")}</Typography>
                <div className={classes.body}>
                    <h2>{t("week")} {education.educationMessage}:</h2>
                    <p>{messages[education.educationMessage]}</p>
                </div>

                <div className={classes.thumbsContainer}>
                    <p>{t("helpful")}</p>
                <ButtonGroup className={classes.buttonGroup}>
                       <Button> <ThumbDownIcon /></Button>   
                       <Button><ThumbUpIcon /></Button>
                    </ButtonGroup>
                    </div>
            </PopUp> : "")

})

export default EducationalMessage;