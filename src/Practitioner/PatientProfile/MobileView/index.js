import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../../Basics/UseStores';
import { observer } from 'mobx-react';
import StickyTopBar from '../../../Components/Shared/StickyTopBar';
import { Box, Grid, IconButton, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Colors from '../../../Basics/Colors';
import Priority from '../../Shared/Priority';
import ButtonList from '../ProfileButtonList';
import Label from '../../../Components/Label';

const useStyles = makeStyles({
    card: {
        "&:not(:first-child)": {
            marginTop: ".5em"
        }
    },
    buttons:{
        "& > button:not(:first-child)": {
            marginTop: ".5em"
        }
    }
})

const TopBar = ({ fullName }) => {
    return (<StickyTopBar >
        <Box bgcolor="white" borderBottom="solid 1px gray">
            <Grid alignItems='center' container wrap="nowrap">
                <IconButton component={Link} to="/home/needs-review">
                    <ChevronLeft />
                </IconButton>
                <Typography>
                    {fullName}
                </Typography>
            </Grid>
        </Box>
    </StickyTopBar>)
}

const Card = ({ children }) => {

    const classes = useStyles();

    return <Box className={classes.card} padding="1em" borderRadius="4px" bgcolor={"white"} >
        {children}
    </Box>

}

const MobileView = observer(() => {

    const classes = useStyles();
    const { patientProfileStore } = useStores();

    const { fullName, lastReport, weeksInTreatment, priority } = patientProfileStore.selectedPatient.details

    return (
        <>
            <TopBar fullName={fullName} />
            <Box minHeight="90vh" bgcolor={Colors.lightgray} padding=".5em">
                <Card>
                    <Typography>Last Report: {lastReport.createdAt}</Typography>
                    <Grid container>
                        <Typography>Priority:</Typography>
                        <Box width=".5em" />
                        <Priority index={priority} />
                    </Grid>
                    <Grid container>
                    <Typography>Status:</Typography>
                    <Label text={`Week ${weeksInTreatment} / 26`} backgroundColor={Colors.accentBlue} />
                    </Grid>
                </Card>
                <Card>
                    <Typography>Actions</Typography>
                    <Grid container className={classes.buttons} direction='column'>
                        <ButtonList />
                    </Grid>
                </Card>
            </Box>
        </>)

});

/*
adherence: (...)
age: (...)
appStartTime: (...)
channelId: (...)
contactTracingSurvey: (...)
daysInTreatment: (...)
familyName: (...)
fullName: (...)
gender: (...)
givenName: (...)
id: (...)
lastContacted: (...)
lastMissedDay: (...)
lastReport: (...)
lastSymptoms: (...)
medicationSummary: (...)
organizationId: (...)
percentageComplete: (...)
phoneNumber: (...)
photoAdherence: (...)
photoSummary: (...)
priority: (...)
reportingStatus: (...)
status: (...)
supportRequests: (...)
treatmentEndDate: (...)
treatmentStart: (...)
weeksInTreatment: (...)
*/

export default MobileView;