import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useStores from "../../../Basics/UseStores";
import { observer } from "mobx-react";
import Colors from "../../../Basics/Colors";
import { Link } from "react-router-dom";
import { Avatar, Box, Grid, IconButton } from "@material-ui/core";
import ProfileButton from "../../../Components/FlatButton";
import Message from "@material-ui/icons/ChatBubbleOutlineRounded";
import Add from "@material-ui/icons/AddCircle";
import { useTranslation } from "react-i18next";
import ClearIcon from "@material-ui/icons/Clear";
import PatientDataSummmary from "./PatientSummary";
import ArchiveCountdown from "../../ReviewPatients/ArchiveCountdown";

const useStyles = makeStyles({
  container: {
    width: "100%",
    padding: "0 .5em 1em 1em",
    boxSizing: "border-box",
    borderBottom: "solid 1px lightgray",
    "& a, & a:visited": {
      textDecoration: "none",
    },
  },
  profileLink: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: Colors.buttonBlue,
  },
  avatar: {
    backgroundColor: Colors.green,
  },
  clear: {
    marginLeft: "auto",
    padding: 0,
  },
  smallButton: {
    padding: ".5em .75em",
    "& > span": {
      padding: "0",
    },
  },
});

const Header = observer(({ selectedPatient }) => {
  const { t } = useTranslation("translation");
  const { practitionerUIStore, practitionerStore } = useStores();

  const openNewNote = () => {
    practitionerUIStore.openNoteForSelectedPatient(selectedPatient.id);
  };

  const classes = useStyles();

  const initals = () => {
    return (
      selectedPatient.givenName.charAt(0) + selectedPatient.familyName.charAt(0)
    );
  };

  const handleClose = () => {
    practitionerStore.selectedRow.clearSelection();
  };

  const isReadyForArchive = selectedPatient.weeksInTreatment >= 26;

  return (
    <div className={classes.container}>
      <Grid wrap="nowrap" container alignItems="center">
        <Link
          className={classes.profileLink}
          to={`/patients/${selectedPatient.id}`}
        >
          <Avatar className={classes.avatar}>{initals()}</Avatar>
          <Box width=".5em" />
          <h2>{selectedPatient.fullName}</h2>
        </Link>
        <IconButton className={classes.clear} onClick={handleClose}>
          <ClearIcon />
        </IconButton>
      </Grid>
      <PatientDataSummmary />
      <Box height=".5em" />
      <Grid container>
        <ProfileButton
          className={classes.smallButton}
          onClick={() => {
            practitionerUIStore.goToChannel(selectedPatient.channelId);
          }}
        >
          <Message />
          {t("coordinator.patientProfile.options.message")}
        </ProfileButton>
        <Box width=".5em" />
        <ProfileButton
          className={classes.smallButton}
          backgroundColor={"white"}
          border
          color={Colors.buttonBlue}
          onClick={openNewNote}
        >
          <Add />
          {t("coordinator.patientProfile.options.note")}
        </ProfileButton>
        <div className={classes.profileLink}>
          <ArchiveCountdown
            weeksInTreatment={selectedPatient.weeksInTreatment}
            id={selectedPatient.id}
          />
        </div>
      </Grid>
    </div>
  );
});

export default Header;
