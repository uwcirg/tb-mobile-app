import React from 'react';
import { Grid, Box, IconButton, Typography } from '@material-ui/core';
import PractitionerAPI from '../../API/PractitionerAPI';
import { Search } from '@material-ui/icons';
import OverTopBar from '../../Patient/Navigation/OverTopBar';
import ReviewPatientTabs from './Tabs';
import useAsync from '../../Hooks/useAsync';
import StickyTopBar from '../../Components/Shared/StickyTopBar';
import Colors from '../../Basics/Colors';
import PatientIssueContext from './PatientIssuesContext';
import ReviewPhoto from './ReviewPhoto';
import ListOfPatients from './ListOfPatients';
import MessagePatient from './MessagePatient';
import LoadingPatients from './LoadingPatients';
import { useLocation } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom'
import AllPatientsList from './AllPatientsList';
import CalendarPopOver from './CalendarPopOver';

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

const PractitionerHome = () => {

    const { value, execute, status, setValue } = useAsync(PractitionerAPI.getPatientIssues, true)

    const location = useLocation();

    const getTabValue = () => {
        if (location.pathname === "/home/needs-review") return 0
        if (location.pathname === "/home/reviewed") return 1
        if (location.pathname === "/home/all") return 2
        return 0
    }

    const tabValue = getTabValue();

    return (
        <PatientIssueContext.Provider value={{ patients: value, setPatients: setValue, refreshPatients: execute }}>
            <div style={{ maxHeight: "100vh", overflowY: "scroll" }}>

                <Route path="*/:patientId/calendar" >
                   <CalendarPopOver />
                </Route>

                <ReviewPhoto />
                <MessagePatient />
                <StickyTopBar>
                    <TopBar refresh={execute} />
                    <ReviewPatientTabs value={tabValue} />
                </StickyTopBar>
                {status === "pending" && <LoadingPatients />}
                <Switch>
                    <Route path="/home/all">
                        <AllPatientsList />
                    </Route>
                    <Route path={"/"}>
                        <ListOfPatients tabValue={tabValue} />
                    </Route>
                </Switch>
            </div>
        </PatientIssueContext.Provider>)
}

export default PractitionerHome;