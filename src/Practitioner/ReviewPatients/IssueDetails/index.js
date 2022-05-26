import React from 'react';
import SymptomSummary from './SymptomSummary';
import { Box, Grid } from '@material-ui/core';
import ReviewPhotos from './ReviewPhotos';
import ReportingSummary from './ReportingSummary';
import SupportRequests from './SupportRequests';

const IssueDetails = ({ patient, visible }) => {

    const issues = patient.issues.state;

    return (<Box padding="0 .5em" >
        <Grid container>
            {issues.unreviewedPhotos > 0 && visible && <ReviewPhotos patient={patient} />}
            {issues.symptoms > 0 && <SymptomSummary patient={patient} />}
            {issues.supportRequests > 0 && <SupportRequests supportRequests={patient.issues.supportRequests} />}
            <ReportingSummary patient={patient} />
        </Grid>
    </Box>)

}

export default IssueDetails;