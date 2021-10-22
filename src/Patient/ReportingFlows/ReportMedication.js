import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { DateTime } from 'luxon'
import Fade from '@material-ui/core/Fade';
import ClickableText from '../../Basics/ClickableText';
import useStores from '../../Basics/UseStores';
import TextField from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core';
import Colors from '../../Basics/Colors';
import Styles from '../../Basics/Styles';
import SimpleButton from '../../Basics/SimpleButton';
import SimpleTimePicker from '../../Basics/SimpleTimePicker';
import SecondaryButton from '../../Basics/SecondaryButton';

const useStyles = makeStyles({

    textArea: {
        flexGrow: 1,
        width: "100%",
        fontSize: "1em",
        minHeight: "20vh",
        margin: 0,
        alignItems: "flex-start",
        "& > input": {
            padding: 0,
        }
    },
    time: {
        fontSize: "4em",
        color: Colors.buttonBlue,
        borderBottom: `solid 5px ${Colors.buttonBlue}`,
        width: "80%"
    },
    popOver: {
        ...Styles.flexCenter,
        backgroundColor: "rgba(0,0,0,.5)",
        position: "fixed",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        zIndex: 100

    },
    timeContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center"
    },
    addMargin: {
        marginBottom: "1em"
    }
});


const TimeQuestion = observer(() => {

    const { patientStore, uiStore } = useStores();
    const classes = useStyles({ wide: uiStore.locale === "en" });

    return (
        <Fade timeout={1000} in={true}>
            <div className={classes.timeContainer}>
                <SimpleTimePicker
                    value={patientStore.report.timeTaken}
                    setValue={ (value) => patientStore.setReportTime(value)}
                />
            </div>
        </Fade>)
});

function DidTakeMedication(props) {
    const { t } = useTranslation('translation');
    const classes = useStyles();
    return (
        <>
            <TimeQuestion />
            <div className="clickable-container">
                <ClickableText className={classes.addMargin} onClick={props.toggle} text={t("patient.report.didNotTake")} />
            </div>
        </>
    )
}

const DidntTakeMedication = observer((props) => {

    const { patientStore } = useStores();
    const classes = useStyles();
    const { t } = useTranslation('translation');

    return (
        <>
            <TextField multiline value={patientStore.report.whyMedicationNotTaken} onChange={(e) => { patientStore.report.whyMedicationNotTaken = e.target.value }} className={classes.textArea} variant="outlined" />
            <div className="clickable-container">
                <ClickableText onClick={props.toggle} text={t("patient.report.didTake")} />
            </div>
        </>
    )
});

const ReportMedication = observer((props) => {

    const { patientStore } = useStores();
    const { t } = useTranslation('translation');

    useEffect(() => {
        if (patientStore.report.tookMedication) {
            patientStore.report.headerText = t("patient.report.medicationTime")
        } else {
            patientStore.report.headerText = t("patient.report.whyNotTaken")
        }
    })

    const toggleTookMedication = () => {
        patientStore.report.tookMedication = !patientStore.report.tookMedication
    }

    const handleNext = () => {
        patientStore.reportStore.submitMedication();
        props.advance()
    }

    return (
        <>
            <Container id="intro-medication-time">
                {patientStore.report.tookMedication ? <DidTakeMedication toggle={toggleTookMedication} /> : <DidntTakeMedication toggle={toggleTookMedication} />}
                <SimpleButton alignRight onClick={handleNext}>{t("patient.report.next")}</SimpleButton>
            </Container>
        </>
    )
});


const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-content: center;
align-items: center;
margin-left: 1em;
width: 90%;
min-height: 40vh;


h1{
    display: block;
    width: 100%;
    font-size: 1em;
    font-weight: 600;
    text-align: center;
    padding: 0;
    margin-top: 2em;
}


div > label{
    font-size: 25px;
}

.MuiFormControl-root > div{
    width: 50%;
    margin: auto;
}

.clickable-container{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin-top: 2em;
}

`

export default ReportMedication;