import React from 'react';
import { makeStyles, Grid, IconButton, Box, Typography } from '@material-ui/core';
import { Check, Message } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Colors from '../../Basics/Colors';
import IssueArea from './IssueArea';
import AdherenceLabel from './AdherenceLabel';
import { daysSinceISODateTime } from '../../Utility/TimeUtils';
import { useTranslation } from 'react-i18next';
import useAsync from '../../Hooks/useAsync';
import PractitionerAPI from '../../API/PractitionerAPI';

const useStyles = makeStyles({
    container: {
        width: "100%",
        backgroundColor: "white",
        boxSizing: "border-box",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
        "& a, & a:visited": {
            textDecoration: "none"
        }
    },
    name: {
        fontSize: "1.25em",
        color: Colors.buttonBlue
    },
    bottomSection: {
        width: "100%"
    },
    messaged: {
        fontSize: ".9em",
        color: Colors.textDarkGray
    }
})

const PatientCard = ({ patient }) => {

    const classes = useStyles();
    const { t } = useTranslation('translation');

    const resolvePatient = async () => {
        return PractitionerAPI.resolvePatient(patient.id);
    }

    const { execute, status, value, error } = useAsync(resolvePatient, false);

    if (!patient) {
        return <p>Error</p>
    }

    const daysSinceLastMessage = patient.lastContacted ? Math.round(daysSinceISODateTime(patient.lastContacted)) : "N/A"

    return (<Box className={classes.container} padding="1em">
        <Grid container wrap='nowrap'>
            <Link to={`/patients/${patient.id}`}>
                <Typography className={classes.name} >{patient.fullName}</Typography>
            </Link>
            <Box flexGrow={1} />
            <AdherenceLabel patient={patient} />
        </Grid>
        <Box padding=".5em 0">
            <Typography className={classes.messaged}>
                <strong>Messaged: </strong>
                {daysSinceLastMessage} {t('time.day_ago', { count: daysSinceLastMessage })}
            </Typography>
        </Box>
        <Grid alignItems='center' wrap="nowrap" container className={classes.bottomSection}>
            <IssueArea patient={patient} />
            <Box flexGrow={1} />
            <ButtonArea patient={patient} resolvePatient={execute} />
        </Grid>
    </Box>)

}

const ButtonArea = ({ patient, resolvePatient }) => {
    return (
        <>
            <IconButton component={Link} to={`?onMessagingChannelId=${patient.channelId}`} style={{ backgroundColor: 'rgba(66, 133, 244, 0.15)', padding: ".25em" }}>
                <Message style={{ color: Colors.buttonBlue }} />
            </IconButton>
            <Box width=".5em" />
            <IconButton onClick={resolvePatient} style={{ backgroundColor: Colors.calendarGreen, padding: ".25em" }}>
                <Check style={{ color: Colors.approvedGreen }} />
            </IconButton>
        </>
    )
}

export default PatientCard;