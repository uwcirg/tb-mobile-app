import { DateTime } from 'luxon';
import React, { useCallback, useState } from 'react';
import SharedAPI from '../../../../API/SharedAPI';
import useAsync from '../../../../Hooks/useAsync';
import TopPageLabel from '../../TopPageLabel';
import Form from './Form';
import { useTranslation } from 'react-i18next';
import Loading from '../../../../Practitioner/Shared/CardLoading';
import { Box } from '@material-ui/core';
import useAsyncV2 from '../../../../Hooks/useAsyncV2';

export default function AddAppointment({ patientId }) {

    const { t } = useTranslation('translation');

    const [state, setState] = useState({
        category: "",
        time: null,
        note: "",
        datetime: DateTime.local().toISO(),
        tempDatetime: DateTime.local().toISO()
    })


    const { execute, status, value, error} = useAsyncV2({
        asyncFunc: SharedAPI.addAppointment,
        immediate: false,
        funcParams: [patientId, state ]
    })

    return (

        <>
            <TopPageLabel sticky title={t('appointments.addAppointment')} />
            <p>Status: {status}</p>
            {error && <p>Error: {error.status}</p>}
            {status === "idle" && <Form state={state} setState={setState} handleSubmit={execute} />}
            {status === "loading" && <p>Loading</p>}
            {value && <Box paddingTop="10rem">
                <p>Succesfully added</p>
            </Box>}
        </>
    )
}