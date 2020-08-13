import React from 'react'
import useStores from './UseStores';
import { observer } from 'mobx-react'
import { DatePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/luxon';
import { useTranslation } from 'react-i18next';


const LocalizedDatePicker = observer((props) => {

    const {uiStore} = useStores();
    const { t, i18n } = useTranslation('translation');

    return (
    <MuiPickersUtilsProvider locale={uiStore.locale} utils={DateFnsUtils}>
        <DatePicker
            label={props.label}
            value={props.value}
            onChange={props.onChange}
            animateYearScrolling
            disablePast
        />
    </MuiPickersUtilsProvider>
    )

});

export default LocalizedDatePicker;