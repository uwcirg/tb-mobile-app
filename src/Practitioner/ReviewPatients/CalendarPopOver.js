import React, { useCallback, useMemo } from 'react'
import PopOverV2 from '../../Components/Shared/PopOverV2'
import { useHistory, useParams } from 'react-router-dom'
import SharedAPI from '../../API/SharedAPI';
import useAsync from '../../Hooks/useAsync';
import ReportingCalendar from '../../Components/Shared/ReportingCalendar';
import { Box, Grid } from '@material-ui/core';
import Loading from '../Shared/CardLoading';

export default function CalendarPopOver({ patient }) {

    const history = useHistory();
    const { patientId } = useParams();

    const getDailyReports = useCallback(() => {
        return SharedAPI.getDailyReports(patientId)
    }, [patientId]);

    const handleExit = () => {
        history.push("/home/needs-review")
    }

    const { value, status } = useAsync(getDailyReports);

    const reportHash = useMemo(() => {
        return value ? value.reduce((prev, current,) => {
            const { date } = current;
            return { ...prev, [date]: current };
        }, {}) : {}
    }, [value])

    return (<PopOverV2 open={true} handleExit={handleExit}>
        <Box height="2em" />
        <Grid container justify='center'>
            {status === "pending" ? <Loading /> :
                <>
                    {patient ? <ReportingCalendar patient={patient} reports={reportHash} /> : <p>Patient Not Found</p>}
                </>
            }
        </Grid>
    </PopOverV2>)   
}