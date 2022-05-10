import React, { useCallback, useMemo, useState } from 'react'
import PopOverV2 from '../../Components/Shared/PopOverV2'
import { useHistory, useParams, useLocation, Switch, Route } from 'react-router-dom'
import SharedAPI from '../../API/SharedAPI';
import useAsync from '../../Hooks/useAsync';
import ReportingCalendar from '../../Components/Shared/ReportingCalendar';
import { Box } from '@material-ui/core';
import Loading from '../Shared/CardLoading';
import CalendarKey from '../../Components/Shared/ReportingCalendar/CalendarKey';
import { useTranslation } from 'react-i18next';
import ViewDailyReport from '../../Components/Shared/ViewDailyReport';
import { DateTime } from 'luxon';
import Colors from '../../Basics/Colors';
import { TransitionGroup, CSSTransition } from 'react-transition-group'

export default function CalendarPopOver({ patient }) {

    const { t } = useTranslation('translation');

    const history = useHistory();
    const location = useLocation();
    const { patientId } = useParams();

    const [state, setState] = useState({
        calendarStartDate: new Date()
    });

    const { currentDate, calendarStartDate } = state;

    const getDailyReports = useCallback(() => {
        return SharedAPI.getDailyReports(patientId)
    }, [patientId]);

    const handleExit = () => {
        if (!currentDate) history.goBack();
        setState({ ...state, currentDate: null })
    }

    const { value, status } = useAsync(getDailyReports);

    const reportHash = useMemo(() => {
        return value ? value.reduce((prev, current,) => {
            const { date } = current;
            return { ...prev, [date]: current };
        }, {}) : {}
    }, [value])

    const updateMonth = (forward = true) => {
        setState({ ...state, calendarStartDate: DateTime.fromJSDate(state.calendarStartDate).startOf("month").plus({ month: forward ? 1 : -1 }).toJSDate() })
    }

    return (<PopOverV2 open={true} topBarTitle={patient ? `${patient.fullName} ${t('coordinator.patientProfile.listReports')}` : ""} handleExit={handleExit}>
        {status === "pending" ? <Loading /> : <TransitionGroup>
            <CSSTransition
                key={location.pathname}
                classNames="fade"
                timeout={300}>
                <Switch location={location}>
                    <Route path="*/calendar/:reportDate">
                        <ViewReport reportHash={reportHash} />
                    </Route>
                    <Route path="*/calendar">
                        <Box padding="1em">
                            <ReportingCalendar
                                updateMonth={updateMonth}
                                displayStartDate={calendarStartDate}
                                handleDateChange={(date) => { history.push(location.pathname + "/" + date) }}
                                patient={patient}
                                reports={reportHash} />
                            <Box height="2em" />
                            <Box bgcolor={Colors.lighterGray} padding=".5em" borderRadius="4px">
                                <CalendarKey />
                            </Box>
                        </Box>
                    </Route>
                </Switch>
            </CSSTransition>
        </TransitionGroup>}
    </PopOverV2 >)
}

const ViewReport = ({ reportHash }) => {
    const { reportDate } = useParams();
    return <ViewDailyReport date={reportDate} report={reportHash[reportDate]} />
}