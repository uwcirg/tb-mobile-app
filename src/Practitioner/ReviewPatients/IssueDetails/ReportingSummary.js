import { CalendarToday } from '@material-ui/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import IssueSection from './IssueSection';

const ReportingSummary = ({ patient }) => {

    const { t } = useTranslation('translation');

    return (<IssueSection title={"Reporting Summary"} icon={CalendarToday} >
        <p>Hello this is reporting summary</p>
    </IssueSection>)

}

export default ReportingSummary;