import React from 'react';
import PhotoIcon from '@material-ui/icons/CameraAlt';
import useStores from '../../../Basics/UseStores';
import MissedActionCard from './MissedActionCard';
import { useTranslation } from 'react-i18next';
import Colors from '../../../Basics/Colors';
import Buttonlayout from './ButtonLayout';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import FeedbackIcon from '@material-ui/icons/Feedback';

const useStyles = makeStyles({
    subText: {
        textTransform: "none",
        color: Colors.textGray,
        display: "block",
        fontSize: "14px",
        lineHeight: "16px"
    },
    badge: {
        zIndex: 0,
        color: Colors.yellow,
        fontSize: "1.25em"
    }
})


const RedoPhoto = () => {

    const classes = useStyles();
    const { t } = useTranslation('translation');
    const { uiStore } = useStores();

    const openMissedPhoto = () => { uiStore.push('/redo-photo') };

    return (
        <MissedActionCard on>
            <Buttonlayout
                icon={<Badge badgeContent={<FeedbackIcon className={classes.badge} />}>
                    <PhotoIcon />
                </Badge>}
                color={Colors.warningRed}
                onClick={openMissedPhoto}>
                <Box padding=".5em">
                    <span>{t('redoPhoto.title')}</span>
                    <span className={classes.subText}>{t('redoPhoto.subtitle')}</span>
                </Box>
            </Buttonlayout>
        </MissedActionCard>)

}

export default RedoPhoto;