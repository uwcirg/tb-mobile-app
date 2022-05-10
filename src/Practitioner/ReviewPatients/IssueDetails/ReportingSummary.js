import { CalendarToday } from '@material-ui/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useLocation } from 'react-router-dom';
import IssueSection from './IssueSection';

const ReportingSummary = ({ patient }) => {

    const { t } = useTranslation('translation');
    const location = useLocation();

    return (<IssueSection title={"Reporting Summary"} icon={CalendarToday} >
        <Link to={`${location.pathname ? location.pathname : ""}/${patient.id}/calendar`}>Calendar</Link>
    </IssueSection>)

}

export default ReportingSummary;