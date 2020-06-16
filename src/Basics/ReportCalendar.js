import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Calendar from 'react-calendar';
import { DateTime } from 'luxon';
import Styles from './Styles';
import useStores from './UseStores';
import Colors from './Colors';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { observer } from 'mobx-react'

const CustomCalendar = (props) => {

    const classes = useStyles();
    //const { patientStore, uiStore } = useStores();

    
    const handleChange = (date) => {
        props.handleChange(date);
    }
    

    return (
        <Calendar
            tileDisabled={({ date }) => {
                return (DateTime.fromJSDate(date) > DateTime.local() || DateTime.fromJSDate(date) < DateTime.fromISO(props.treatmentStart) )
            }
            }
            calendarType="US"
            minDetail="month"
            view="month"
            onChange={() => { }}
            value={props.selectedDay}
            className={classes.calendar}
            navigationLabel={(
                { date }) => `${DateTime.fromJSDate(date).get("monthLong")} ${DateTime.fromJSDate(date).get("year")}`
            }
            tileContent={({ date, view }) => (
                view === "month"
                    ? <Day reports={props.reports} selectedCalendarDate={DateTime.fromJSDate(props.selectedDay).startOf('day')} dateObj={date} date={DateTime.fromJSDate(date).day} disabled={DateTime.fromJSDate(date) > DateTime.local() || DateTime.fromJSDate(date) < DateTime.fromISO(props.treatmentStart)} />
                    : null
            )}
            next2Label={""}
            prev2Label=""
            nextLabel={<ChevronRight />}
            prevLabel={<ChevronLeft />}
            onChange={handleChange}
        />
    )
}

const Day = (props) => {
    const classes = useStyles();
    //const { patientStore } = useStores();

    let dt = DateTime.fromJSDate(props.dateObj);

    let compositeClass;

    const selectedDay = dt.startOf('day').equals(props.selectedCalendarDate);
    let modifier = false;

    const dayBefore = props.reports[`${dt.startOf('day').minus(1, 'day').toISODate()}`]
    const dayFromServer = props.reports[`${dt.startOf('day').toISODate()}`]
    const dayAfter = props.reports[`${dt.endOf('day').plus(1, 'day').toISODate()}`]

    const today = dt.startOf('day').equals(DateTime.local().startOf('day'));
    const start = dt.startOf('day').equals(DateTime.fromISO(props.treatmentStart).startOf('day'));

    if (dayFromServer && dayFromServer.medicationWasTaken){compositeClass += ' ' + classes.positive}
    else if(dayFromServer && !dayFromServer.medicationWasTaken ){ modifier = "red" }
    else if (!dayFromServer && !props.disabled){compositeClass += ' ' + classes.negative}

    if (dayBefore && dayAfter && dayFromServer) {
        if (dayBefore.medicationWasTaken != dayFromServer.medicationWasTaken) compositeClass += ' ' + classes.start;
        if (dayAfter.medicationWasTaken != dayFromServer.medicationWasTaken) compositeClass += ' ' + classes.end;
        if (dayFromServer.medicationWasTaken && !dayBefore.medicationWasTaken && !dayAfter.medicationWasTaken) compositeClass += ' ' + classes.single;
    }

    if( (dayFromServer && !dayAfter) || (!dayFromServer && dayAfter) || today ) compositeClass += ' ' + classes.end;
    if( (dayFromServer && !dayBefore) || (!dayFromServer && dayBefore) || start ) compositeClass += ' ' + classes.start;



    return(
        <div className={`${classes.day} ${compositeClass}`}>
            {selectedDay ? <div className={classes.selectedDay}><p>{props.date}</p> </div> : <p>{props.date}</p>}
            {modifier ? <div className={classes.modifier}> </div> : ""}
        </div>
    )
}

const useStyles = makeStyles({
    calendar: {

        "& > div.react-calendar__navigation > button":{
            backgroundColor: "unset",
            border: "none",
            
        },
        "& > div.react-calendar__viewContainer > div > div > div > div.react-calendar__month-view__days > button > abbr": {
            display: "none"
        },
        "& > div.react-calendar__viewContainer > div > div > div > div.react-calendar__month-view__days > button": {
            background: "none",
            border: "none",
            height: "7vh",
            padding: "5px 0 5px 0",
            margin: 0,
            outline: "none"
        },

        "& > div.react-calendar__viewContainer > div > div > div > div.react-calendar__month-view__weekdays > div": {
            textAlign: "center",
            marginBottom: ".5em",
            "& > abbr": {
                textDecoration: "none"
            }
        },

        '& > div.react-calendar__navigation': {
            marginBottom: "1em",
            "& > button": {
                fontSize: "1.25em",
                color: "black"
            }
        },
        width: "90%"

    },
    day: {
        fontSize: "1.25em",
        position: "relative",
        width: "100%",
        height: "100%",
        margin: "2px 0 2px 0",
        ...Styles.flexCenter
    },
    today: {
        fontWeight: "bold"
    },
    positive: {
        backgroundColor: Colors.calendarGreen,
    },

    start: {
        borderTopLeftRadius: "2vh",
        borderBottomLeftRadius: "2vh"
    },

    end: {
        borderTopRightRadius: "2vh",
        borderBottomRightRadius: "2vh"
    },
    single: {
        borderRadius: "2vh"
    },
    negative: {
        backgroundColor: Colors.calendarRed,
    },
    selected: {
        "& > p":{
            width: "90%",
            height: "90%",
            ...Styles.flexCenter,
            border: `solid 2px ${Colors.accentBlue}`,
            borderRadius: "2vh"
        }
    },
    selectedDay: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "20px",
        height: "40px",
        width: "40px",
        backgroundColor: "#4285F4",
        "& > p": {
            color: "white",
            padding: 0,
            margin: 0
        }
    },
    modifier: {
        backgroundColor: "red",
        position: "absolute",
        height: "5px",
        width: "5px",
        borderRadius: "50%",
        bottom: "1px"
    }

})

export default CustomCalendar;