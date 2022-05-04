import React from 'react';
import SymptomSummary from './SymptomSummary';
import { Box } from '@material-ui/core';
import ReviewPhotos from './ReviewPhotos';

const IssueDetails = ({patient,visible}) => {

    const issues = patient.issues.state;

    return( <Box padding="1em 0" >
       {issues.unreviewedPhotos > 0 && visible && <ReviewPhotos patient={patient} />}
       {issues.symptoms > 0 && <SymptomSummary patient={patient} />}
    </Box>)

}

export default IssueDetails;