import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import GoodFace from '../../Basics/Icons/GoodFace';
import BadFace from '../../Basics/Icons/BadFace';
import SimpleButton from '../../Basics/SimpleButton';
import { useTranslation } from 'react-i18next';
import Colors from '../../Basics/Colors'
import useStores from '../../Basics/UseStores'
import { ButtonBase } from '@material-ui/core';
import {observer} from 'mobx-react'

const useStyles = makeStyles({

    container: {

    },
    button: {
        marginTop: "auto"
    },
    face: {
        width: "150px",
        height: "150px"
    },
    icon: {
        width: "100px"
    },
    faceButton: {
        padding: "2em 1em .5em 1em",
        border: "1px solid lightgray",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > p": {
            fontWeight: "medium",
            fontSize: "1rem"
        }
    },
    choiceContainer: {
        display: "flex",
        width: "90%",
        margin: "auto",
        justifyContent: "space-evenly",
    },
    body: {
        height: "50vh",
    },
    selected:{
        backgroundColor: Colors.accentBlue
    }
})

const ReportMood = observer((props) => {

    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');
    const { patientStore } = useStores();

    useEffect(() => {
        patientStore.report.headerText = t("patient.report.moodTitle")
    }, [])

    const selectGood = () => {
        patientStore.report.doingOkaySelected = true;
        patientStore.report.doingOkay = true;
    }

    const selectBad = () => {
        patientStore.report.doingOkaySelected = true;
        patientStore.report.doingOkay = false;
    }

    const goodSelected =  patientStore.report.doingOkaySelected && patientStore.report.doingOkay;
    const badSelected =  patientStore.report.doingOkaySelected && !patientStore.report.doingOkay;

    return (<div className={classes.container}>
        <div className={classes.body} >
            <div className={classes.choiceContainer}>
                <ButtonBase className={`${classes.faceButton} ${goodSelected && classes.selected}`} onClick={selectGood}>
                    <GoodFace className={classes.icon} />
                    <p>{t("patient.report.doingWell")}</p>
                </ButtonBase>
                <ButtonBase className={`${classes.faceButton} ${badSelected && classes.selected}`} onClick={selectBad}>
                    <BadFace className={classes.icon} />
                    <p>{t("patient.report.needSupport")}</p>
                </ButtonBase>
            </div>
        </div>


        <SimpleButton disabled={!patientStore.report.doingOkaySelected} className={classes.button} alignRight onClick={() => {
            props.advance()
            console.log(patientStore.report.doingOkay)
        }} backgroundColor={Colors.green}>{t("patient.report.next")}</SimpleButton>
    </div>)

})

export default ReportMood;