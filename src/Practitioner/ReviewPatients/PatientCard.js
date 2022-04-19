import React from 'react';
import { makeStyles, Grid, IconButton, Box, Typography } from '@material-ui/core';
import { Check, Message } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Colors from '../../Basics/Colors';
import IssueArea from './IssueArea';
import AdherenceLabel from './AdherenceLabel';

const useStyles = makeStyles({
    container: {
        width: "100%",
        backgroundColor: "white",
        boxSizing: "border-box",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
        "& a, & a:visited":{
            textDecoration: "none"
        }
    },
    name:{
        fontSize: "1.25em",
        color: Colors.buttonBlue
    },
    bottomSection:{
        width: "100%"
    },
    messaged:{
        fontSize: ".9em",
        color: Colors.textDarkGray
    }
})

const PatientCard = ({ patient }) => {

    const classes = useStyles();

    if (!patient) {
        return <p>Error</p>
    }

    return (<Box className={classes.container} padding="1em">
        <Grid container wrap='nowrap'>
            <Link to={`/patients/${patient.id}`}>
              <Typography className={classes.name} >{patient.fullName}</Typography>  
                </Link>
            <Box flexGrow={1} />
            <AdherenceLabel patient={patient} />
        </Grid>
        <Box padding=".5em 0">
            <Typography className={classes.messaged}><strong>Messaged:</strong> 1 day ago</Typography>
        </Box>
        <Grid alignItems='center' wrap="nowrap" container className={classes.bottomSection}>
            <IssueArea patient={patient} />
            <Box flexGrow={1} />
            <ButtonArea patient={patient} />
        </Grid>
    </Box>)

}

const ButtonArea = ({patient}) => {
    return (
        <>
            <IconButton component={Link} to={`?onMessagingChannelId=${patient.channelId}`} style={{backgroundColor: 'rgba(66, 133, 244, 0.15)', padding: ".25em"}}>
                <Message style={{color: Colors.buttonBlue}} />
            </IconButton>
            <Box width=".5em" />
            <IconButton style={{backgroundColor: Colors.calendarGreen, padding: ".25em"}}>
                <Check style={{color: Colors.approvedGreen}} />
            </IconButton>
        </>
    )
}

export default PatientCard;