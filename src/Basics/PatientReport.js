import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Styles from "./Styles";
import Colors from "./Colors";
import CheckIcon from "@material-ui/icons/Check";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import ClearIcon from "@material-ui/icons/Clear";
import PillIcon from "./Icons/Pill.js";
import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";
import useStores from "../Basics/UseStores";
import EditIcon from "@material-ui/icons/ExitToApp";
import TempIcon from "./Icons/Temp";
import Button from "@material-ui/core/Button";
import FaceIcon from "@material-ui/icons/Face";

const useStyles = makeStyles({
  container: {
    ...Styles.flexColumn,
    width: "100%",
    "& > div": {
      borderBottom: "1px solid lightgray",
    },
    "& > div:last-child": {
      borderBottom: "none",
    },
  },
  parent: {
    margin: "auto",
    width: "100%",
    display: "flex",
    paddingBottom: ".5em",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingLeft: "1em",
    width: "100%",
  },
  itemHeader: {
    paddingTop: ".5em",
    width: "100%",
    ...Styles.flexRow,
    alignItems: "center",
    fontSize: "1em",
    "& > svg": {
      margin: "0 .5em 0 0",
    },
  },
  itemBody: {
    width: "100%",
    display: "flex",
    color: Colors.textGray,
    "& > p": {
      margin: "0",
    },
  },
  three: {
    marginLeft: "auto",
    marginRight: "2em",
    alignSelf: "center",
  },
  check: {
    color: Colors.approvedGreen,
    alignSelf: "center",
    paddingRight: ".5em",
  },
  stripPhoto: {
    width: "80%",
  },
  negative: {
    color: Colors.calendarRed,
  },
  edit: {
    alignItems: "flex-end",
    textTransform: "capitalize",
    color: Colors.buttonBlue,
    marginLeft: "auto",
    "& > span": {
      justifyContent: "flex-end",
      flexDirection: "column",
    },
    "& > span > svg": {
      fontSize: "1.5em",
    },
    "& > span > span": {
      marginRight: "5px",
      marginTop: ".5em",
    },
  },
  symptoms: {
    "& > p": {
      margin: "0em 0 .5em 0",
    },
  },
  editContainer: {
    height: "auto",
    display: "flex",
    alignItems: "center",
  },
});

const PatientReport = (props) => {
  const classes = useStyles();
  const { patientUIStore } = useStores();
  const { t } = useTranslation("translation");

  return (
    <div className={`${classes.container}`}>
      <ListItem
        first
        negative={!props.medicationWasTaken}
        icon={<PillIcon />}
        title={t("commonWords.medication")}
        editAction={patientUIStore.editReport}
        hideEdit={props.pastReport}
      >
        <p>
          {" "}
          {props.medicationWasTaken
            ? `${t("coordinator.patientProfile.taken")}`
            : `${t("patient.report.confirmation.notTaken")}:`}
        </p>
        {props.medicationNotTakenReason && (
          <p>{props.medicationNotTakenReason}</p>
        )}
      </ListItem>

      <ListItem
        icon={<TempIcon />}
        title={t("commonWords.symptoms")}
        editAction={patientUIStore.goToReportSymptoms}
        hideEdit={props.pastReport}
      >
        <SymptomList symptoms={props.selectedSymptoms} />
      </ListItem>
      {!props.pastReport && (
        <ListItem
          icon={<FaceIcon />}
          title={t("report.feeling")}
          editAction={patientUIStore.goToReportMood}
          hideEdit={props.pastReport}
        >
          {props.feelingWell
            ? t("patient.report.doingWell")
            : t("patient.report.needSupport")}
        </ListItem>
      )}
      <PhotoListItem
        pastReport={props.pastReport}
        missingPhoto={props.missingPhoto}
        isPhotoDay={props.isPhotoDay}
        photoString={props.photoString}
      />
    </div>
  );
};

const SymptomList = (props) => {
  const { t } = useTranslation("translation");
  const classes = useStyles();

  if (!(props.symptoms && props.symptoms.length > 0)) {
    return t("coordinator.recentReports.noSymptoms");
  }
  return (
    <div className={classes.symptoms}>
      {props.symptoms.map((each, index) => {
        return <p key={index}>{t(`symptoms.${each}.title`)}</p>;
      })}
    </div>
  );
};

const PhotoListItem = (props) => {
  const classes = useStyles();
  const { patientUIStore } = useStores();
  const { t } = useTranslation("translation");

  if (props.isPhotoDay) {
    return (
      <ListItem
        negative={props.isPhotoDay && !props.photoString}
        icon={<CameraIcon />}
        title={t("commonWords.stripPhoto")}
        editAction={patientUIStore.openPhotoReport}
        hideEdit={props.pastReport}
      >
        {!props.missingPhoto ? (
          <img className={classes.stripPhoto} src={props.photoString} />
        ) : (
          <p>{t("patient.report.confirmation.missingPhoto")}</p>
        )}
        <br />
      </ListItem>
    );
  } else {
    return (
      <ListItem
        hideEdit
        icon={<CameraIcon />}
        title={t("commonWords.stripPhoto")}
      >
        <p>{t("patient.report.confirmation.noPhoto")}</p>
      </ListItem>
    );
  }
};

function ListItem(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={`${classes.parent}`}>
      <div className={classes.item}>
        <div className={classes.itemHeader}>
          {props.icon}
          {props.title}
        </div>
        <div className={classes.itemBody}>
          {props.negative ? (
            <ClearIcon className={classes.negative} />
          ) : (
            <CheckIcon className={classes.check} />
          )}
          {props.children}
        </div>
      </div>
      <div className={classes.editContainer}>
        {!props.hideEdit && (
          <Button className={classes.edit} onClick={props.editAction}>
            {props.first && <span>{t("commonWords.edit")}</span>}
            <EditIcon />
          </Button>
        )}
      </div>
    </div>
  );
}

export default PatientReport;
