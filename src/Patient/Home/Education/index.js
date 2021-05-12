import PopUp from '../../Navigation/PopUp'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Styles from '../../../Basics/Styles';
import Colors from '../../../Basics/Colors';
import { observer } from 'mobx-react';
import useStores from '../../../Basics/UseStores';
import { useTranslation } from 'react-i18next';
import { usePageVisibility } from '../../../Hooks/PageVisibility'
import ForumIcon from '@material-ui/icons/Forum';
import TestStripUpdate from './TestStripUpdateMay'
import RateButtons from './RateButtons'

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
            marginTop: 0
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
    error: {
        textAlign: "center",
        width: "80%",
        fontSize: ".9em"
    },
    graphic: {
        width: "90%",
        marginTop: "1em"
    },
    graphicSmall: {
        width: "50%"
    },
    subHeader: {
        textTransform: "capitalize"
    },
    list: {
        margin: "0",
        padding: "0",
        paddingLeft: "1em",
        textAlign: "left",
        "& > li": {
            marginTop: ".5em",
        }
    },
    howTo: {
        margin: 0,
        padding: 0
    }
})

const EducationalMessage = observer((props) => {

    const { t } = useTranslation('translation');

    const classes = useStyles();
    const { patientUIStore, patientStore } = useStores();
    const { educationStore: education } = patientStore;

    const isVisible = usePageVisibility();


    //Check for service worker update when page goes from invisible to visible.
    //this helps us detect when the application is launched from installed
    useEffect(() => {
        if (document.visibilityState === "visible") {
            education.setExited(false)

            //Ensure that we check if the date has changed
            education.checkForChanges();
        }
    }, [isVisible])

    const handleClose = (isExit) => {
        education.setExited(true);
        if (isExit) {
            education.markEducationAsRead();
        }
    }

    const visible = education.hasDayPassedSinceLastUpdateRead && education.message && !education.exited && !patientUIStore.onWalkthrough;

    return (
        <>
            {visible ?
                <PopUp className={classes.container} handleClickAway={handleClose}>
                    <ComponentToDisplay treatmentDay={education.dayShown} />
                </PopUp> : ""}
        </>)

})

const DefaultLayout = observer(() => {
    const { t } = useTranslation('translation');
    const classes = useStyles();
    const { patientStore } = useStores();
    const { educationStore: education } = patientStore;

    return (<>
        <Typography className={classes.header} variant="h1">{t("educationalMessages.header")} </Typography>
        <Typography className={classes.subHeader} >{t("time.week")} {Math.round(education.dayShown / 7)}</Typography>
        <Graphic treatmentDay={education.dayShown} />
        <div data-testid="education-body" className={classes.body}>
            <p>{education.message}</p>
            {education.dayShown == 5 && <PatientChatText />}
        </div>
        <RateButtons />
    </>)
})

const ComponentToDisplay = ({treatmentDay}) => {

    switch (treatmentDay) {
        case "0": return <TestStripUpdate />
        default: return <DefaultLayout />
    }
}

const Graphic = ({ treatmentDay }) => {
    const classes = useStyles();
    if (treatmentDay == 5) {
        return <img className={classes.graphicSmall} src={"/img/chat.svg"} />
    }
    return <img className={classes.graphic} src="/treatment-update.png" />
}

const PatientChatText = () => {
    const classes = useStyles();
    const { t } = useTranslation('translation');
    return (
        <>
            <p className={classes.howTo}>{t('patient.chatReminder.howTo')}:</p>
            <ol className={classes.list}>
                <li>{t('patient.chatReminder.list', { returnObjects: true })[0]} <ForumIcon style={{ color: Colors.buttonBlue }} /></li>
                <li>{t('patient.chatReminder.list', { returnObjects: true })[1]}</li>
                <li>{t('patient.chatReminder.list', { returnObjects: true })[2]}</li>
            </ol>
        </>
    )
}

export default EducationalMessage;