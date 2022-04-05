import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Colors from '../../../Basics/Colors';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { useTranslation } from 'react-i18next';
import DateRangeIcon from '@material-ui/icons/DateRange';
import CompletionButton from './CompletionButton'

const useStyles = makeStyles({
    container: {
        boxSizing: "border-box",
        width: "100%",
        borderTop: `1px solid ${Colors.lightgray}`,
        paddingTop: "1em",
        "& a:visited , & a":{
            color: "black",
            textDecoration: "none"
        }
    }
})

const ReviewPhotos = () => {

    const classes = useStyles();
    const { t } = useTranslation('translation');

    return (
        <div className={classes.container}>
             <CompletionButton to="/progress" icon={<DateRangeIcon />} text={t('patient.progress.calendar')} />
            <Box height=".5em" />
            <CompletionButton icon={<PhotoLibraryIcon />} text={t('redoPhoto.viewMyPhotos')} />
        </div>
    )
}

export default ReviewPhotos;