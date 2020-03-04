import React from 'react'
import { DateTime } from 'luxon';
import NewButton from '../../Basics/NewButton';

import Clipboard from '@material-ui/icons/Assignment'
import Camera from '@material-ui/icons/CameraAlt';
import InteractionCard from './InteractionCard';

const ActionBox = () => {

    const handleClick = () =>{
        console.log("clicky")
    }

    return(<InteractionCard upperText={DateTime.local().toLocaleString(DateTime.DATE_HUGE)}>
            <NewButton onClick={handleClick} icon={<Clipboard />} text="Log Medication" />
            <NewButton onClick={handleClick} icon={<Camera />} text="Test Strip Photo" />

            <NewButton onClick={handleClick} positive icon={<Clipboard />} text="Test Check Button" />
        </InteractionCard>)

}

export default ActionBox;