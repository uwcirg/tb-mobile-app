import React from 'react';
import { makeStyles, Grid, Box, IconButton, Typography } from '@material-ui/core';
import PractitionerAPI from '../../API/PractitionerAPI';
import useRequestInitalData from '../../Hooks/useRequestInitalData';
import PatientCard from '../ReviewPatients/PatientCard';
import { Refresh } from '@material-ui/icons';
import OverTopBar from '../../Patient/Navigation/OverTopBar';
import useStores from '../../Basics/UseStores';
import MessagingPopover from '../ReviewPatients/MessagingPopover';
import { observer } from 'mobx-react';
import LoadingPatients from '../ReviewPatients/LoadingPatients';
import ReviewPatientTabs from '../ReviewPatients/Tabs';

const useStyles = makeStyles({

})

const TopBar = ({ refresh }) => {
    return (
        <>
            <OverTopBar hideIconButton title={<Grid alignItems='center' container>
                Review Patients
                <IconButton onClick={refresh}>
                    <Refresh />
                </IconButton>
            </Grid>} />
            <Box aria-hidden height="60px" />
        </>)
}

const PractitionerHome = observer(() => {

    const classes = useStyles();
    const { uiStore } = useStores();
    const { data, refresh, loading } = useRequestInitalData(PractitionerAPI.getPatientIssues)


    const value = uiStore.pathname === "/home/reviewed" ? 1 : 0

    const channelId = new URLSearchParams(uiStore.urlSearchParams).get('onMessagingChannelId')
    const channelName = data?.find(each => {
        return each.channelId === parseInt(channelId)
    })?.fullName

    // const patientsToDisplay = data.filter(_patient => {return })

    return (<div>
        {/* <TopBar refresh={refresh} /> */}
        <ReviewPatientTabs value={value} />
        <Box height="48px" />
        <MessagingPopover channelName={channelName} channelId={channelId} open={!!channelId} />
        {loading && <LoadingPatients />}
        {data && <>
            <Grid container direction="column">
                <Box height={".5em"} aria-hidden />
                {data.map(patient => {
                    return <Box key={`review-patient-${patient.id}`} padding='0 .5em .5em .5em'>
                        <PatientCard patient={patient} />
                    </Box>
                })}
                <Box height="60px" aria-hidden />
            </Grid>
        </>}
        </div>)
})

export default PractitionerHome;