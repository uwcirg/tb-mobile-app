import React from "react";
import SymptomSummary from "./SymptomSummary";
import IssueCard from "./IssueCard";
import { Box, Grid } from "@material-ui/core";
import ReviewPhotos from "./ReviewPhotos";
import SupportRequests from "./SupportRequests";
import { DateTime } from "luxon";
import AppointmentReminder from "../AppointmentReminder";

const IssueDetails = ({ patient, visible, hasUpcomingAppointment }) => {
  const issues = patient.issues.state;

  return (
    <Box padding="0 .5em">
      <Grid container>
        {issues.unreviewedPhotos > 0 && visible && (
          <ReviewPhotos patient={patient} />
        )}
        {issues.symptoms > 0 && <SymptomSummary patient={patient} />}
        {hasUpcomingAppointment && (
          <>
            <AppointmentReminder
              id={patient.id}
              nextReminder={patient.nextReminder.datetime}
            />
          </>
        )}
        {issues.supportRequests > 0 && (
          <SupportRequests supportRequests={patient.issues.supportRequests} />
        )}
      </Grid>
    </Box>
  );
};

export default IssueDetails;
