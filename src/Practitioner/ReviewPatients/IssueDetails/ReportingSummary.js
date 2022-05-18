import { Grid, IconButton, Typography } from '@material-ui/core';
import { CameraAlt, ListAlt, Event, EventAvailable } from '@material-ui/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import IssueSection from './IssueSection';
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../../../Basics/Colors';
import ReportingHistoryLinks from '../../../Components/Shared/ReportingHistoryLinks';

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

    return (<IssueSection title="Reporting History">
        <ReportingHistoryLinks patient={patient} />
    </IssueSection>)

}

export default ReportingSummary;