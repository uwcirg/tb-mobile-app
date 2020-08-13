import React from 'react'
import useStores from './UseStores';
import { observer } from 'mobx-react'
import { DatePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/luxon';
import { useTranslation } from 'react-i18next';
import Cancel from '@material-ui/icons/Cancel'
import Check from '@material-ui/icons/CheckCircleOutline'
import Colors from './Colors';


const LocalizedDatePicker = observer((props) => {

    const {uiStore} = useStores();
    const { t, i18n } = useTranslation('translation');

    return (
    <MuiPickersUtilsProvider locale={uiStore.locale} utils={DateFnsUtils}>
        <DatePicker
            error={props.error}
            label={props.label}
            value={props.value}
            onChange={props.onChange}
            animateYearScrolling
            disableFuture={props.disableFuture}
            disablePast={props.disablePast}
            cancelLabel={<Cancel style={{color: Colors.red}} />}
            okLabel={<Check style={{color: Colors.green}} />}
        />
    </MuiPickersUtilsProvider>
    )

});

export default LocalizedDatePicker;