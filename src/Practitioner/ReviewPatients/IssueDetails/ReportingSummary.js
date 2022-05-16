import { Grid } from '@material-ui/core';
import { EventAvailable } from '@material-ui/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useLocation } from 'react-router-dom';
import IssueSection from './IssueSection';

const ReportingSummary = ({ patient }) => {

    const { t } = useTranslation('translation');
    const location = useLocation();

    return (<IssueSection title={"Reporting Summary"} icon={EventAvailable} >
        <Grid direction='column' container>
            <Link to={`${location.pathname ? location.pathname : ""}/${patient.id}/reports/calendar`}>Calendar</Link>
            <Link to={`${location.pathname ? location.pathname : ""}/${patient.id}/reports/list`}>List</Link>
            <Link to={`${location.pathname ? location.pathname : ""}/${patient.id}/reports/photos`}>Photos</Link>
        </Grid>
    </IssueSection>)

}

export default ReportingSummary;