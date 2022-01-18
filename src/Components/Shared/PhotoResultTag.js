import React from 'react';
import { useTranslation } from 'react-i18next';
import Tag from '../Tag';
import Colors from '../../Basics/Colors';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    tag: {
        display: "block",
        fontSize: ".8em",
        width: "fit-content",
        padding: "2px 8px",
        fontWeight: "bold"
    }
})

const PhotoResultTag = ({ approved, skipped }) => {

    const { t } = useTranslation('translation');
    const classes = useStyles();

    let text = "";
    let color = "";

    if (skipped) {
        color = Colors.calendarRed;
        text = t('dashboard.skippedPhoto');
    } else if (approved === null) {
        color = Colors.lightgray;
        text = t('photoReportReview.awaiting');
    } else if (approved) {
        color = Colors.calendarGreen;
        text = t('photoReportReview.detected');
    } else {
        color = Colors.highlightYellow;
        text = t('photoReportReview.unclear');
    }

    return <Tag className={classes.tag} backgroundColor={color}>{text}</Tag>
}

export default PhotoResultTag;