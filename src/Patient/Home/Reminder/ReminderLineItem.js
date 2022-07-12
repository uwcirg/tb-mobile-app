import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DateTime } from "luxon";
import Styles from "../../../Basics/Styles";
import Colors from "../../../Basics/Colors";
import { useTranslation } from "react-i18next";
import Options from "./ReminderMenu";
import { Box, Grid } from "@material-ui/core";

const useStyles = makeStyles({
  milestone: {
    "& > p": {
      margin: 0,
      padding: 0,
    },
    "& > button": {
      marginLeft: "auto",
      alignSelf: "flex-start",
      padding: 0,
    },
  },
  date: {
    ...Styles.flexColumn,
    alignItems: "center",
    marginRight: "1em",
    color: Colors.accentBlue,
    width: "10%",
  },
  month: {
    fontSize: ".8em",
    marginBottom: "3px",
  },
  addButton: {
    backgroundColor: Colors.buttonBlue,
    color: "white",
    boxShadow: "none",
  },
  milestoneText: {
    ...Styles.flexColumn,
    "& > span": {
      margin: 0,
      padding: 0,
    },
    "& > .title": {
      textTransform: "capitalize",
      fontWeight: "medium",
      fontSize: "1em",
      marginBottom: "5px",
    },
    "& > .date": {
      fontSize: ".9em",
    },
  },
});

const LineItem = (props) => {
  const classes = useStyles();
  const date = DateTime.fromISO(props.reminder.datetime);
  const { t } = useTranslation("translation");

  return (
    <Grid
      container
      wrap="nowrap"
      alignItems="flex-start"
      className={classes.milestone}
    >
      <div className={classes.date}>
        <div className={classes.month}>{date.monthShort}</div>
        <div className={classes.day}>{date.day}</div>
      </div>
      <div className={classes.milestoneText}>
        <span className="title">
          {props.reminder.title ||
            (props.reminder.category &&
              t(`appointments.types.${props.reminder.category}`))}
        </span>
        <span className="date" style={{ paddingBotton: "1em" }}>
          {date.toLocaleString(DateTime.TIME_24_SIMPLE)}
        </span>
        <span style={{ fontSize: ".85em", paddingTop: "1em" }}>
          {props.reminder.note}
        </span>
      </div>
      <Options reminderID={props.reminder.id} />
    </Grid>
  );
};

export default LineItem;
