import React, { useState } from 'react'
import { Box, Button } from '@material-ui/core';
import { DateTime } from 'luxon'
import ReportPreview from './ReportPreview';
import { useTranslation } from 'react-i18next';

export default function ReportList({ reportHash }) {

    const { t } = useTranslation('translation');

    const [endDate, setEndDate] = useState(DateTime.local().startOf('day').minus({ days: 7 }));

    let dates = [];
    let startDate = DateTime.local().startOf('day')

    function showMoreDays() {
        setEndDate(endDate.minus({ days: 7 }))
    }

    while (!startDate.equals(endDate)) {
        dates.push(startDate.toISODate());
        startDate = startDate.minus({ day: 1 })
    }

    return (<Box padding={"1em"}>
        {dates.map(date => {
            return <ReportPreview key={`report-list-${date}`} date={date} report={reportHash[date]} />
        })}
        <Button onClick={showMoreDays}>{t('commonWords.loadMore')}</Button>
    </Box>)
}