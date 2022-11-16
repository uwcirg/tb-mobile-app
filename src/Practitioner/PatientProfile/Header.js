import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { observer } from "mobx-react";
import Buttons from "./Buttons";
import { Box, Grid } from "@material-ui/core";
import Styles from "../../Basics/Styles";
import PatientAvatar from "./PatientAvatar";
import { useTranslation } from "react-i18next";

const ProfileHeader = observer(({ patient }) => {
  const classes = useStyles();
  const { t } = useTranslation("translation");

  return (
    <div className={classes.header}>
      <Grid container spacing={1} alignItems="center" justify="space-between">
        <div className={classes.profileHeader}>
          <PatientAvatar patient={patient} />
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
    alignContent: "flex-start",
    padding: "1em",
    alignItems: "flex-end",
    "& > h1": {
      ...Styles.header,
      margin: 0,
    },
  },
});

export default ProfileHeader;
