import React from "react";
import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";
import Options from "./Menu";
import { Box, Grid, makeStyles } from "@material-ui/core";
import Styles from "../../../../Basics/Styles";
import Colors from "../../../../Basics/Colors";
import Tag from "../../../Tag";

const useStyles = makeStyles({
  time: {
    fontSize: ".75ren",
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
      fontWeight: "450",
      fontSize: "1em",
    },
    "& > .date": {
      fontSize: ".9em",
    },
  },
});

const LineItem = ({ reminder, showMenu, isNextAppointment }) => {
  const classes = useStyles();
  const date = DateTime.fromISO(reminder.datetime);
  const { t } = useTranslation("translation");

  return (
    <Box padding="8px">
      <Grid container wrap="nowrap" alignItems="flex-start">
        <Box paddingRight=".5rem">
          <Date date={date} />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          flex="1 1 0"
          paddingLeft=".5rem"
          borderLeft={`solid 2px ${Colors.lightgray}`}
        >
          <Grid alignItems="center" container>
            <span style={{fontWeight: "450"}} className="title">
              {reminder.title ||
                (reminder.category && (
                  <>
                    {t(`appointments.types.${reminder.category}`)}{" "}
                    {"@ "}
                    {date.toLocaleString(DateTime.TIME_SIMPLE)}
                  </>
                ))}
            </span>
            <Box flex="1" />
            <Box width=".5rem" />
            {showMenu && <Options disabled={!showMenu} reminderID={reminder.id} />}
          </Grid>
          {isNextAppointment && (
            <Box paddingTop=".25rem">
              <Tag backgroundColor={Colors.calendarGreen}>
                {t("appointments.nextAppointment")}
              </Tag>
            </Box>
          )}
          <span style={{ fontSize: ".85rem", paddingTop: ".25rem" }}>
            {reminder.note}
          </span>
        </Box>
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
