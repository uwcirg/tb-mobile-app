import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SymptomSummary from './SymptomSummary';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
  
})

const IssueDetails = ({patient}) => {

    const classes = useStyles();

    const issues = patient.issues.state;

    return( <Box padding="1em 0">
       {issues.symptoms > 0 && <SymptomSummary patient={patient} />}
    </Box>)

}

export default IssueDetails;