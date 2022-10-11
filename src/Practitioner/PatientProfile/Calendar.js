import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Calendar from "react-calendar";
import { DateTime } from "luxon";
import Styles from "../../Basics/Styles";
import useStores from "../../Basics/UseStores";
import Colors from "../../Basics/Colors";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Badge from "@material-ui/core/Badge";
import Check from "@material-ui/icons/CheckCircleOutline";
import Clear from "@material-ui/icons/ClearOutlined";

const CustomCalendar = (props) => {
  const classes = useStyles();
  const { uiStore } = useStores();

  const handleChange = (date) => {
    props.handleChange(date);
  };

  return (
    <Calendar
      tileDisabled={({ date }) => {
        return (
          DateTime.fromJSDate(date) > DateTime.local() ||
          DateTime.fromJSDate(date) < DateTime.fromISO(props.treatmentStart)
        );
      }}
      calendarType="US"
      locale={uiStore.locale}
      minDetail="month"
      view="month"
      onChange={() => {}}
      value={props.selectedDay}
      className={classes.calendar}
      navigationLabel={({ date }) =>
        `${DateTime.fromJSDate(date).get("monthLong")} ${DateTime.fromJSDate(
          date
        ).get("year")}`
      }
      tileContent={({ date, view }) =>
        view === "month" ? (
          <Day
            reports={props.reports}
            selectedCalendarDate={DateTime.fromJSDate(
              props.selectedDay
            ).startOf("day")}
            dateObj={date}
            date={DateTime.fromJSDate(date).day}
            disabled={
              DateTime.fromJSDate(date) > DateTime.local() ||
              DateTime.fromJSDate(date) < DateTime.fromISO(props.treatmentStart)
            }
          />
        ) : null
      }
      next2Label={""}
      prev2Label=""
      nextLabel={<ChevronRight />}
      prevLabel={<ChevronLeft />}
      onChange={handleChange}
    />
  );
};

const Day = (props) => {
  const classes = useStyles();
  //const { patientStore } = useStores();

  let dt = DateTime.fromJSDate(props.dateObj);

  let compositeClass;

  const selectedDay = dt.startOf("day").equals(props.selectedCalendarDate);
  let modifier = false;

  const dayBefore =
    props.reports[`${dt.startOf("day").minus(1, "day").toISODate()}`];
  const dayFromServer = props.reports[`${dt.startOf("day").toISODate()}`];
  const dayAfter =
    props.reports[`${dt.endOf("day").plus(1, "day").toISODate()}`];

  const today = dt.startOf("day").equals(DateTime.local().startOf("day"));
  const start = dt
    .startOf("day")
    .equals(DateTime.fromISO(props.treatmentStart).startOf("day"));

  const tookMeds = dayFromServer && dayFromServer.medicationWasTaken;
  const symptoms = dayFromServer && dayFromServer.symptoms.length > 0;
  /*
    else if(dayFromServer && !dayFromServer.medicationWasTaken ){ modifier = "red" }
    else if (!dayFromServer && !props.disabled){compositeClass += ' ' + classes.negative}

    if (dayBefore && dayAfter && dayFromServer) {
        if (dayBefore.medicationWasTaken != dayFromServer.medicationWasTaken) compositeClass += ' ' + classes.start;
        if (dayAfter.medicationWasTaken != dayFromServer.medicationWasTaken) compositeClass += ' ' + classes.end;
        if (dayFromServer.medicationWasTaken && !dayBefore.medicationWasTaken && !dayAfter.medicationWasTaken) compositeClass += ' ' + classes.single;
    }

    if( (dayFromServer && !dayAfter) || (!dayFromServer && dayAfter) || today ) compositeClass += ' ' + classes.end;
    if( (dayFromServer && !dayBefore) || (!dayFromServer && dayBefore) || start ) compositeClass += ' ' + classes.start;
*/

  return (
    <div className={`${classes.day} ${compositeClass}`}>
      {!props.disabled && (
        <div className={classes.badgeContainer}>
          {tookMeds ? (
            <Check style={{ color: Colors.approvedGreen }} />
          ) : (
            <Clear style={{ color: Colors.red }} />
          )}
        </div>
      )}
      {selectedDay ? (
        <div className={classes.selectedDay}>
          <p>{props.date}</p>{" "}
        </div>
      ) : (
        <div className={classes.dateNum}>{props.date}</div>
      )}
      {symptoms && <div style={{ fontSize: ".5em" }}>Symptoms Reported</div>}
      {modifier ? <div className={classes.modifier}> </div> : ""}
    </div>
  );
};

const useStyles = makeStyles({
  dateNum: {
    width: "50%",
    textAlign: "center",
  },
  badgeContainer: {
    height: "1.5em",
  },
  calendar: {
    alignSelf: "center",

    "& > div.react-calendar__viewContainer > div > div > div > div.react-calendar__month-view__weekdays":
      {
        backgroundColor: "lightgray",
        alignItems: "center",
        "& > div": { margin: ".5em 0 .5em 0" },
      },

    "& > div.react-calendar__navigation > button": {
      backgroundColor: "unset",
      border: "none",
    },
    "& > div.react-calendar__viewContainer > div > div > div > div.react-calendar__month-view__days > button > abbr":
      {
        display: "none",
      },
    "& > div.react-calendar__viewContainer > div > div > div > div.react-calendar__month-view__days > button":
      {
        background: "none",
        border: "none",
        height: "100px",
        padding: "0",
        margin: 0,
        outline: "none",
      },

    "& > div.react-calendar__viewContainer > div > div > div > div.react-calendar__month-view__weekdays > div":
      {
        textAlign: "center",
        marginBottom: ".5em",
        "& > abbr": {
          textDecoration: "none",
        },
      },

    "& > div.react-calendar__navigation": {
      marginBottom: "1em",
      "& > button": {
        fontSize: "1.25em",
        color: "black",
      },
    },
    width: "90%",
    backgroundColor: "white",
    ...Styles.profileCard,
  },
  day: {
    padding: ".5em",
    boxSizing: "border-box",
    border: ".5px solid lightgray",
    fontSize: "1.25em",
    position: "relative",
    width: "100%",
    height: "100%",
    margin: "0",
    ...Styles.flexColumn,
    alignItems: "center",
  },
  today: {
    fontWeight: "medium",
  },
  positive: {
    backgroundColor: Colors.calendarGreen,
  },

  start: {
    borderTopLeftRadius: "2vh",
    borderBottomLeftRadius: "2vh",
  },

  end: {
    borderTopRightRadius: "2vh",
    borderBottomRightRadius: "2vh",
  },
  single: {
    borderRadius: "2vh",
  },
  negative: {
    backgroundColor: Colors.calendarRed,
  },
  selected: {
    "& > p": {
      width: "90%",
      height: "90%",
      ...Styles.flexCenter,
      border: `solid 2px ${Colors.accentBlue}`,
      borderRadius: "2vh",
    },
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
      margin: 0,
    },
  },
  modifier: {
    backgroundColor: "red",
    position: "absolute",
    height: "5px",
    width: "5px",
    borderRadius: "50%",
    bottom: "1px",
  },
});

export default CustomCalendar;
