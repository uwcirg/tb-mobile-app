import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import Fade from '@material-ui/core/Fade';
import useStores from '../../Basics/UseStores';
import TextField from '@material-ui/core/OutlinedInput';
import { ButtonBase, makeStyles, Radio, RadioGroup, Typography } from '@material-ui/core';
import SimpleButton from '../../Basics/SimpleButton';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Colors from '../../Basics/Colors';
import Check from '@material-ui/icons/CheckRounded';
import Clear from '@material-ui/icons/ClearRounded';

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
    selectionContainer: {
        minHeight: "60vh",

    },
    yesNoButtons: {
        alignSelf: "center",
        padding: '1em',

    },
    reasonContainer: {
        padding: "0 1em"
    },
    inputLabel: {
        padding: ".5em 0"
    },
    radioGroup: {
        color: "blue"
    }
});

const ReportMedication = observer((props) => {

    const { patientStore, uiStore } = useStores();
    const { t } = useTranslation('translation');
    const classes = useStyles({ wide: uiStore.locale === "en" });

    const tookMedication = patientStore.report.tookMedication;
    const nextEnabled = tookMedication || patientStore.report.whyMedicationNotTaken.length > 0

    patientStore.reportStore.setReportHeader(t("patient.report.didYouTake"));

    // useEffect(() => {
    //     patientStore.reportStore.setReportHeader(t("patient.report.didYouTake"));
    // }, [uiStore.locale]) //Fixed to prevent incorrent translation on reload

    const handleNext = () => {
        patientStore.reportStore.submitMedication();
        props.advance()
    }

    const handleClick = (value) => { patientStore.reportStore.setTookMedication(value) }

    return (
        <div>
            <Fade timeout={1000} in={true}>
                <Grid direction="column" container className={classes.selectionContainer} >
                    <Grid justify="center" className={classes.yesNoButtons} container>
                        <SelectionButton value={true} handleClick={handleClick} selected={tookMedication === true} />
                        <Box width="1em" />
                        <SelectionButton value={false} handleClick={handleClick} selected={tookMedication === false} />
                    </Grid>
                    {!tookMedication && <div className={classes.reasonContainer}>
                        <Typography className={classes.inputLabel} variant="body1">{t('patient.report.whyNotTaken')}</Typography>
                        <TextField multiline value={patientStore.report.whyMedicationNotTaken} onChange={(e) => { patientStore.report.whyMedicationNotTaken = e.target.value }} className={classes.textArea} variant="outlined" />
                    </div>}
                </Grid>
            </Fade>
            <SimpleButton disabled={!nextEnabled} alignRight onClick={handleNext}>{t("patient.report.next")}</SimpleButton>
        </div>
    )
});


const useButtonStyles = makeStyles({
    button: {
        overflow: "hidden",
        flex: "1 1 0",
        padding: ".5em 1em",
        fontSize: "2em",
        borderRadius: "4px",
        textTransform: "capitalize",
        backgroundColor: "none",
        "& .MuiSvgIcon-root": {
            fontSize: "1.25em",
            paddingBottom: ".5em",
            color: props => !props.selected ? (props.value ? Colors.green : Colors.warningRed) : Colors.textDarkGray
        },
        boxSizing: "border-box"
    },
    yes: {
        backgroundColor: props => props.selected ? Colors.calendarGreen : "white",
    },
    no: {
        backgroundColor: props => props.selected ? Colors.calendarRed : "white"
    },
    buttonBack: {
        boxSizing: "border-box",
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 0,
        opacity: props => props.selected ? "1" : ".5",
        border: props => props.selected ? "none" : `3px solid ${Colors.gray}`
    },
    buttonContent: {
        zIndex: 1
    },
    yesIcon: {
        color: props => !props.selected ? Colors.green : "white",
    }
})

const SelectionButton = ({ selected, value, handleClick }) => {
    const classes = useButtonStyles({ selected: selected, value: value });
    const { t } = useTranslation();
    return <ButtonBase className={`${classes.button}`} onClick={() => { handleClick(value) }}>
        <Grid className={classes.buttonContent} wrap="nowrap" alignItems="center" direction="column" container>
            {value ? <Check /> : <Clear />}
            {value ? t('commonWords.yes') : t('commonWords.no')}
        </Grid>
        <div className={`${classes.buttonBack} ${value ? classes.yes : classes.no}`}></div>
    </ButtonBase>
}

export default ReportMedication;