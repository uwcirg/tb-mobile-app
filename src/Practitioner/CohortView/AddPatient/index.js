import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useStores from "../../../Basics/UseStores";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import Colors from "../../../Basics/Colors";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import SectionTitle from "../../../Components/Practitioner/SectionTitle";
import { IconButton } from "@material-ui/core";
import Clear from "@material-ui/icons/Clear";
import TextCopy from "../../../Utility/Copiable";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import AddPatientForm from "./Form";

{
  /* If you want to enable creation of seed data - will allow patient histories to be created at random on server
    {(window && window._env && window._env.DOCKER_TAG != "master") && <GenerateTestDataOption />}
*/
}

const AddPatient = observer(({ toggleForm }) => {
  const { t } = useTranslation("translation");
  const { practitionerStore } = useStores();
  const classes = useStyles();

  const handleExit = () => {
    toggleForm();
    practitionerStore.clearNewPatient();
  };

  return (
    <div className={classes.base}>
      <Grid container justify="space-between">
        <SectionTitle className={classes.header}>
          {t("coordinator.addPatientFlow.formTitle")}
        </SectionTitle>
        <IconButton onClick={handleExit}>
          <Clear />
        </IconButton>
      </Grid>
      {practitionerStore.newPatient.loading && (
        <Grid
          className={classes.loading}
          container
          alignItems="center"
          justify="center"
        >
          <CircularProgress variant="indeterminate" />
        </Grid>
      )}
      {practitionerStore.newPatient.code ? (
        <ActivationCode />
      ) : (
        <AddPatientForm submit={practitionerStore.addNewPatient} />
      )}
    </div>
  );
});

const ActivationCode = observer(() => {
  const { t } = useTranslation("translation");
  const { practitionerStore } = useStores();
  const classes = useStyles();

  return (
    <div>
      <Typography variant="body1">
        {t("coordinator.addPatientFlow.forPatient")}:
      </Typography>
      <div className={classes.copyContainer}>
        <TextCopy
          className={classes.copy}
          icon={<VpnKeyIcon />}
          text={practitionerStore.newPatient.code}
        />
      </div>
    </div>
  );
});

const useStyles = makeStyles({
  copyContainer: {
    padding: "1em 0",
    width: "60%",
    "& > div > div": {
      backgroundColor: "white",
    },
  },
  header: {
    padding: ".5em 0",
  },
  input: {
    "& input": {
      backgroundColor: "white",
      borderRadius: "4px",
    },
  },
  base: {
    position: "relative",
    backgroundColor: Colors.lighterGray,
    borderRadius: "4px",
    padding: "1em",
    margin: "1em 0",
    width: "500px",
  },
  loading: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    boxSizing: "border-box",
    backgroundColor: Colors.lighterGray,
    zIndex: 5,
  },
  warning: {
    padding: "1em",
    margin: "1em 0",
    borderRadius: "4px",
    border: "none",
    backgroundColor: Colors.calendarRed,
  },
});

export default AddPatient;
