import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useStores from "../../Basics/UseStores";
import { observer } from "mobx-react";
import Buttons from "./Buttons";
import { Box, Grid } from "@material-ui/core";
import Styles from "../../Basics/Styles";
import PatientAvatar from "./PatientAvatar";

const ProfileHeader = observer(() => {
  const classes = useStyles();
  const { patientProfileStore } = useStores();

  return (
    <div className={classes.header}>
      <Grid container spacing={1} alignItems="center" justify="space-between">
        <div className={classes.profileHeader}>
          <PatientAvatar
            patient={patientProfileStore.selectedPatient.details}
          />
        </div>
        <Grid item xs={12} md={9}>
          <Box display="flex" alignContent="center" padding=".2em">
            <Buttons />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
});

const useStyles = makeStyles({
  header: {
    ...Styles.profileCard,
  },
  profileHeader: {
    display: "flex",
    alignContent: "center",
    padding: "1em",
    alignItems: "center",
    "& > h1": {
      ...Styles.header,
      margin: 0,
    },
  },
});

export default ProfileHeader;
