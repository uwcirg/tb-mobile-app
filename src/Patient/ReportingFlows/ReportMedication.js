import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import Fade from '@material-ui/core/Fade';
import useStores from '../../Basics/UseStores';
import TextField from '@material-ui/core/OutlinedInput';
import { ButtonBase, makeStyles, Typography } from '@material-ui/core';
import SimpleButton from '../../Basics/SimpleButton';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Colors from '../../Basics/Colors';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';


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
    inputLabel:{
        padding: ".5em 0"
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
                    <Grid justify="center" direction="column" className={classes.yesNoButtons} container>
                        <SelectionButton value={true} handleClick={handleClick} selected={!!tookMedication} />
                        <Box height="1em" />
                        <SelectionButton value={false} handleClick={handleClick} selected={!!!tookMedication} />
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
        flex: 1,
        padding: ".5em 1em",
        fontSize: "2em",
        borderRadius: "4px",
        textTransform: "capitalize",
        // textDecoration: props => props.selected ? "underline" : "none",
        border: props => props.selected ? `solid 1px ${Colors.accentBlue}` : "none",
        "& .MuiSvgIcon-root": {
            fontSize: "1em",
            paddingRight: ".5em"
        }
    },
    yes: {
        backgroundColor: Colors.calendarGreen
    },
    no: {
        backgroundColor: Colors.calendarRed
    }
})

const SelectionButton = ({ selected, value, handleClick }) => {
    const classes = useButtonStyles({ selected: selected });
    const { t } = useTranslation();
    return <ButtonBase className={`${classes.button} ${value ? classes.yes : classes.no}`} onClick={() => { handleClick(value) }}>
        <Grid wrap="nowrap" alignItems="center" container>
            {value ? <Check /> : <Clear />}
            {value ? t('commonWords.yes') : t('commonWords.no')}
        </Grid>
    </ButtonBase>
}

export default ReportMedication;