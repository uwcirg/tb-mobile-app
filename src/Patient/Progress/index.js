import React, {useState} from 'react'
import { DatePicker } from "@material-ui/pickers/DatePicker/";
import {DateTime} from 'luxon';
import { makeStyles } from '@material-ui/core';
import ButtonBase from '@material-ui/core/ButtonBase'
import Colors from '../../Basics/Colors';
import DayDrawer from './DayDrawer'
import WeekCalendar from '../Progress/WeekCalendar';
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react'
import CustomCalendar from './CustomCalendar';
import OverTopBar from '../Navigation/OverTopBar';
import ApprovalStatus from './ApprovalStatus';
import MileStones from './Milestones'

const useStyles = makeStyles(theme =>({
    container: {
        width: "100vw",
        minHeight: "80vh",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: Colors.backgroundGray
    },
    fullHeight:{
        height: "80vh",
        position: "fixed",
        zIndex: "10",
        backgroundColor: "white",
        justifyContent: "center"
    }
}));

const Progress = observer(() => {

    const classes = useStyles();
    const {patientStore} = useStores();

    return(<>
        <div className={`${classes.container} ${patientStore.uiState.onCalendarView && classes.centerContainer + ' ' + classes.fullHeight}`} >  
            {!patientStore.uiState.onCalendarView ?
            <>
             <WeekCalendar />
             <ApprovalStatus />
             <MileStones />
            </> :
            <>
                <OverTopBar title="Calendar" handleBack={() => {patientStore.uiState.onCalendarView = false}}/>
                <CustomCalendar />
                <DayDrawer />
            </>}
        </div>
      </>)
});

export default Progress;