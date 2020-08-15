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
import {DemoDay as Day} from './CustomCalendar'
import PopUp from '../Navigation/PopUp';

const useStyles = makeStyles(theme => ({
    container: {
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: Colors.backgroundGray
    },
    fullHeight: {
        height: "100vh",
        position: "fixed",
        zIndex: "10",
        backgroundColor: "white",
        justifyContent: "flex-start",
        paddingTop: "60px"
    },
    key:{
        "& > .days":{
            "& > div":{
                height: "40px",
                width: "40px"
            }
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
    const { patientStore,patientUIStore} = useStores();
    const { t, i18n } = useTranslation('translation');
    const [showKey,setShowKey] = useState('false');

    if(patientUIStore.onHistoricalReport) return (<ReportOldMedication />)
    if(patientUIStore.onAddMilestone) return (<AddMilestone handleBack={patientUIStore.goToProgress} />)

    return (<>
            <div id="intro-progress" className={`${classes.container} ${patientUIStore.onCalendar && classes.centerContainer + ' ' + classes.fullHeight}`} >
                {!patientUIStore.onCalendar ?
                    <div id="intro-progress-full">
                        <WeekCalendar />
                        <TimelineCard />
                       {/* <MileStones /> */}
                        <ApprovalStatus />
                    </div> :
                    <>
                        <OverTopBar title={t("patient.progress.calendar")} handleBack={() => { patientUIStore.goToProgress() }} />
                        {/*showKey ? <PopUp handleClickAway={()=>{setShowKey(false)}}><div className={classes.key}>
                            <div className={"days"}>
                            <Day test date={1}/>
                            <Day date={3}/>
                            <Day modifier date={4}/>
                            </div>
                </div></PopUp>: <button onClick={()=>{setShowKey(true)}}>Show Pop</button>*/}
                        <CustomCalendar />
                        <DayDrawer />
                    </>}
            </div>
    </>)
});

export default Progress;