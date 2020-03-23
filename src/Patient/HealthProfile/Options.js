import React, { useState } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import useStores from '../../Basics/UseStores'
import {observer} from 'mobx-react'

const Options = observer(() => {

    const {patientStore,uiStore} = useStores();

    const handleChange = () =>{
        uiStore.toggleLanguage();
    }

    return (
        <FormGroup>
            <FormControlLabel
                control={<Switch checked={uiStore.isSpanish} onChange={handleChange} name="checkedA" />}
                label="Spanish"
            />
        </FormGroup>
    )
});

export default Options;