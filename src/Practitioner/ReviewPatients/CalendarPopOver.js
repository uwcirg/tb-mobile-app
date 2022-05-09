import React, { useCallback, useMemo } from 'react'
import PopOverV2 from '../../Components/Shared/PopOverV2'
import { useHistory, useParams } from 'react-router-dom'
import SharedAPI from '../../API/SharedAPI';
import useAsync from '../../Hooks/useAsync';
import ReportingCalendar from '../../Components/Shared/ReportingCalendar';
import { Box } from '@material-ui/core';
import Loading from '../Shared/CardLoading';
import CalendarKey from '../../Components/Shared/ReportingCalendar/CalendarKey';
import { useTranslation } from 'react-i18next';

export default function CalendarPopOver({ patient }) {

    const { t } = useTranslation('translation');

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

    return (<PopOverV2 open={true} topBarTitle={patient ? `${patient.fullName} ${t('coordinator.patientProfile.listReports')}` : ""} handleExit={handleExit}>
        <Box padding="1em">
            {status === "pending" ? <Loading /> :
                <>
                    {patient ? <ReportingCalendar patient={patient} reports={reportHash} /> : <p>Patient Not Found</p>}
                    <Box>
                        <CalendarKey />
                    </Box>
                </>
            }
        </Box>
    </PopOverV2 >)
}