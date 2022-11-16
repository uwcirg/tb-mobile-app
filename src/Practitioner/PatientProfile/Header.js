import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useStores from "../../Basics/UseStores";
import { observer } from "mobx-react";
import Buttons from "./Buttons";
import Avatar from "@material-ui/core/Avatar";

import { Box, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Styles from "../../Basics/Styles";
import Colors from "../../Basics/Colors";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";

const useStyles = makeStyles({
  header: {
    width: "100%",
    boxSizing: "border-box",
    padding: "1em",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
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
  phoneIcon: {
    height: ".75em",
    color: Colors.blue,
  },
});

const ProfileHeader = observer(() => {
  const classes = useStyles();
  const { patientProfileStore } = useStores();

  return (
    <div className={classes.header}>
      <Grid container spacing={1}>
        <div className={classes.profileHeader}>
          <Grid item xs={12} md={3} spacing={2}>
            <Avatar
              style={{ backgroundColor: Colors.green, marginRight: "1em" }}
              size="small"
            >
              {patientProfileStore.selectedPatient.details.fullName[0]}
            </Avatar>
          </Grid>
          <Grid container spacing={1} direction="column">
            <Grid item xs={12} md={3} spacing={2}>
              <Typography variant="h1">
                {patientProfileStore.selectedPatient.details.fullName}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              spacing={2}
              style={{ display: "flex", alignItems: "center" }}
            >
              <WhatsAppIcon className={classes.phoneIcon} />
              <Typography variant="body1" color="initial">
                {patientProfileStore.selectedPatient.details.phoneNumber}
              </Typography>
            </Grid>
          </Grid>
        </div>
        <Box margin="0 auto">
          <Grid item xs={12} md={8}>
            <Buttons isDesktopView />
          </Grid>
        </Box>
      </Grid>
    </div>
  );
});

export default ProfileHeader;
