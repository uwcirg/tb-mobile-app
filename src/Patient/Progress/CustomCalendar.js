import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Calendar from 'react-calendar';
import { DateTime } from 'luxon';
import Styles from '../../Basics/Styles';
import useStores from '../../Basics/UseStores';

const useStyles = makeStyles({
    calendar: {
        "& > div.react-calendar__viewContainer > div > div > div > div.react-calendar__month-view__days > button > abbr": {
            display: "none"
        },
        "& > div.react-calendar__viewContainer > div > div > div > div.react-calendar__month-view__days > button": {
            background: "none",
            border: "none",
            height: "8vh",
            padding: 0,
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

        '& > div.react-calendar__navigation':{
            marginBottom: "1em",
            "& > button":{
               fontSize: "1.25em" 
            }
            
        },
        width: "90%"

    },
    day: {
        fontSize: "1.25em",
        width: "100%",
        height: "100%",
        ...Styles.flexCenter
    },
    today:{
        backgroundColor: 'lightblue'
    }
})

const CustomCalendar = () => {

    const classes = useStyles();
    const {uiStore} = useStores();

    return (
        <Calendar
            tileDisabled={({date}) => {
                return (DateTime.fromJSDate(date) > DateTime.local())}
            }
            calendarType="US"
            minDetail="month"
            view="month"
            onChange={() => { }}
            value={new Date()}
            locale={uiStore.locale}
            className={classes.calendar}
            navigationLabel={(
                { date }) => `${DateTime.fromJSDate(date).get("monthLong")} ${DateTime.fromJSDate(date).get("year")}`
            }
            tileContent={({ date, view }) => (
                view === "month"
                    ? <Day dateObj={date} date={DateTime.fromJSDate(date).day} />
                    : null
            )}
            next2Label={""}
            prev2Label=""
        />
    )

}


const Day = (props) => {
    const classes = useStyles();

    let type;

    console.log(DateTime.fromJSDate(props.dateObj).startOf('day').day)
    console.log(DateTime.local().startOf('day').day)
    if(DateTime.fromJSDate(props.dateObj).startOf('day').equals(DateTime.local().startOf('day'))){
        console.log("yeerrrr")
        type = classes.today;
    }



    return <div className={`${classes.day} ${type}`} >{props.date}</div>
}

export default CustomCalendar;