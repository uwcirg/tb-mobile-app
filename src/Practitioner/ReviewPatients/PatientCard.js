import React from 'react';
import { makeStyles, Grid, IconButton, Box, Typography } from '@material-ui/core';
import { Check, Message } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Colors from '../../Basics/Colors';

const useStyles = makeStyles({
    container: {
        width: "100%",
        backgroundColor: Colors.lighterGray,
        boxSizing: "border-box",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
        "& a, & a:visited":{
            textDecoration: "none"
        }
    },
    name:{
        fontSize: "1em",
        color: Colors.buttonBlue

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
            <Typography>{patient.adherence}</Typography>
        </Grid>
        <Grid container style={{width: "100%"}}>
            <Box flexGrow={1} />
            <ButtonArea />
        </Grid>
    </Box>)

}

const ButtonArea = () => {
    return (
        <>
            <IconButton style={{backgroundColor: 'rgba(66, 133, 244, 0.15)', padding: ".25em"}}>
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