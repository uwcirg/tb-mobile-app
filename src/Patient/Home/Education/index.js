import PopUp from '../../Navigation/PopUp'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, ButtonGroup } from '@material-ui/core';
import Button from '@material-ui/core/IconButton'
import Styles from '../../../Basics/Styles';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Colors from '../../../Basics/Colors';
import { observer } from 'mobx-react';
import useStores from '../../../Basics/UseStores';
import { useTranslation } from 'react-i18next';
import { usePageVisibility } from '../../../Hooks/PageVisibility'

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
        "& > h2": {
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
    thumbsContainer: {
        width: "100%",
        "& > p": {
            fontWeight: "bold"
        }
    },
    buttonGroup: {
        alignSelf: "center",
        width: "90%",
        marginTop: "auto",
        "& > button": {
            width: "50%",
            color: Colors.buttonBlue
        }
    }
})

const EducationalMessage = observer((props) => {

    const { t } = useTranslation('translation');

    const classes = useStyles();
    const { patientUIStore, patientStore } = useStores();
    const { educationStore: education } = useStores().patientStore;

    const isVisible = usePageVisibility();
    const [exited, setExited] = useState(false);

    //Check for service worker update when page goes from invisible to visible.
    //this helps us detect when the application is launched from installed
    useEffect(() => {
        if (document.visibilityState === "visible") {
            setExited(false)
        }
    }, [isVisible])

    const handleClose = (isExit) => {
        setExited(true);
        if (isExit){
            education.markEducationAsRead();
        }
    }

    const handleRate = (rate) => {
        setExited(true);
        education.markEducationAsRead(rate);
        patientUIStore.setAlert(t("educationalMessages.feedback"), "success")
    }

    return (
        <>
            {education.message && !exited && !patientUIStore.onWalkthrough ?
                <PopUp className={classes.container} handleClickAway={handleClose}>
                    <Typography className={classes.header} variant="h1">{t("educationalMessages.header")}: {t("time.week")} {Math.round(education.dayShown / 7)}</Typography>
                    <div className={classes.body}>
                        <p>{education.message}</p>
                    </div>

                    <div className={classes.thumbsContainer}>
                        <p>{t("educationalMessages.helpful")}</p>
                        <ButtonGroup className={classes.buttonGroup}>
                            <Button onClick={() => { handleRate(false) }}> <ThumbDownIcon /></Button>
                            <Button onClick={() => { handleRate(true) }}><ThumbUpIcon /></Button>
                        </ButtonGroup>
                    </div>
                </PopUp> : ""}
        </>)

})

export default EducationalMessage;