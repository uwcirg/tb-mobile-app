import { Grid, IconButton, Typography } from '@material-ui/core';
import { CameraAlt, ListAlt, Event, EventAvailable } from '@material-ui/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useLocation } from 'react-router-dom';
import IssueSection from './IssueSection';
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../../../Basics/Colors';

const useStyles = makeStyles({
  buttonContainer:{
      "& > *": {
          color: Colors.buttonBlue
      }
  }
})


const ReportingSummary = ({ patient }) => {

    const { t } = useTranslation('translation');
    const location = useLocation();
    const classes = useStyles();

    return (<IssueSection title="Patient Details">

            <Grid justify='space-between' container className={classes.buttonContainer}>

                <IconButton component={Link} to={`${patient.id}/reports/calendar`}>
                    <Event />
                </IconButton>

                <IconButton component={Link} to={`${patient.id}/reports/list`}>
                    <ListAlt />
                </IconButton>

                <IconButton component={Link} to={`${patient.id}/reports/photos`}>
                    <CameraAlt />
                </IconButton>
            </Grid>
    </IssueSection>)

}

export default ReportingSummary;