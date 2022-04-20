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

const useStyles = makeStyles({

})

const PractitionerHome = observer(() => {

    const classes = useStyles();
    const { uiStore } = useStores();
    const { data, refresh, error, loading } = useRequestInitalData(PractitionerAPI.getPatients)

    const channelId =  new URLSearchParams(uiStore.urlSearchParams).get('onMessagingChannelId')
    const channelName = data?.find( each => {
        return each.channelId === parseInt(channelId)
    })?.fullName

    return (<div>
        <MessagingPopover channelName={channelName} channelId={channelId} open={!!channelId} />
        <OverTopBar hideIconButton title={<Grid alignItems='center' container>
            Review Patients
            <IconButton onClick={refresh}>
                <Refresh />
            </IconButton>
        </Grid>} />
        <Box aria-hidden height="60px" />
        {loading && <p>Data is loading</p>}
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
        </>}</div>)
})

export default PractitionerHome;