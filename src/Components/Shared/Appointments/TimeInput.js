import React from 'react';
import TimeDialog from "../../TimeDialog";
import { useTranslation } from 'react-i18next';
import { useState } from "react";
import { DateTime } from "luxon";
import { Box, Grid, Typography } from "@material-ui/core";
import { KeyboardArrowDown } from '@material-ui/icons';
import Colors from '../../../Basics/Colors';

export default function TimeInput({ value, setValue }) {

    const [state, setState] = useState({
        open: false,
        tempValue: value
    })

    const { tempValue, open } = state;

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
                <Box role='input' onClick={toggleOpen} padding="8px 8px 8px 16px" borderRadius="4px" border="solid 1px lightgray">
                    <Grid alignItems='center' container>
                        <Typography>{DateTime.fromISO(value).toLocaleString(DateTime.TIME_24_SIMPLE)}</Typography>
                        <Box flexGrow={1} />
                        <KeyboardArrowDown style={{ fontSize: "2em", color: Colors.textDarkGray }} />
                    </Grid>

                </Box>
        </>
    )
}