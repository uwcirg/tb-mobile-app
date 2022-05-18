import { ButtonBase, IconButton, Typography } from '@material-ui/core';
import { CameraAlt, ListAlt, Event } from '@material-ui/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../../Basics/Colors';

const useStyles = makeStyles({
    button: {
        width: "60px",
        color: Colors.buttonBlue,
        flexDirection: "column"
    },
    label:{
        fontSize: ".75em",
        textTransform: "capitalize"
    }
})


const ReportingHistoryLinks = ({ patient }) => {

    const { t } = useTranslation('translation');

    return (<>
        <SingleButton to={`${patient.id}/reports/calendar`} icon={<Event />} text={t('patient.tabNames.calendar')} />
        <SingleButton to={`${patient.id}/reports/list`} icon={<ListAlt />} text={t('commonWords.list')} />
        <SingleButton to={`${patient.id}/reports/photos`} icon={<CameraAlt />} text={t('commonWords.photos')} />
    </>)

}

const SingleButton = ({ icon, text, to }) => {

    const classes = useStyles();

    return (<ButtonBase className={classes.button} component={Link} to={to}>
        {icon}
        <Typography className={classes.label}>{text}</Typography>
    </ButtonBase>)
}

export default ReportingHistoryLinks;