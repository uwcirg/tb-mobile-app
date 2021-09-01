import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Colors from '../Basics/Colors';
import Tag from '../Components/Tag';

const useStyles = makeStyles({
    body: {
        textTransform: "capitalize",
        fontSize: "1em"
    }
})

const getColor = (conclusive) => {
    if (conclusive === false) {
        return Colors.calendarRed;
    } else if (conclusive === true) {
        return Colors.calendarGreen;
    } else {
        return Colors.gray;
    }
}

const PhotoStatus = ({ conclusive = null }) => {

    const classes = useStyles({ conclusive: conclusive });
    const { t } = useTranslation('translation');
    let text;

    if (conclusive === false) {
        text = t('report.inconclusive')
    } else if (conclusive === true) {
        text = t('report.conclusive')
    } else {
        text = t('report.pending')
    }

    return (
        <Tag className={classes.body} backgroundColor={getColor(conclusive)}>{text}</Tag>
    )

}

export default PhotoStatus;