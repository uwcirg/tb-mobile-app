import React, { useCallback, useMemo, useState } from 'react'
import { useHistory, useParams, Switch, Route, Redirect } from 'react-router-dom'
import useAsync from '../../../Hooks/useAsync';
import ReportingCalendar from './Calendar';
import { Box, Fade, Grid, IconButton, Typography } from '@material-ui/core';
import CalendarKey from './Calendar/CalendarKey';
import { useTranslation } from 'react-i18next';
import ViewDailyReport from '../../../Components/Shared/ViewDailyReport';
import { DateTime } from 'luxon';
import Colors from '../../../Basics/Colors';
import { CameraAlt, Clear, Event, ListAlt } from '@material-ui/icons';
import LinkTabs from '../LinkTabs';
import ReportList from './List';
import useQuery from '../../../Hooks/useQuery';
import SharedAPI from '../../../API/SharedAPI';
import Loading from '../../../Practitioner/Shared/CardLoading';

const links = [
    { link: "calendar", text: "Calendar", icon: Event },
    { link: "list", text: "List", icon: ListAlt },
    { link: "photos", text: "Photos", icon: CameraAlt }
]

export default function ReportingPopover({ patient, handleExit, patientId }) {

    const { t } = useTranslation('translation');

    const getDailyReports = useCallback(() => {
        return SharedAPI.getDailyReports(patientId || patient.id)
    }, [patientId]);

    const { value, status } = useAsync(getDailyReports);

    const reportHash = useMemo(() => {
        return value ? value.reduce((prev, current,) => {
            const { date } = current;
            return { ...prev, [date]: current };
        }, {}) : {}
    }, [value])


    const query = useQuery();
    const date = query.get('date')


    return (<>
        <Box style={{position: "sticky", top: "60px"}}>
            {date ? <ExitReportView date={date} /> : <LinkTabs tabs={links} />}
        </Box>
        {status === "pending" ? <Loading height={"50vh"} /> :
            <>{date ?
                <Fade in timeout={300} appear>
                    <Box>
                        <ViewReport reportHash={reportHash} />
                    </Box>
                </Fade>
                :
                <Switch>
                    <Route path="*/calendar">
                        <CalendarStuff patient={patient} reportHash={reportHash} />
                    </Route>
                    <Route path="*/list">
                        <ReportList reportHash={reportHash} patient={patient} />
                    </Route>
                    <Route path="*/photos">
                        <p>Coming Soon</p>
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