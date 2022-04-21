import React, { useEffect, useState } from 'react';
import { makeStyles, Grid, IconButton, Box, Typography, Collapse, CircularProgress, ExpansionPanel, Button } from '@material-ui/core';
import { Check, KeyboardArrowDown, Message } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Colors from '../../Basics/Colors';
import IssueArea from './IssueArea';
import AdherenceLabel from './AdherenceLabel';
import { daysSinceISODateTime } from '../../Utility/TimeUtils';
import { useTranslation } from 'react-i18next';
import useAsync from '../../Hooks/useAsync';
import PractitionerAPI from '../../API/PractitionerAPI';
import TreatmentWeek from './TreatmentWeek';
import useToggle from '../../Hooks/useToggle';
import Plus from '@material-ui/icons/AddCircle';
import Minus from '@material-ui/icons/RemoveCircle';

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

const PatientCard = ({ patient, markPatientAsReviewed, isReviewed }) => {

    const classes = useStyles();
    const { t } = useTranslation('translation');
    const [reviewed, setReviewed] = useState(false);
    const [showDetails, toggleDetails] = useToggle(false);

    const resolvePatient = async () => {
        return PractitionerAPI.resolvePatient(patient.id);
    }

    const { execute, status, value, error } = useAsync(resolvePatient, false);
    const success = status === "success";

    const handleExit = () => {
        if (success) {
            markPatientAsReviewed(patient.id);
        }
    }

    useEffect(() => {
        let timeout;
        if (success) {
            timeout = setTimeout(() => {
                setReviewed(true);
            }, 2000)
        }
        return function cleanup() {
            clearTimeout(timeout);
        }
    }, [status])

    const daysSinceLastMessage = patient.lastContacted ? Math.round(daysSinceISODateTime(patient.lastContacted)) : "N/A"

    return (
        <Collapse onExited={handleExit} in={!reviewed}>
            <Box className={classes.container} padding=".75em">
                {success ? <Grid container alignItems='center' style={{ height: "100%", width: "100%" }}>
                    <p>Review Submitted</p>
                </Grid> : <>
                    <Grid alignItems='center' container wrap='nowrap'>
                        <Link to={`/patients/${patient.id}`}>
                            <Typography className={classes.name} >{patient.fullName}</Typography>
                        </Link>
                        <Box flexGrow={1} />
                        <TreatmentWeek patient={patient} />
                        <Box width=".5em" />
                        <AdherenceLabel patient={patient} />
                    </Grid>
                    {/* <Typography className={classes.messaged}>
                        <strong>Messaged: </strong>
                        {daysSinceLastMessage} {t('time.day_ago', { count: daysSinceLastMessage })}
                    </Typography> */}
                    <Box height=".5em" />
                    <Grid alignItems='center' wrap="nowrap" container className={classes.bottomSection}>
                        <IssueArea patient={patient} />
                        <Box flexGrow={1} />
                        <Button style={{ width: "fit-content", paddingRight: "0", justifyContent: "flex-end", textTransform: "none", color: Colors.buttonBlue }} onClick={toggleDetails}>
                            {!showDetails && <Typography style={{ paddingRight: ".5em" }} noWrap>Review Issues</Typography>}
                            {showDetails ? <Minus /> : <Plus />}
                        </Button>
                    </Grid>
                    <Collapse in={showDetails}>
                        <Box padding="1em 0">
                            <Typography>Photo to Review</Typography>
                            <Typography>Symptoms</Typography>
                            <Typography>Missed Reporting</Typography>
                        </Box>
                        <ButtonArea isReviewed={isReviewed} loading={status === "pending"} patient={patient} resolvePatient={execute} />
                    </Collapse>
                </>}
            </Box>
        </Collapse>
    )
}

const ButtonArea = ({ patient, resolvePatient, loading, isReviewed }) => {
    return (
        <Grid wrap="nowrap" justify='flex-end' container>
            <IconButton component={Link} to={`?onMessagingChannelId=${patient.channelId}`} style={{ backgroundColor: 'rgba(66, 133, 244, 0.15)', padding: ".25em" }}>
                <Message style={{ color: Colors.buttonBlue }} />
            </IconButton>
            {!isReviewed && <>
                <Box width=".5em" />
                <IconButton onClick={resolvePatient} style={{ backgroundColor: Colors.calendarGreen, padding: ".25em" }}>
                    {loading ? <CircularProgress style={{ color: Colors.gray }} size="1em" variant='indeterminate' /> : <Check style={{ color: Colors.approvedGreen }} />}
                </IconButton></>}
        </Grid>
    )
}

export default PatientCard;