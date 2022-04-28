import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SymptomSummary from './SymptomSummary';
import { Box, Typography } from '@material-ui/core';
import ReviewPhotos from './ReviewPhotos';

const useStyles = makeStyles({
  container:{
      "& > *":{

      },
      "& h2":{
          fontSize: "1em",
          fontWeight: "bold"
      }
  }
})

const IssueDetails = ({patient,visible}) => {

    const classes = useStyles();

    const issues = patient.issues.state;

    return( <Box padding="1em 0" className={classes.container}>
       {issues.unreviewedPhotos > 0 && visible && <ReviewPhotos patient={patient} />}
       {issues.symptoms > 0 && <SymptomSummary patient={patient} />}
    </Box>)

}

export default IssueDetails;