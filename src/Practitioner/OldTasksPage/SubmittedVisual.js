import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { DateTime } from "luxon";
import "react-circular-progressbar/dist/styles.css";
import Colors from "../../Basics/Colors";
import { useTranslation } from "react-i18next";
import PractitionerContext from "../PractitionerContext";

const SubmittedVisual = () => {
  const classes = useStyles();
  const { t } = useTranslation("translation");
  const { value: allPatients, status } =
    useContext(PractitionerContext).patients;

  const activePatients = allPatients?.filter(
    ({ status }) => status === "Active"
  );

  return (
    <div className={classes.container}>
      {status === "success" ? (
        <PatientReportGraphic activePatients={activePatients} />
      ) : (
        <LoadingState />
      )}
      <div className={classes.key}>
        <KeyItem
          color={Colors.green}
          text={t("coordinator.tasksSidebar.taken")}
        />
        <KeyItem
          color={Colors.yellow}
          text={t("coordinator.tasksSidebar.notTaken")}
        />
        <KeyItem
          color={Colors.gray}
          text={t("coordinator.tasksSidebar.noReport")}
        />
      </div>
    </div>
  );
};

const PatientReportGraphic = ({ activePatients }) => {
  const classes = useStyles();
  const { t } = useTranslation("translation");

  const totalReported = activePatients?.filter(
    ({ reportingStatus }) => reportingStatus.today.reported
  ).length;

  const takenMedication = activePatients?.filter(({ lastReport }) => {
    return (
      lastReport?.date === DateTime.local().toISODate() &&
      lastReport?.medicationWasTaken
    );
  }).length;

  return (
    <div className={classes.visContainer}>
      <div className={classes.halfCircle}>
        <CircularProgressbarWithChildren
          value={(totalReported / activePatients.length) * 100}
          circleRatio={0.5}
          strokeWidth={8}
          styles={buildStyles({
            rotation: 3 / 4,
            pathColor: Colors.yellow,
            trailColor: "#eee",
            strokeLinecap: "butt",
          })}
        >
          {/* Foreground path */}
          <CircularProgressbarWithChildren
            circleRatio={0.5}
            strokeWidth={8}
            value={(takenMedication / activePatients.length) * 100}
            styles={buildStyles({
              rotation: 3 / 4,
              pathColor: Colors.green,
              trailColor: "transparent",
              strokeLinecap: "butt",
            })}
          >
            {" "}
            <div className={classes.dialText}>
              <span>{`${totalReported} / ${activePatients.length}`}</span>
              <p>
                {t("coordinator.tasksSidebar.submitted")} <br />{" "}
                {t("patient.home.today")}
              </p>
            </div>{" "}
          </CircularProgressbarWithChildren>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
};

const KeyItem = (props) => {
  const classes = useStyles(props);
  return (
    <div className={classes.keyItem}>
      <div className={classes.circle} />
      <p>{props.text}</p>
    </div>
  );
};

const LoadingState = () => {
  const classes = useStyles();
  const { t } = useTranslation("translation");
  return (
    <div className={classes.visContainer}>
      <div className={classes.halfCircle}>
        <CircularProgressbar
          value={100}
          circleRatio={0.5}
          strokeWidth={8}
          text={`${t("loading")}...`}
          styles={buildStyles({
            rotation: 3 / 4,
            pathColor: "transparent",
            textColor: "black",
            trailColor: "#eee",
            textSize: "14px",
            strokeLinecap: "butt",
          })}
        />
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  halfCircle: {
    maxWidth: "200px",
    height: "150px",
    overflow: "hidden",
  },
  dialText: {
    "& > span": {
      display: "block",
      width: "100%",
      fontSize: "2em",
      textAlign: "center",
      marginBottom: 0,
    },
    "& > p": {
      margin: 0,
      marginTop: ".5em",
      display: "block",
      width: "100%",
    },
    position: "relative",
  },
  visContainer: {
    marginTop: "1em",
    maxHeight: "120px",
    flexBasis: "40%",
    textAlign: "center",
  },
  container: {
    width: "100%",
    height: "150px",
    display: "flex",
    justifyContent: "space-around",
    marginTop: "1em",
  },
  key: {
    maxWidth: "50%",
    marginLeft: "1em",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  keyItem: {
    display: "flex",
    alignItems: "center",
    marginTop: ".5em",
    "& > p": {
      margin: 0,
      marginLeft: ".5em",
    },
  },
  circle: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: (props) => props.color,
  },
});

export default SubmittedVisual;
