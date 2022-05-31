import { DateTime } from 'luxon';
import React, { useState } from 'react';
import SharedAPI from '../../../../API/SharedAPI';
import useAsync from '../../../../Hooks/useAsync';
import TopPageLabel from '../../TopPageLabel';
import Form from './Form';
import { useTranslation } from 'react-i18next';

export default function AddAppointment({ patientId }) {

    const { t } = useTranslation('translation');

    const [state, setState] = useState({
        category: "",
        time: null,
        note: "",
        datetime: DateTime.local().toISO(),
        tempDatetime: DateTime.local().toISO()
    })

    const createAppointment = async () => {
        return SharedAPI.addAppointment(patientId, state);
    }

    const { execute, value, error, status } = useAsync(createAppointment, false)


    return (

        <>
            <TopPageLabel sticky title={t('appointments.addAppointment')} />
            <Form state={state} setState={setState} handleSubmit={execute} />
        </>
    )
}