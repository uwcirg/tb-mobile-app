import React from 'react';
import {observer } from 'mobx-react';
import useStores from '../../Basics/UseStores';

const ReportConfirmation = observer(() => {

    const {patientStore} = useStores();

    return(
        <div>
            HI
            { patientStore.medicationTime}
        </div>
        )
});


export default ReportConfirmation;