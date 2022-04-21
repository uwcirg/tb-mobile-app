import React from 'react';
import { makeStyles, Grid, Box, IconButton } from '@material-ui/core';
import PractitionerAPI from '../../API/PractitionerAPI';
import PatientCard from '../ReviewPatients/PatientCard';
import { Refresh } from '@material-ui/icons';
import OverTopBar from '../../Patient/Navigation/OverTopBar';
import useStores from '../../Basics/UseStores';
import MessagingPopover from '../ReviewPatients/MessagingPopover';
import { observer } from 'mobx-react';
import LoadingPatients from '../ReviewPatients/LoadingPatients';
import ReviewPatientTabs from '../ReviewPatients/Tabs';
import {DateTime} from 'luxon';
import useAsync from '../../Hooks/useAsync';

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

const wasToday = (isoTime) => {
    return DateTime.fromISO(isoTime).toISODate() === DateTime.local().toISODate()
}

const PractitionerHome = observer(() => {

    const { uiStore } = useStores();
    const { value, execute, status, setValue } = useAsync(PractitionerAPI.getPatientIssues,true)

    const tabValue = uiStore.pathname === "/home/reviewed" ? 1 : 0

    const channelId = new URLSearchParams(uiStore.urlSearchParams).get('onMessagingChannelId')
    const channelName = value?.find(each => {
        return each.channelId === parseInt(channelId)
    })?.fullName

    const patientsToDisplay = (value || []).filter( _patient => { 
        const alreadyReviewed = wasToday(_patient.lastGeneralResolution);
        return tabValue === 0 ? !alreadyReviewed : alreadyReviewed 
    })

    const markPatientAsReviewed = (patientId) => {
        let tempValue = [...value]
        const indexOfPatient = tempValue.findIndex(each => {return each.id === patientId})
        tempValue[indexOfPatient].lastGeneralResolution = DateTime.local().toISO()
        setValue(tempValue)
    }

    return (<div>
        {/* <TopBar refresh={refresh} /> */}
        <ReviewPatientTabs value={tabValue} />
        <Box height="48px" />
        <button onClick={execute}>Refresh</button>
        <MessagingPopover channelName={channelName} channelId={channelId} open={!!channelId} />
        {status === "pending" && <LoadingPatients />}
        {value && <>
            <Grid container direction="column">
                <Box height={".5em"} aria-hidden />
                {patientsToDisplay.map(patient => {
                    return <Box key={`review-patient-${patient.id}`} padding='0 .5em .5em .5em'>
                        <PatientCard markPatientAsReviewed={markPatientAsReviewed} patient={patient} />
                    </Box>
                })}
                <Box height="60px" aria-hidden />
            </Grid>
        </>}
        </div>)
})

export default PractitionerHome;