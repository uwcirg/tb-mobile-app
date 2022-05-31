import React from 'react';
import InputDisplay from './InputDisplay';
import { useTranslation } from 'react-i18next';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/luxon';

export default function DateInput({ value, setValue }) {

    const { i18n } = useTranslation('translation');

    return (<MuiPickersUtilsProvider locale={i18n.language} utils={DateFnsUtils}>
        <DatePicker
            TextFieldComponent={InputDisplay}
            value={value}
            onChange={(e) => { setValue(e) }}
            animateYearScrolling
            disablePast
        />
    </MuiPickersUtilsProvider>)
}

