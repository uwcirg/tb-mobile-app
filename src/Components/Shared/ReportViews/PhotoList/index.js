import { Box, Button, Typography } from '@material-ui/core';
import { DateTime } from 'luxon';
import React, { useReducer, useState } from 'react';
import ShortDate from '../../ShortDate';
import ReportContainer from '../ReportContainer';
import { useTranslation } from 'react-i18next';

export default function PhotoList({ photoDays, reportsHash }) {

    const { t } = useTranslation('translation');

    
    const [days, setDays] = useState(7);
    const photoDaysToDisplay = photoDays.filter(each => { return DateTime.fromISO(each).diffNow('days').days < 0 }).reverse()
    const toShow = photoDaysToDisplay.slice(0, days)

    return (
        <Box padding="16px">
            {toShow.map(date => {
                return <ReportContainer key={`photo-preview-${date}`} to={`?date=${date}`} disabled={!reportsHash[date]}>
                    <Box padding="8px">
                        <ShortDate date={date} />
                    </Box>
                </ReportContainer>
            })}
            <Button onClick={() => { setDays(days + 7) }}>{t('commonWords.loadMore')}</Button>
        </Box>
    )
}