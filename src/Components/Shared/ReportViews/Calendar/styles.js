import { makeStyles } from "@material-ui/core/styles";
import Styles from "../../../../Basics/Styles";
import Colors from "../../../../Basics/Colors";

const useCalendarStyles = makeStyles({
  calendar: {
    "& > div.react-calendar__navigation > button": {
      backgroundColor: "white",
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
        height: "7vh",
        padding: "5px 0 5px 0",
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
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "1em",
      "& > button": {
        fontSize: "1.25em",
        color: "black",
      },
    },
  },
  day: {
    fontSize: "1.25em",
    position: "relative",
    width: "100%",
    height: "100%",
    margin: "2px 0 2px 0",
    ...Styles.flexCenter,
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
    height: "5px",
    width: "5px",
    borderRadius: "50%",
    border: "solid .5px gray",
  },
  bottomDots: {
    bottom: "3px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    position: "absolute",
  },
  nonDisabledDay: {
    "& > p": { color: "black" },
  },
  today: {
    padding: "5px",
    border: `2px solid ${Colors.accentBlue}`,
    borderRadius: "4px",
  },
  calendarButton: {
    backgroundColor: Colors.buttonBlue,
    borderRadius: "50%",
    color: "white",
  },
});

export default useCalendarStyles;
