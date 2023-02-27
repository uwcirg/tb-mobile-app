import React from "react";
import { makeStyles, Grid, Badge, Box } from "@material-ui/core";
import {
  AccessAlarm,
  Assignment,
  CameraAlt,
  EventBusy,
  SentimentDissatisfied,
} from "@material-ui/icons";
import Colors from "../../Basics/Colors";
import Pill from "../../Basics/Icons/Pill";

const useStyles = makeStyles({
  issueContainer: {
    width: "fit-content",
    "& svg": {
      fontSize: "1.5em",
      color: Colors.textGray,
    },
  },
  badge: {
    backgroundColor: Colors.lighterGray,
  },
});

const iconMap = {
  missedMedication: <Pill />,
  missedReporting: <EventBusy />,
  supportRequests: <SentimentDissatisfied />,
  symptoms: <Assignment />,
  unreviewedPhotos: <CameraAlt />,
  feelingBad: <SentimentDissatisfied />,
};

const IssueArea = ({ issues, patientId, hasUpcomingAppointment = false }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.issueContainer} container>
      {Object.keys(issues).map((item, index) => {
        if (issues[item] > 0 && iconMap[item]) {
          return (
            <CustomBadge
              badgeContent={issues[item]}
              key={`issue-icon-${index}-${patientId}`}
            >
              {item === "symptoms" && issues.hadSevereSymptom ? (
                <Assignment style={{ color: Colors.red }} />
              ) : (
                iconMap[item]
              )}
            </CustomBadge>
          );
        }
      })}
      {hasUpcomingAppointment && (
        <AccessAlarm
          style={{ color: Colors.transparentBlueAccent, zIndex: 2 }}
        />
      )}
    </Grid>
  );
};

const CustomBadge = (props) => {
  const classes = useStyles();

  return (
    <>
      <Badge
        {...props}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        classes={{ badge: classes.badge }}
      />
      <Box width=".5em" />
    </>
  );
};

export default IssueArea;
