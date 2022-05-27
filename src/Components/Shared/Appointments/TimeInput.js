import React from 'react';
import TimeDialog from "../../TimeDialog";
import { useTranslation } from 'react-i18next';
import { useState } from "react";
import { DateTime } from "luxon";
import { Input } from "@material-ui/core";


export default function TimeInput({ value, setValue }) {

    const [state, setState] = useState({
        open: false,
        tempValue: value
    })

    const {tempValue, open } = state;

    const toggleOpen = () => {
        setState({ ...state, open: !state.open })
    }

    const setTempValue = (value) => {
        setState({ ...state, tempValue: value })
    }

    const handleAccept = () => {
        setValue(tempValue)
        toggleOpen();
    }

    const { t } = useTranslation('translation');

    return (
        <>
            <TimeDialog
                title={t('patient.reminders.whatTime')}
                open={open}
                handleCancel={toggleOpen}
                value={tempValue}
                setValue={setTempValue}
                closeDialog={toggleOpen}
                handleAccept={handleAccept} />
            <Input InputProps={{ readOnly: true }} label={t('report.time')} onClick={toggleOpen}
                value={DateTime.fromISO(value).toLocaleString(DateTime.TIME_SIMPLE)}
            />
        </>
    )
}