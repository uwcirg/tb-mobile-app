import React, { useCallback } from 'react'
import PopOverV2 from '../../Components/Shared/PopOverV2'
import { useHistory, useParams } from 'react-router-dom'
import Calendar from '../../Patient/Progress/Calendar'
import SharedAPI from '../../API/SharedAPI';
import useAsync from '../../Hooks/useAsync';

export default function CalendarPopOver() {

    const history = useHistory();
    const { patientId } = useParams();

    const getDailyReports = useCallback(() => {
        return SharedAPI.getDailyReports(patientId)
    }, [patientId]);

    const handleExit = () => {
        history.push("/home/needs-review")
    }

    const { value, status } = useAsync(getDailyReports);

    return (<PopOverV2 open={true} handleExit={handleExit}>
        <p>{patientId}</p>
        <Calendar />
    </PopOverV2>)
}