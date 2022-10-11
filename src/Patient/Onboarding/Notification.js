import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import useStores from "../../Basics/UseStores";
import { observer } from "mobx-react";
import SurveyHeader from "./SurveyHeader";
import { useTranslation } from "react-i18next";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Colors from "../../Basics/Colors";
import { DateTime } from "luxon";
import TimeDialog from "../../Components/TimeDialog";

const useStyles = makeStyles((theme) => ({
  selected: {
    backgroundColor: Colors.buttonBlue,
    color: "white",
    "&:hover": {
      color: Colors.white,
      backgroundColor: Colors.accentBlue,
    },
  },
  default: {
    backgroundColor: "white",
    color: Colors.buttonBlue,
    "&:hover": {
      color: Colors.buttonBlue,
      backgroundColor: Colors.accentBlue,
    },
  },
  group: {
    marginBottom: "2em",
  },
  timeButton: {
    border: `solid 1px ${Colors.buttonBlue}`,
    color: Colors.buttonBlue,
    fontSize: "1.5em",
  },
}));

const Notification = observer((props) => {
  const classes = useStyles();
  const { t } = useTranslation("translation");
  const [timeOpen, setTimeOpen] = useState(false);
  const [tempValue, setTempValue] = useState(DateTime.local().toISOTime());
  const { activationStore } = useStores();

  const handleTimeChange = (dateTime) => {
    activationStore.onboardingInformation.notificationTime =
      dateTime.toISOTime();
  };

  const closeDialog = () => {
    setTimeOpen(false);
  };

  const handleAccept = () => {
    activationStore.setNotificationTime(tempValue);
    closeDialog();
  };

  return (
    <div className={props.bodyClass}>
      <SurveyHeader
        index={props.index}
        title={t("patient.onboarding.notification.one")}
      />
      <DisableElevation />
      {activationStore.onboardingInformation.enableNotifications && (
        <>
          <SurveyHeader
            index={props.index}
            title={t("patient.onboarding.notification.two")}
          />
          {timeOpen ? (
            <TimeDialog
              title={t("patient.onboarding.notification.two")}
              open={true}
              handleCancel={closeDialog}
              value={tempValue}
              setValue={(value) => {
                setTempValue(value);
              }}
              closeDialog={closeDialog}
              handleAccept={handleAccept}
            />
          ) : (
            <Button
              className={classes.timeButton}
              fullWidth
              onClick={() => {
                setTimeOpen(true);
              }}
            >
              {DateTime.fromISO(
                activationStore.onboardingInformation.notificationTime
              ).toLocaleString(DateTime.TIME_24_SIMPLE)}{" "}
            </Button>
          )}
        </>
      )}
    </div>
  );
});

{
  /* <TimeDialog
    title={t("patient.onboarding.notification.two")}
    open={timeOpen}
    handleCancel={closeDialog}
    value={activationStore.onboardingInformation.notificationTime}
    setValue={(value) => { activationStore.onboardingInformation.notificationTime = value }}
    closeDialog={closeDialog}
    handleAccept={handleAccept} /> */
}

const DisableElevation = observer(() => {
  const classes = useStyles();
  const { activationStore } = useStores();

  return (
    <ButtonGroup className={classes.group} fullWidth color="primary">
      <Button
        onClick={() => {
          activationStore.onboardingInformation.enableNotifications = true;
        }}
        className={
          activationStore.onboardingInformation.enableNotifications
            ? classes.selected
            : classes.default
        }
      >
        Yes
      </Button>
      <Button
        onClick={() => {
          activationStore.onboardingInformation.enableNotifications = false;
        }}
        className={
          !activationStore.onboardingInformation.enableNotifications
            ? classes.selected
            : classes.default
        }
      >
        No
      </Button>
    </ButtonGroup>
  );
});

export default Notification;
