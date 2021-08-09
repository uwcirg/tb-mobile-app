import React from 'react';
import PhotoIcon from '@material-ui/icons/CameraAlt';
import Colors from '../../../Basics/Colors';
import MissedActionCard from './MissedActionCard';
import Buttonlayout from './ButtonLayout';

const MissedPhoto = () => {

    return (<MissedActionCard>
        <Buttonlayout
            text="Submit missed photo"
            icon={<PhotoIcon />}
            color={Colors.warningRed}
        />
    </MissedActionCard>)

}

export default MissedPhoto;