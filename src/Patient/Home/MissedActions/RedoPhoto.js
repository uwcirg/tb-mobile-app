import React from 'react';
import PhotoIcon from '@material-ui/icons/CameraAlt';
import useStores from '../../../Basics/UseStores';
import MissedActionCard from './MissedActionCard';
import { useTranslation } from 'react-i18next';
import Colors from '../../../Basics/Colors';
import Buttonlayout from './ButtonLayout';
import { DateTime } from 'luxon';
import { observer } from 'mobx-react';
import { Badge, makeStyles } from '@material-ui/core';
import FeedbackIcon from '@material-ui/icons/Feedback';

const useStyles = makeStyles({
    subText: {
        textTransform: "none",
        color: Colors.textGray,
        display: "block",
        fontSize: "14px",
        lineHeight: "16px"
    }
})


const RedoPhoto = () => {

    const classes = useStyles();
    const { t } = useTranslation('translation');
    const { uiStore, patientStore } = useStores();
    const openMissedPhoto = () => { uiStore.push('/redo-photo') };
    const formattedDate = DateTime.fromISO(patientStore.lastPhotoRequestStatus.dateOfRequest).toLocaleString({month: "long", day: "numeric"});

    return (
        <MissedActionCard on>
            <Buttonlayout
                text={
                    <div style={{paddingLeft: ".5em"}}>
                        {"Issue with last test"}
                        <br />
                        <span className={classes.subText}>Your assistant has provided feedback to review</span>
                    </div>
                }
                icon={<Badge badgeContent={<FeedbackIcon style={{color: Colors.yellow, fontSize: "1.25em"}} />}>
                    <PhotoIcon/> 
                    </Badge>}
                   
                color={Colors.warningRed}
                onClick={openMissedPhoto}
            />
        </MissedActionCard>)

}

export default RedoPhoto;