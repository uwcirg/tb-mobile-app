import React from 'react'
import { DateTime } from 'luxon';
import NewButton from '../../Basics/NewButton';

import Clipboard from '@material-ui/icons/Assignment'
import Camera from '@material-ui/icons/CameraAlt';
import InteractionCard from './InteractionCard';
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react'

const ActionBox = observer(() => {


    const {patientStore} = useStores();

    let weekday = DateTime.local().weekday;
    let weekSinceStart = Math.floor(DateTime.fromISO(patientStore.treatmentStart).diffNow("weeks").weeks * -1)
    let isPhotoDay = patientStore.photoSchedule[weekSinceStart].includes(weekday)

    console.log(weekSinceStart)
    console.log(patientStore.photoSchedule[weekSinceStart])

    //console.log(weekSinceStart)

    const handleClick = () =>{
        patientStore.onTreatmentFlow = true;
    }

    return(<InteractionCard upperText={"Action Needed"}>
            <NewButton onClick={handleClick} icon={<Clipboard />} text="Log Medication" />
            {isPhotoDay && <NewButton onClick={handleClick} icon={<Camera />} text="Upload Photo" />}
            {/*<NewButton onClick={handleClick} positive icon={<Clipboard />} text="Test Check Button" />*/}
        </InteractionCard>)

});

export default ActionBox;