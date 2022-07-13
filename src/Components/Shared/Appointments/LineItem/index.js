import React from "react";
import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";
import Options from "./Menu";
import { Box, Grid, makeStyles } from "@material-ui/core";
import Styles from "../../../../Basics/Styles";
import Colors from "../../../../Basics/Colors";

const useStyles = makeStyles({
  date: {
    ...Styles.flexColumn,
    alignItems: "center",
    color: Colors.accentBlue,
  },
  month: {
    fontSize: ".8em",
    marginBottom: "3px",
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

const LineItem = ({ reminder, showMenu }) => {
  const classes = useStyles();
  const date = DateTime.fromISO(reminder.datetime);
  const { t } = useTranslation("translation");

  return (
    <Box padding="8px">
      <Grid container wrap="nowrap" alignItems="flex-start">
        <Box paddingRight=".5rem">
          <Date date={date} />
        </Box>
        <Box display="flex" flexDirection="column" flex="1 1 0" paddingLeft=".5rem" borderLeft={`solid 2px ${Colors.lightgray}`}>
          <span className="title">
            {reminder.title ||
              (reminder.category &&
                t(`appointments.types.${reminder.category}`))}
          </span>
          <span className="date" style={{ paddingBotton: "1em" }}>
            {date.toLocaleString(DateTime.TIME_24_SIMPLE)}
          </span>
          <span style={{ fontSize: ".85em", paddingTop: "1em" }}>
            {reminder.note}
          </span>
        </Box>
        {showMenu && <Options reminderID={reminder.id} />}
      </Grid>
    </Box>
  );
};

const Date = ({ date }) => {
  const classes = useStyles();

  return (
    <div className={classes.date}>
      <div className={classes.month}>{date.monthShort}</div>
      <div className={classes.day}>{date.day}</div>
    </div>
  );
};

export default LineItem;
