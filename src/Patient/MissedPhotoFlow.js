import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../Basics/UseStores';
import { observer } from 'mobx-react';
import OverTopBar from './Navigation/OverTopBar';

const useStyles = makeStyles({

})

const MissedPhotoFlow = () => {

    const classes = useStyles();
    const { patientUIStore } = useStores();

    return (<>
        <OverTopBar handleBack={patientUIStore.goToHome} title="Submit Old Photo" />
        <div>
            <p>Missed photo flow</p>
        </div>
    </>)

}

export default MissedPhotoFlow;