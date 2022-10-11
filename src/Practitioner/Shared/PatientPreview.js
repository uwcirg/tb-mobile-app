import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import useStores from "../../Basics/UseStores";
import Colors from "../../Basics/Colors";
import PatientPicture from "../../Basics/PatientIcon";
import { DateTime } from "luxon";
import { observer } from "mobx-react";
import Styles from "../../Basics/Styles";
import ProfileButton from "../../Components/FlatButton";
import Add from "@material-ui/icons/AddCircle";

const useStyles = makeStyles({
  picture: {
    alignSelf: "center",
  },
  patientInfo: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    borderTop: "1px solid lightgray",
    borderBottom: "1px solid lightgray",
    padding: ".5em 0 .5em 0",
  },
  buttonContainer: {
    margin: "1em",
    width: "100%",
    ...Styles.flexRow,
    justifyContent: "center",
    "& > button:first-child": {
      marginRight: ".5em",
    },
  },
  header: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    "& > h2": {
      padding: 0,
      margin: 0,
      color: Colors.buttonBlue,
    },
    "& > h2:hover": {
      cursor: "pointer",
    },
  },
  profileItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& > span, & > p": {
      margin: ".5em 0 0 0",
      padding: "0",
    },
    "& > span": {
      fontSize: "1em",
      fontWeight: "500",
    },
  },
  resolutionButtons: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "auto",
    marginBottom: "1em",
    "& > button": {
      flexBasis: "40%",
      margin: ".5em",
      padding: ".5em",
      "& > span": {
        fontSize: "1em",
        display: "flex",
        alignItems: "center",
      },
    },
  },
  childrenContainer: {
    width: "100%",
    margin: "auto",
  },
});

const PatientPreview = observer((props) => {
  const classes = useStyles();
  const { practitionerStore, practitionerUIStore } = useStores();
  const { t } = useTranslation("translation");

  const patient = practitionerStore.getPatient(props.id);

  if (!patient) {
    return "";
  }

  return (
    <div className={classes.profile}>
      <div className={classes.header}>
        <PatientPicture name={patient.fullName} />
        <h2
          onClick={() => {
            practitionerUIStore.goToPatient(props.id);
          }}
        >
          {patient.fullName}
        </h2>
        <div className={classes.buttonContainer}>
          <ProfileButton
            backgroundColor={"white"}
            border
            color={Colors.buttonBlue}
            onClick={() => {
              practitionerUIStore.goToPatient(patient.id);
              practitionerUIStore.openAddPatientNote();
            }}
          >
            <Add />
            {t("coordinator.patientProfile.options.note")}
          </ProfileButton>
        </div>
      </div>

      <div className={classes.patientInfo}>
        <ProfileItem
          text={t("coordinator.adherence")}
          value={`${Math.floor(patient.adherence * 100)}%`}
        />
        <ProfileItem
          text={t("coordinator.daysInTreatment")}
          value={patient.daysInTreatment}
        />
        <ProfileItem
          text={t("coordinator.sideBar.lastContacted")}
          value={DateTime.fromISO(patient.lastContacted).toLocaleString(
            DateTime.DATE_SHORT
          )}
        />
      </div>
    </div>
  );
});

const ProfileItem = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.profileItem}>
      <span>{props.text}:</span> <p>{props.value}</p>
    </div>
  );
};

export default PatientPreview;
