import { DateTime } from 'luxon';
import React, { useState } from 'react';
import Form from './Form';

export default function AddAppointment() {

    const [state, setState] = useState({
        category: "",
        time: null,
        note: "",
        datetime: DateTime.local().toISO(),
        tempDatetime: DateTime.local().toISO()
    })

    return (<Form state={state} setState={setState} />)
}