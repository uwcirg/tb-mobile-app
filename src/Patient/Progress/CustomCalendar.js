import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Calendar from 'react-calendar';
import { DateTime } from 'luxon';
import Styles from '../../Basics/Styles';
import useStores from '../../Basics/UseStores';
import Colors from '../../Basics/Colors';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { observer } from 'mobx-react'

const useStyles = makeStyles({
    calendar: {

        "& > div.react-calendar__navigation > button":{
            backgroundColor: "white",
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
        fontWeight: "medium"
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
        height: "5px",
        width: "5px",
        borderRadius: "50%",
    },
    bottomDots:{
        bottom: "3px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        position: "absolute",
    }

})

const CustomCalendar = () => {

    const classes = useStyles();
    const { patientStore, uiStore } = useStores();

    const handleChange = (date) => {
        patientStore.uiState.selectedCalendarDate = DateTime.fromJSDate(date);
    }

    const checkDisabled = (date) => {
        return (DateTime.fromJSDate(date) > DateTime.local() || DateTime.fromJSDate(date).startOf('day') < DateTime.fromISO(patientStore.treatmentStart).startOf('day') )
    }

    return (
        <Calendar
            
            tileDisabled={({ date }) => {
                return  checkDisabled(date)
            }}
            calendarType="US"
            minDetail="month"
            view="month"
            onChange={() => { }}
            value={new Date()}
            locale={uiStore.locale}
            className={`${classes.calendar} intro-calendar-full`}
            navigationLabel={(
                { date }) => `${DateTime.fromJSDate(date).get("monthLong")} ${DateTime.fromJSDate(date).get("year")}`
            }
            tileContent={({ date, view }) => (
                view === "month"
                    ? <Day dateObj={date} date={DateTime.fromJSDate(date).day} disabled={checkDisabled(date)} />
                    : null
            )}
            next2Label={null}
            prev2Label={null}
            nextLabel={<ChevronRight />}
            prevLabel={<ChevronLeft />}
            onChange={handleChange}
        />
    )
}

const Day = observer((props) => {
    const classes = useStyles();
    const { patientStore } = useStores();

    let dt = DateTime.fromJSDate(props.dateObj);

    let compositeClass;

    const selectedDay = dt.startOf('day').equals(patientStore.uiState.selectedCalendarDate);
    let modifier = false;
    let symptom = false;

    const dayBefore = patientStore.savedReports[`${dt.startOf('day').minus(1, 'day').toISODate()}`]
    const dayFromServer = patientStore.savedReports[`${dt.startOf('day').toISODate()}`]
    const dayAfter = patientStore.savedReports[`${dt.endOf('day').plus(1, 'day').toISODate()}`]

    const today = dt.startOf('day').equals(DateTime.local().startOf('day'));
    const start = dt.startOf('day').equals(DateTime.fromISO(patientStore.treatmentStart).startOf('day'));

    if (dayFromServer && dayFromServer.medicationWasTaken){compositeClass += ' ' + classes.positive}
    else if(dayFromServer && !dayFromServer.medicationWasTaken ){ modifier = "red" }
    else if (!dayFromServer && !props.disabled && !today){compositeClass += ' ' + classes.negative}

    if (dayBefore && dayAfter && dayFromServer) {
        if (dayBefore.medicationWasTaken != dayFromServer.medicationWasTaken) compositeClass += ' ' + classes.start;
        if (dayAfter.medicationWasTaken != dayFromServer.medicationWasTaken) compositeClass += ' ' + classes.end;
        if (dayFromServer.medicationWasTaken && !dayBefore.medicationWasTaken && !dayAfter.medicationWasTaken) compositeClass += ' ' + classes.single;
    }

    if( (dayFromServer && !dayAfter) || (!dayFromServer && dayAfter) || today ) compositeClass += ' ' + classes.end;
    if( (dayFromServer && !dayBefore) || (!dayFromServer && dayBefore) || start ) compositeClass += ' ' + classes.start;

    if( dayFromServer && dayFromServer.symptoms.length > 0) symptom = true

    return(
        <div className={`${classes.day} ${compositeClass}`}>
            {selectedDay ? <div className={classes.selectedDay}><p>{props.date}</p> </div> : <p>{props.date}</p>}
            <div className={classes.bottomDots}>
            {modifier ? <div className={classes.modifier}> </div> : ""}
            {symptom ? <div style={{backgroundColor: Colors.yellow}} className={classes.modifier}> </div> : ""}
            </div>
        </div>
    )
});

const DemoDay = (props) => {
    const classes = useStyles();



    return(
        <div style={{width: "40px",height: "40px" }} className={`${classes.day} ${classes.single} ${!props.modifier && (props.tookMedication ? classes.positive : classes.negative)}`}>
            <p>{props.date}</p>
            {props.modifier ? <div style={props.symptom && {backgroundColor: Colors.yellow}} className={classes.modifier}> </div> : ""}
        </div>
    )

}

export default CustomCalendar;
export {DemoDay};