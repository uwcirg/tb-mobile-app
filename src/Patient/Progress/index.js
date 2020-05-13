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
    }
}));

const ReportOldMedication = () => {
    const { patientStore, patientUIStore } = useStores();
    useEffect(() => {
        patientStore.startHistoricalReport();
        patientUIStore.startHistoricalReport();

        return function cleanup() {
            patientStore.loadDailyReport();
            patientStore.uiState.onHistoricalTreatmentFlow = false;
        }
    })

    return (<MedicationFlow />)

}

const Progress = observer(() => {

    const classes = useStyles();
    const { patientStore,patientUIStore} = useStores();

    useEffect(()=>{patientStore.getMilestones()},[])

    if(patientUIStore.onHistoricalReport) return (<ReportOldMedication />)
    if(patientUIStore.onAddMilestone) return (<AddMilestone handleBack={patientUIStore.goToProgress} />)

    return (<>
            <div className={`${classes.container} ${patientStore.uiState.onCalendarView && classes.centerContainer + ' ' + classes.fullHeight}`} >
                {!patientStore.uiState.onCalendarView ?
                    <>
                        <WeekCalendar />
                        <ApprovalStatus />
                        <MileStones />
                    </> :
                    <>
                        <OverTopBar title="Calendar" handleBack={() => { patientStore.uiState.onCalendarView = false }} />
                        <CustomCalendar />
                        <DayDrawer />
                    </>}
            </div>
    </>)
});

export default Progress;