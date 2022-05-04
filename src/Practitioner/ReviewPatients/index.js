import React, { useEffect } from 'react';
import { Grid, Box, IconButton, Typography, makeStyles } from '@material-ui/core';
import PractitionerAPI from '../../API/PractitionerAPI';
import PatientCard from './PatientCard';
import { Search } from '@material-ui/icons';
import OverTopBar from '../../Patient/Navigation/OverTopBar';
import useStores from '../../Basics/UseStores';
import MessagingPopover from './MessagingPopover';
import { observer } from 'mobx-react';
import LoadingPatients from './LoadingPatients';
import ReviewPatientTabs from './Tabs';
import { DateTime } from 'luxon';
import useAsync from '../../Hooks/useAsync';
import StickyTopBar from '../../Components/Shared/StickyTopBar';
import Colors from '../../Basics/Colors';
import addIssuesToPatients from '../../Utility/FindIssues';
import PatientIssueContext from './PatientIssuesContext';

const TopBar = () => {
    return (
        <>
            <OverTopBar notFixed hideIconButton title={<Grid alignItems='center' container>
                <Typography>Review Patients</Typography>
                <Box flexGrow="1" />
                <IconButton style={{ backgroundColor: Colors.lightgray, padding: "5px" }}>
                    <Search />
                </IconButton>
            </Grid>} />

        </>)
}

const wasToday = (isoTime) => {
    return DateTime.fromISO(isoTime).toISODate() === DateTime.local().toISODate()
}

const PractitionerHome = observer(() => {

    const { uiStore } = useStores();
    const { value, execute, status, setValue } = useAsync(PractitionerAPI.getPatientIssues, true)

    const tabValue = uiStore.pathname === "/home/reviewed" ? 1 : 0

    const channelId = new URLSearchParams(uiStore.urlSearchParams).get('onMessagingChannelId')
    const channelName = value?.find(each => {
        return each.channelId === parseInt(channelId)
    })?.fullName

    const patientsToDisplay = (value || []).filter(_patient => {
        const alreadyReviewed = wasToday(_patient.lastGeneralResolution);
        return tabValue === 0 ? !alreadyReviewed : alreadyReviewed
    })

    const markPatientAsReviewed = (patientId) => {
        let tempValue = [...value]
        const indexOfPatient = tempValue.findIndex(each => { return each.id === patientId })
        tempValue[indexOfPatient].lastGeneralResolution = DateTime.local().toISO()
        setValue(tempValue)
    }

    useEffect(() => {
        if (!!channelId) { execute() }
    }, [channelId])

    //@Todo - wrap this in a callback since the calculations are complex 
    const patientsWithIssues = addIssuesToPatients(patientsToDisplay || []).sort((a, b) => {
        return b.issues.total - a.issues.total;
    });

    return (
        <PatientIssueContext.Provider value={{patients: value, setPatients: setValue}}>
            <StickyTopBar>
                <TopBar refresh={execute} />
                <ReviewPatientTabs value={tabValue} />
            </StickyTopBar>
            <div>
                <MessagingPopover channelName={channelName} channelId={channelId} open={!!channelId} />
                {status === "pending" && <LoadingPatients />}
                {value && <>
                    <Grid container direction="column" >
                        <Box height={".5em"} aria-hidden />
                        {patientsWithIssues.map(patient => {
                            return <Box key={`review-patient-${patient.id}`} padding='0 .5em .5em .5em'>
                                <PatientCard isReviewed={tabValue === 1} markPatientAsReviewed={markPatientAsReviewed} patient={patient} />
                            </Box>
                        })}
                        <Box height="60px" aria-hidden />
                    </Grid>
                </>}
            </div>
        </PatientIssueContext.Provider>)
})

export default PractitionerHome;