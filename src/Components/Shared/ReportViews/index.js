import React, { useState } from 'react'
import { useHistory, Switch, Route, Redirect } from 'react-router-dom'
import ReportingCalendar from './Calendar';
import { Box, Fade, Grid, IconButton, Typography } from '@material-ui/core';
import CalendarKey from './Calendar/CalendarKey';
import ViewDailyReport from '../../../Components/Shared/ViewDailyReport';
import { DateTime } from 'luxon';
import Colors from '../../../Basics/Colors';
import { CameraAlt, Clear, Event, ListAlt } from '@material-ui/icons';
import LinkTabs from '../LinkTabs';
import ReportList from './List';
import useQuery from '../../../Hooks/useQuery';
import Loading from '../../../Practitioner/Shared/CardLoading';
import PhotoList from './PhotoList';

const links = [
    { link: "calendar", text: "Calendar", icon: Event },
    { link: "list", text: "List", icon: ListAlt },
    { link: "photos", text: "Photos", icon: CameraAlt }
]

export default function ReportViews({ reports, loading, patient, tabTopPostition = 0 }) {

    const query = useQuery();
    const date = query.get('date')

    return (<>
        <Box position="sticky" top={tabTopPostition} zIndex={10}>
            {date ? <ExitReportView date={date} /> : <LinkTabs tabs={links} />}
        </Box>
        {loading ? <Loading height={"50vh"} /> :
            <>{date ?
                <Fade in timeout={300} appear>
                    <Box>
                        <ViewReport reportHash={reports} />
                    </Box>
                </Fade>
                :
                <Switch>
                    <Route path="*/calendar">
                        <CalendarStuff patient={patient} reportHash={reports} />
                    </Route>
                    <Route path="*/list">
                        <ReportList reportHash={reports} patient={patient} />
                    </Route>
                    <Route path="*/photos">
                        <PhotoList reportsHash={reports} photoDays={patient.photoDays} />
                    </Route>
                    <Redirect path='*/' to={"/progress/calendar"} />
                </Switch>
            }</>}
    </>)

}

const ExitReportView = ({ date }) => {

    const history = useHistory();

    return (
        <Box bgcolor="white" padding=".5em">
            <Grid alignItems='center' container>
                <Typography>Report: {date}</Typography>
                <Box flexGrow={1} />
                <IconButton onClick={history.goBack}>
                    <Clear />
                </IconButton>
            </Grid>
        </Box>
    )
}

const CalendarStuff = ({ patient, reportHash }) => {

    const [state, setState] = useState({
        calendarStartDate: new Date()
    });

    const { calendarStartDate } = state;

    const history = useHistory();

    const updateMonth = (forward = true) => {
        setState({ ...state, calendarStartDate: DateTime.fromJSDate(state.calendarStartDate).startOf("month").plus({ month: forward ? 1 : -1 }).toJSDate() })
    }

    return (
        <Box padding="1em">
            <ReportingCalendar
                updateMonth={updateMonth}
                displayStartDate={calendarStartDate}
                handleDateChange={(date) => { history.push(`?date=${date}`) }}
                patient={patient}
                reports={reportHash} />
            <Box bgcolor={Colors.lighterGray} padding=".5em" borderRadius="4px">
                <CalendarKey />
            </Box>
        </Box>
    )
}

const ViewReport = ({ reportHash }) => {

    const query = useQuery();
    const reportDate = query.get('date')

    return <ViewDailyReport date={reportDate} report={reportHash[reportDate]} />
}