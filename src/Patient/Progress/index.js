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


const useStyles = makeStyles(theme =>({
    container: {
        width: "100vw",
        height: "70vh",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: "1em"

    },
    calendar: {
        display: "block"
    },

    day: {
        fontFamily: "Roboto",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        width: 40,
        height: 40,
        fontSize: "1em",
        margin: "1px 0 1px 0",
        color: "inherit",
        borderRadius: "20px"
    },
    selectedDay: {
        backgroundColor: Colors.accentBlue,
    },
    disabledDay: {
        color: "lightgray"
    },
    hiddenDay: {
        backgroundColor: "white"
    },

    between:{
        backgroundColor: Colors.calendarGreen,
        borderRadius: "0px 0px 0px 0px",
    },

    start:{
        borderRadius: "20px 0 0 20px"
    },

    end:{
        borderRadius: "0 20px 20px 0"
    }
}));

const CustomToolbar = () => {
    return(<div></div>)
}

const CustomDay = (props) => {
    const classes = useStyles();

    let ctext = `${classes.day} 
    ${props.children == 1 && classes.start}
    ${props.children == 5 && classes.end}
    ${props.children <= 5 && props.children >= 1 && classes.between }
    `
    props.selected && (ctext = `${classes.day} ${classes.selectedDay} `)

    props.disabled && (ctext = `${classes.day} ${classes.disabledDay} `)

    props.hidden && (ctext = `${classes.day} ${classes.hiddenDay} `)
    
    return(<ButtonBase className={classes.button}><div className={ctext}>{!props.hidden ? props.children : ""}</div></ButtonBase>)
}

const customDay = (day, selectedDate, isInCurrentMonth, dayComponent) => {
    
    const isSelected = isInCurrentMonth;
    
     if(DateTime.local().day == day.day){
         //Today
     }
    // You can also use our internal <Day /> component

    return <CustomDay {...dayComponent.props}  />
    //return <Day {...dayComponent.props} style={{backgroundColor:'green'}} ></Day>;
}

const StaticDatePicker = observer(() => {

  // prettier-ignore
  const classes = useStyles();
  const {patientStore} = useStores();

  const changeDate = (newDate) =>{
    patientStore.selectedDate = newDate;
  }

  return (
        <div className={classes.calendar} >
           <DatePicker
                autoOk
                fullWidth
                variant="static"
                openTo="date"
                value={patientStore.selectedDate}
                onChange={changeDate}
                disableFuture
                ToolbarComponent={CustomToolbar}
                renderDay={customDay}
           />
            </div>
        );
});


const Progress = observer(() => {

    const classes = useStyles();
    const {patientStore} = useStores();

    return(<>
        <div className={classes.container} >  
            {!patientStore.uiState.onCalendarView ? <WeekCalendar /> :
            <>
                <StaticDatePicker />
                <DayDrawer className={classes.drawer} />
            </>}
        </div>
      </>)
});

export default Progress;