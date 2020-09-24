import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core';
import ButtonBase from '@material-ui/core/ButtonBase'
import Colors from '../../Basics/Colors';
import DayDrawer from './DayDrawer'
import WeekCalendar from '../Progress/WeekCalendar';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import CustomCalendar from './CustomCalendar';
import MedicationFlow from '../MedicationFlow';
import AddMilestone from './AddMilestone'
import { useTranslation } from 'react-i18next';

import ClickableText from '../../Basics/ClickableText';
import QuestionIcon from '@material-ui/icons/HelpOutline';

import Key from './Key'

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "white",
        paddingTop: "1em"
    },
    fullHeight: {
        height: "100vh",
        position: "fixed",
        zIndex: "10",
        backgroundColor: "white",
        justifyContent: "flex-start",
        paddingTop: "60px"
    },
    keyButton: {
        fontSize: ".9em",
        margin: ".25em 0 .5em 0",
        "& > svg": {
            marginRight: "5px",
            fontSize: "1em"
        }
    }

}));

const ReportOldMedication = () => {
    const { patientStore, patientUIStore } = useStores();
    useEffect(() => {
        patientStore.startHistoricalReport();
        patientUIStore.startHistoricalReport();

        return function cleanup() {
            patientStore.loadDailyReport();
            patientStore.report.isHistoricalReport = false;
        }
    })

    return (<MedicationFlow />)

}

const Progress = observer(() => {

    const [showKey, setShowKey] = useState(false);

    const classes = useStyles();
    const { patientStore, patientUIStore } = useStores();
    const { t, i18n } = useTranslation('translation');

    if (patientUIStore.onHistoricalReport) return (<ReportOldMedication />)
    if (patientUIStore.onAddMilestone) return (<AddMilestone handleBack={patientUIStore.goToProgress} />)

    return (<div id="intro-progress" className={`${classes.container}`} >
        {showKey && <Key close={() => { setShowKey(false) }} />}
        <ClickableText className={classes.keyButton} icon={<QuestionIcon />} text={t('patient.progress.calendarKey.button')} onClick={() => { setShowKey(true) }} />
        <CustomCalendar />
        <DayDrawer />
    </div>)
});

export default Progress;