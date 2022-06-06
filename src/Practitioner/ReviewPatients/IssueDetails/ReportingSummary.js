import React from 'react';
import { useTranslation } from 'react-i18next';
import ReportingHistoryLinks from '../../../Components/Shared/ReportingHistoryLinks';
import ExpandableCard from '../../../Components/ExpandableCard';

const ReportingSummary = ({ patient }) => {

    const { t } = useTranslation('translation');

    return (<ExpandableCard title="Reporting History">
        <ReportingHistoryLinks patient={patient} />
    </ExpandableCard>)

}

export default ReportingSummary;