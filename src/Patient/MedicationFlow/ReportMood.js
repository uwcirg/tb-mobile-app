import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import GoodFace from '../../Basics/Icons/GoodFace';
import BadFace from '../../Basics/Icons/BadFace';
import SimpleButton from '../../Basics/SimpleButton';
import { useTranslation } from 'react-i18next';
import Colors from '../../Basics/Colors'
import useStores from '../../Basics/UseStores'
import ButtonBase from '@material-ui/core/ButtonBase';
import { observer } from 'mobx-react'
import TextField from '@material-ui/core/TextField';
import WarningBox from '../../Basics/WarningBox'

const useStyles = makeStyles({

    textBox: {
        width: "90%",
        borderRadius: "5px"
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
        "&::focus": {
            outline: "3px solid orange"
        },
        width: "45%",
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
        justifyContent: "space-between",
    },
    body: {
        minHeight: "60vh"
    },
    selected: {
        backgroundColor: Colors.accentBlue
    },
    supportReason: {
        marginTop: "2em",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        "& > div": {
            width: "80%"
        }
    },
    warning: {
        width: "90%",
        margin: "auto",
        marginTop: ".5em"
    },
    bottom: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: ".5em 0 0 0"
    }

})

const ReportMood = observer((props) => {

    const classes = useStyles();
    const { t } = useTranslation('translation');
    const { patientStore } = useStores();

    useEffect(() => {
        patientStore.report.headerText = t("patient.report.moodTitle")
    }, [])

    const handleNext = () => {
        patientStore.reportStore.submitMood();
        props.advance()

    }

    const selectGood = () => {
        patientStore.report.doingOkaySelected = true;
        patientStore.report.doingOkay = true;
    }

    const selectBad = () => {
        patientStore.report.doingOkaySelected = true;
        patientStore.report.doingOkay = false;
    }

    const continueIsDisabled = !patientStore.report.doingOkaySelected || (!patientStore.report.doingOkay && patientStore.report.supportReason === "")

    const goodSelected = patientStore.report.doingOkaySelected && patientStore.report.doingOkay;
    const badSelected = patientStore.report.doingOkaySelected && !patientStore.report.doingOkay;

    return (<div className={classes.container}>
        <div className={classes.body} >
            <div className={classes.choiceContainer}>
                <ButtonBase focusRipple className={`${classes.faceButton} ${goodSelected && classes.selected}`} onClick={selectGood}>
                    <GoodFace className={classes.icon} />
                    <p>{t("patient.report.doingWell")}</p>
                </ButtonBase>
                <ButtonBase focusRipple className={`${classes.faceButton} ${badSelected && classes.selected}`} onClick={selectBad}>
                    <BadFace className={classes.icon} />
                    <p>{t("patient.report.needSupport")}</p>
                </ButtonBase>
            </div>

            {badSelected && <div className={classes.bottom}><TextField className={classes.textBox} variant="filled"
                rows={3}
                multiline
                label={t("patient.report.whySupport")} onChange={(e) => patientStore.report.supportReason = e.target.value} value={patientStore.report.supportReason} />
                {continueIsDisabled && <WarningBox className={classes.warning}>
                    {t('patient.report.requireReason')}
                </WarningBox>}
            </div>}
        </div>

        <SimpleButton disabled={continueIsDisabled} className={classes.button} alignRight onClick={handleNext} backgroundColor={Colors.green}>{t("patient.report.next")}</SimpleButton>
    </div>)

})

export default ReportMood;