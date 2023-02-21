import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Grid,
  IconButton,
  Box,
  Typography,
  Collapse,
  CircularProgress,
  Button,
} from "@material-ui/core";
import {
  Check,
  Message,
  ArrowDropDownCircle as Down,
  CheckCircle,
  AccessTime,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import Colors from "../../Basics/Colors";
import IssueArea from "./IssueArea";
import AdherenceLabel from "./AdherenceLabel";
import { useTranslation } from "react-i18next";
import useAsync from "../../Hooks/useAsync";
import PractitionerAPI from "../../API/PractitionerAPI";
import ArchiveCountdown from "./ArchiveCountdown";
import useToggle from "../../Hooks/useToggle";
import IssueDetails from "./IssueDetails";
import { DateTime } from "luxon";

const useStyles = makeStyles({
  container: {
    width: "100%",
    overflow: "wrap",
    backgroundColor: "white",
    boxSizing: "border-box",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
    "& a, & a:visited": {
      textDecoration: "none",
    },
  },
  name: {
    fontSize: "1.25em",
    color: Colors.buttonBlue,
  },
  bottomSection: {
    width: "100%",
  },
  messaged: {
    fontSize: ".9em",
    color: Colors.textDarkGray,
  },
  rotate: {
    transform: "rotate(180deg)",
  },
  reviewButton: {
    backgroundColor: Colors.calendarGreen,
    padding: ".25em",
    "&:disabled": {
      backgroundColor: Colors.lightgray,
    },
  },
  expand: {
    width: "fit-content",
    paddingRight: "0",
    justifyContent: "flex-end",
    textTransform: "none",
    color: Colors.buttonBlue,
  },
  reviewPhotoPrompt: {
    lineHeight: "1.1em",
    borderLeft: "solid 3px red",
    paddingLeft: "5px",
  },
  noIssues: {
    fontStyle: "italic",
  },
});

const PatientCard = ({
  patient,
  markPatientAsReviewed,
  isReviewed,
  isSimpleView,
  isReadyForArchive = false,
}) => {
  const classes = useStyles();
  const { t } = useTranslation("translation");
  const [reviewed, setReviewed] = useState(false);
  const [showDetails, toggleDetails] = useToggle(false);

  const resolvePatient = async () => {
    return PractitionerAPI.resolvePatient(patient.id);
  };

  const { execute, status, value, error } = useAsync(resolvePatient, false);
  const success = status === "success";

  const handleExit = () => {
    if (success) {
      markPatientAsReviewed(patient.id);
    }
  };

  useEffect(() => {
    let timeout;
    if (success) {
      timeout = setTimeout(() => {
        setReviewed(true);
      }, 2000);
    }
    return function cleanup() {
      clearTimeout(timeout);
      if (success) {
        handleExit();
      }
    };
  }, [status]);

  if (patient.weeksInTreatment >= 26) isReadyForArchive = true;

  return (
    <Collapse onExited={handleExit} in={!reviewed}>
      <Box className={classes.container}>
        {success ? (
          <Box padding="1em">
            <Grid container>
              <CheckCircle style={{ color: Colors.green }} />
              <Box width=".5em" />
              <Typography>{t("reviewIssues.submitted")}</Typography>
            </Grid>
          </Box>
        ) : (
          <>
            <Box padding=".75em">
              <Grid alignItems="center" container wrap="nowrap">
                <Link to={`/patients/${patient.id}`}>
                  <Typography className={classes.name}>
                    {patient.fullName}
                  </Typography>
                </Link>

                <Box flexGrow={1} />
                <Box
                  display="flex"
                  flexWrap="wrap"
                  justifyContent="end"
                  justifyItems="end"
                  alignItems="baseline"
                >
                  <ArchiveCountdown
                    weeksInTreatment={patient.weeksInTreatment}
                    id={patient.id}
                  />

                  <AdherenceLabel patient={patient} />
                </Box>
              </Grid>
              <Box height=".5em" />
              {isReviewed && (
                <Typography variant="body2">
                  {t("reviewIssues.reviewedAt")}:{" "}
                  {DateTime.fromISO(
                    patient.lastGeneralResolution
                  ).toLocaleString(DateTime.TIME_SIMPLE)}
                </Typography>
              )}
              {!isSimpleView &&
                !isReviewed &&
                (patient.issues.total === 0 ? (
                  <NoIssues patient={patient} resolvePatient={execute} />
                ) : (
                  <Grid
                    alignItems="center"
                    wrap="nowrap"
                    container
                    className={classes.bottomSection}
                  >
                    <IssueArea
                      issues={patient.issues.state}
                      patientId={patient.id}
                    />

                    {patient.nextReminder !== null ? (
                      <AppointmentReminder patient={patient} />
                    ) : (
                      <Box flexGrow={2} />
                    )}
                    <Box flexGrow={1} display="flex" justifyContent="flex-end">
                      <Button
                        className={classes.expand}
                        onClick={toggleDetails}
                      >
                        <Typography style={{ paddingRight: ".5em" }} noWrap>
                          {showDetails
                            ? t("messaging.moderation.hideUI")
                            : t("reviewIssues.review")}
                        </Typography>
                        <Down className={showDetails ? classes.rotate : ""} />
                      </Button>
                    </Box>
                  </Grid>
                ))}
            </Box>
            {!isSimpleView && !isReviewed && (
              <Collapse in={showDetails}>
                {showDetails && (
                  <IssueDetails visible={showDetails} patient={patient} />
                )}
                <ButtonArea
                  isReviewed={isReviewed}
                  loading={status === "pending"}
                  patient={patient}
                  resolvePatient={execute}
                />
              </Collapse>
            )}
          </>
        )}
      </Box>
    </Collapse>
  );
};

const NoIssues = ({ resolvePatient, patient }) => {
  const classes = useStyles();
  const { t } = useTranslation("translation");

  return (
    <Grid alignItems="center" container wrap="nowrap">
      <Typography variant="body2" className={classes.noIssues}>
        {t("reviewIssues.noIssues")}
      </Typography>
      <Box flex="1" />
      <IconButton
        component={Link}
        to={`?onMessagingChannelId=${patient.channelId}`}
        style={{
          backgroundColor: "rgba(66, 133, 244, 0.15)",
          padding: ".25em",
        }}
      >
        <Message style={{ color: Colors.buttonBlue }} />
      </IconButton>
      <Box width="4px" />
      <IconButton onClick={resolvePatient} className={classes.reviewButton}>
        <Check style={{ color: Colors.green }} />
      </IconButton>
    </Grid>
  );
};

const AppointmentReminder = ({ patient }) => {
  const { t } = useTranslation("translation");
  return (
    <Box grow={1} padding=".2em .5em">
      <Link
        to={`/patients/${patient.id}/appointments`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          paddingBottom={".2em"}
          paddingTop={".2em"}
          style={{
            border: `2px solid ${Colors.transparentBlueAccent}`,
            borderRadius: "5px",
            marginLeft: "1em",
            boxShadow: `2px 3px 4px rgba(0, 0, 0, 0.10)`,
          }}
        >
          <Box paddingRight="1em" color>
            <AccessTime fontSize="large" />
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography
              variant="body1"
              style={{
                padding: ".2em",
                marginX: ".5em",
              }}
            >
              {DateTime.fromISO(patient.nextReminder.datetime).toFormat(
                "HH:mm dd/LL"
              )}
            </Typography>
            <Typography
              variant="caption"
              style={{
                textDecoration: "underline",
                color: Colors.buttonBlue,
              }}
            >
              {t("appointments.nextAppointment")} &rarr;
            </Typography>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};

const ButtonArea = ({
  patient,
  resolvePatient,
  loading,
  isReviewed,
  isSimpleView,
}) => {
  const { t } = useTranslation("translation");
  const disable = patient.unreviewedPhotos.length > 0;
  const classes = useStyles();

  return (
    <Box padding="1em .5em">
      <Grid wrap="nowrap" justify="flex-end" alignItems="center" container>
        {disable && (
          <Box padding=".5em">
            <Typography className={classes.reviewPhotoPrompt}>
              {t("reviewIssues.reviewBefore")}
            </Typography>
          </Box>
        )}
        <IconButton
          component={Link}
          to={`?onMessagingChannelId=${patient.channelId}`}
          style={{
            backgroundColor: "rgba(66, 133, 244, 0.15)",
            padding: ".25em",
          }}
        >
          <Message style={{ color: Colors.buttonBlue }} />
        </IconButton>
        {!isReviewed && !isSimpleView && (
          <>
            <Box width=".5em" />
            <IconButton
              disabled={disable}
              onClick={resolvePatient}
              className={classes.reviewButton}
            >
              {loading ? (
                <CircularProgress
                  style={{ color: Colors.gray }}
                  size="1em"
                  variant="indeterminate"
                />
              ) : (
                <Check style={{ color: disable ? "white" : Colors.green }} />
              )}
            </IconButton>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default PatientCard;
