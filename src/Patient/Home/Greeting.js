import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import useStores from "../../Basics/UseStores";
import { DateTime } from "luxon";
import Colors from "../../Basics/Colors";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import { Box, Grid, Typography } from "@material-ui/core";
import motivationalMessages from "../../Content/motivational-messages";
import isIndonesiaPilot from "../../Utility/check-indonesia-flag";

const useStyles = makeStyles({
  greeting: {
    fontWeight: "medium",
    fontSize: "1.25em",
  },
  date: {
    marginLeft: "auto",
    textTransform: "uppercase",
    color: Colors.textGray,
    fontSize: ".75em",
  },
  motivationTitle: {
    fontWeight: "500",
  },
});

const Greeting = observer(() => {
  const { t } = useTranslation("translation");

  const classes = useStyles();
  const { patientStore } = useStores();

  return (
    <>
      <Box
        width="100%"
        padding="16px 8px 8px 8px"
        style={{ boxSizing: "border-box" }}
        id="intro-greeting"
      >
        <Grid alignItems="center" container>
          <div className={classes.greeting}>
            {t("greeting")} {patientStore.givenName} 👋{" "}
          </div>
          <Box flexGrow={1} />
          <div className={classes.date}>
            {DateTime.fromISO(
              patientStore.reportStore.todaysDate
            ).toLocaleString(DateTime.DATE_FULL)}
          </div>
        </Grid>
      </Box>
      {isIndonesiaPilot() && (
        <MotivationalMessage
          treatmentDay={patientStore.patientInformation.daysInTreatment}
        />
      )}
    </>
  );
});

const MotivationalMessage = ({ treatmentDay }) => {
  const classes = useStyles();
  const messages = motivationalMessages.indonesia;
  const todaysMessage = messages[treatmentDay.toString()];
  const { t } = useTranslation("translation");

  if (!todaysMessage) return "";

  return (
    <Box width="100%" padding="8px 0">
      <Box borderRadius="5px" bgcolor={Colors.lighterGray} padding="16px">
        <Typography className={classes.motivationTitle}>
          {t("educationalMessages.thoughtsForToday")}:
        </Typography>
        <Typography variant="body1" data-testid="motivational-message">
          {todaysMessage}
        </Typography>
      </Box>
    </Box>
  );
};

export default Greeting;
