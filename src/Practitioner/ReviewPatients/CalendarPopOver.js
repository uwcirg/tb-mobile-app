import React from 'react'
import PopOverV2 from '../../Components/Shared/PopOverV2'
import {useHistory} from 'react-router-dom'
import Calendar from '../../Patient/Progress/Calendar'

export default function CalendarPopOver({ patientId }) {

    const history = useHistory();

    const handleExit = () => {
        history.push("/home/needs-review")
    }

    return (<PopOverV2 open={true} handleExit={handleExit}>
            <Calendar />
    </PopOverV2>)
}