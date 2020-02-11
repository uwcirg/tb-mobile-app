import React, {useState} from 'react'
import { DatePicker } from "@material-ui/pickers/DatePicker/";
import {DateTime} from 'luxon';
import { makeStyles } from '@material-ui/core';
import { Badge } from "@material-ui/core";
import {Day} from "@material-ui/pickers/views/Calendar/Day"

import Colors from '../../Basics/Colors';

const useStyles = makeStyles(theme =>({
    container: {
        width: "100vw",
        display: "flex",
        justifyContent: "center"

    },
    calendar: {
        display: "block",
    },

    day: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        width: 40,
        height: 40,
        fontSize: theme.typography.caption.fontSize,
        margin: "1px 0 1px 0",
        color: "inherit"
    },
    hiddenDay: {
        backgroundColor: "white"
    },

    between:{
        backgroundColor: Colors.green
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
    const ctext = `${classes.day} 
    ${props.hidden && classes.hiddenDay} 
    ${props.children == 1 && classes.start}
    ${props.children == 5 && classes.end}
    ${props.children <= 5 && props.children >= 1 && classes.between }
    `

    console.log(props)
    
    return(<div className={ctext}>{!props.hidden ? props.children : ""}</div>)
}

const customDay = (day, selectedDate, isInCurrentMonth, dayComponent) => {
    
    const isSelected = isInCurrentMonth;
    
     if(DateTime.local().day == day.day){
         return <Day{...dayComponent.props}></Day>
     }
    // You can also use our internal <Day /> component

    return <CustomDay {...dayComponent.props}  />
    //return <Day {...dayComponent.props} style={{backgroundColor:'green'}} ></Day>;
}


const StaticDatePicker = () => {
  const [date, changeDate] = useState(DateTime.local());
  // prettier-ignore
  const classes = useStyles();
  return (
      <div className={classes.calendar} >
      <DatePicker
        autoOk
        variant="static"
        openTo="date"
        value={date}
        onChange={changeDate}
        disableFuture
        ToolbarComponent={CustomToolbar}
        renderDay={customDay}
      />
      </div>
  );
};


const Progress = () => {

    const classes = useStyles();

    return(<div className={classes.container} >  
       <StaticDatePicker />
      </div>)
}

export default Progress;