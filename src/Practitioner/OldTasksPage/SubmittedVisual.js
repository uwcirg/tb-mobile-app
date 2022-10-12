import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import useStores from "../../Basics/UseStores";
import { observer } from "mobx-react";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Colors from "../../Basics/Colors";
import { useTranslation } from "react-i18next";

const Submitted = observer(() => {
  const classes = useStyles();
  const { practitionerStore } = useStores();
  const { t } = useTranslation("translation");
  const { patientsLoaded, getPatients } = practitionerStore;

  useEffect(() => {
    getPatients();
  }, []);

  // to get netlify to build

  return (
    <div className={classes.container}>
      {patientsLoaded ? <PatientReportGraphic /> : <LoadingState />}
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
});

const PatientReportGraphic = observer(() => {
  const classes = useStyles();
  const { practitionerStore } = useStores();
  const { t } = useTranslation("translation");
  const {
    resolutionSummary: { takenMedication },
    patientList,
    totalReported,
    getCompletedResolutionsSummary,
    updateTaskPageData,
  } = practitionerStore;

  useEffect(() => {
    getCompletedResolutionsSummary();
    updateTaskPageData();
  }, []);

  return (
    <div className={classes.visContainer}>
      <div className={classes.halfCircle}>
        <CircularProgressbarWithChildren
          value={(totalReported / patientList.length) * 100}
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
            value={(takenMedication / patientList.length) * 100}
            styles={buildStyles({
              rotation: 3 / 4,
              pathColor: Colors.green,
              trailColor: "transparent",
              strokeLinecap: "butt",
            })}
          >
            {" "}
            <div className={classes.dialText}>
              <span>{`${totalReported} / ${patientList.length}`}</span>
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
});

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
  );
};

const useStyles = makeStyles({
  halfCircle: {
    maxWidth: "200px",
    height: "120px",
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

export default Submitted;
