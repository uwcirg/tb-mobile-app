import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core';
import ButtonBase from '@material-ui/core/ButtonBase'
import Colors from '../../Basics/Colors';
import DayDrawer from './DayDrawer'
import WeekCalendar from '../Progress/WeekCalendar';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import CustomCalendar from './CustomCalendar';
import OverTopBar from '../Navigation/OverTopBar';
import ApprovalStatus from './ApprovalStatus';
import MileStones from './Milestones'
import MedicationFlow from '../MedicationFlow';
import AddMilestone from './AddMilestone'
import { useTranslation } from 'react-i18next';
import TimelineCard from './TimelineCard'
import { DemoDay as Day } from './CustomCalendar'
import PopUp from '../Navigation/PopUp';
import ClickableText from '../../Basics/ClickableText';
import QuestionIcon from '@material-ui/icons/HelpOutline';

const useStyles = makeStyles(theme => ({
    container: {
        width: "100vw",
        minHeight: "100vh",
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
    key: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        "& > h2": {
            fontSize: "1.25em"
        },
        "& > .days": {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            "& > p": {
                textAlign: "left",

            },
            "& > div": {
                display: "flex",
                alignItems: "center",
                marginBottom: ".5em",
                "& > span": {
                    textAlign: "left",
                    marginLeft: "1em"
                }

            }
        }
    },
    keyButton: {
        margin: "15px 0 15px 0",
        fontSize: "1em",
        "& > svg": {
            marginRight: "5px",
            fontSize: "1.2em"
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

    const classes = useStyles();
    const { patientStore, patientUIStore } = useStores();
    const { t, i18n } = useTranslation('translation');

    if (patientUIStore.onHistoricalReport) return (<ReportOldMedication />)
    if (patientUIStore.onAddMilestone) return (<AddMilestone handleBack={patientUIStore.goToProgress} />)

    return (<>
        <div id="intro-progress" className={`${classes.container} ${patientUIStore.onCalendar && classes.centerContainer + ' ' + classes.fullHeight}`} >
            <CustomCalendar />
            <Key />
            <DayDrawer />
        </div>
    </>)
});


const Key = (props) => {
    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');
    const [showKey, setShowKey] = useState(false);

    return (
        <>
            {showKey ? <PopUp handleClickAway={() => { setShowKey(false) }}><div className={classes.key}>
                <h2>{t('patient.progress.calendar')}</h2>
                <div className={"days"}>
                    <p>{t('patient.progress.calendarKey.description')}</p>
                    <KeyItem dayProps={{ tookMedication: true }}>{t('patient.progress.calendarKey.good')}</KeyItem>
                    <KeyItem dayProps={{}}>{t('patient.progress.calendarKey.missed')}</KeyItem>
                    <KeyItem dayProps={{ modifier: true }}>{t('patient.progress.calendarKey.notTaken')}</KeyItem>
                    <KeyItem dayProps={{ symptom: true, modifier: true }}>{t('patient.progress.calendarKey.symptoms')}</KeyItem>

                </div>
            </div></PopUp> : <ClickableText className={classes.keyButton} icon={<QuestionIcon />} text={t('patient.progress.calendarKey.button')} onClick={() => { setShowKey(true) }} />}
        </>
    )
}

const KeyItem = (props) => {
    return (
        <div>
            <div>
                <Day {...props.dayProps} date={" "} />
            </div>
            <span>
                {props.children}
            </span>
        </div>
    )
}

export default Progress;