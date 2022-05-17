import React, { useContext } from 'react';
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
import { useLocation, useHistory } from 'react-router-dom';
import { Route, Switch, useParams } from 'react-router-dom'
import AllPatientsList from './AllPatientsList';
import ReportingPopover from './ReportingPopOver';
import { PageLabelTitle } from '../../Components/Shared/PageLabel';

const TopBar = () => {
    return (
        <Box bgcolor="white" borderBottom="solid 1px lightgray" padding=".5em 1em">
            <Grid alignItems='center' container>
                <PageLabelTitle title="Review Patients" />
                <Box flexGrow="1" />
                <IconButton style={{ backgroundColor: Colors.lightgray, padding: "5px" }}>
                    <Search />
                </IconButton>
            </Grid>
        </Box>
    )
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
                <Route path="*/:patientId/reports" >
                    <WrappedReportingPopover />
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

const WrappedReportingPopover = () => {

    const { patientId } = useParams();
    const patient = useContext(PatientIssueContext).patients?.find(each => { return each.id === parseInt(patientId) }) || null;
    const history = useHistory();

    return <ReportingPopover handleExit={() => { history.push("/home/needs-review") }} patient={patient} />
}

export default PractitionerHome;