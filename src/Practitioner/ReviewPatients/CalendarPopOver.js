import React, { useCallback, useMemo, useState } from 'react'
import PopOverV2 from '../../Components/Shared/PopOverV2'
import { useHistory, useParams } from 'react-router-dom'
import SharedAPI from '../../API/SharedAPI';
import useAsync from '../../Hooks/useAsync';
import ReportingCalendar from '../../Components/Shared/ReportingCalendar';
import { Box, Button, Dialog, Fade, Grid } from '@material-ui/core';
import Loading from '../Shared/CardLoading';
import CalendarKey from '../../Components/Shared/ReportingCalendar/CalendarKey';
import { useTranslation } from 'react-i18next';
import DailyReport from '../../Components/Shared/DailyReport';
import { DateTime } from 'luxon';

export default function CalendarPopOver({ patient }) {

    const { t } = useTranslation('translation');

    const history = useHistory();
    const { patientId } = useParams();

    const [state, setState] = useState({
        currentDate: null,
        calendarStartDate: new Date()
    });

    const { currentDate, calendarStartDate } = state;

    const setCurrentDate = (date) => { setState({ ...state, currentDate: date }) }

    const getDailyReports = useCallback(() => {
        return SharedAPI.getDailyReports(patientId)
    }, [patientId]);

    const handleExit = () => {
        if (!currentDate) history.goBack();
        setState({ ...state, currentDate: null })
    }

    const { value, status } = useAsync(getDailyReports);

    const reportHash = useMemo(() => {
        return value ? value.reduce((prev, current,) => {
            const { date } = current;
            return { ...prev, [date]: current };
        }, {}) : {}
    }, [value])

    const updateMonth = (forward = true) => {
        setState({ ...state, calendarStartDate: DateTime.fromJSDate(state.calendarStartDate).startOf("month").plus({ month: forward ? 1 : -1 }).toJSDate() })
    }

    return (<PopOverV2 open={true} topBarTitle={patient ? `${patient.fullName} ${t('coordinator.patientProfile.listReports')}` : ""} handleExit={handleExit}>
        {currentDate ? <div>
            <DailyReport pastReport report={reportHash[currentDate]} />
        </div>
            :
            <Box flexGrow={1} display="flex" flexDirection="column" padding="1em">
                {status === "pending" ? <Loading /> :
                    <>
                        {patient ? <ReportingCalendar
                            updateMonth={updateMonth}
                            displayStartDate={calendarStartDate}
                            handleDateChange={setCurrentDate}
                            patient={patient}
                            reports={reportHash} /> : <p>Patient Not Found</p>}
                        <Box display="flex" alignItems={"center"} flexGrow={1}>
                            <CalendarKey />
                        </Box>
                    </>}

            </Box>}
    </PopOverV2 >)
}