import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react'

import CalendarTest from './Calendar';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ReportsView from './ReportList';
import Typography from '@material-ui/core/Typography';
import Colors from '../../Basics/Colors';
import Styles from '../../Basics/Styles';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    reportingHistoryContainer: {
        width: "100%",
        "& > h2": {
            textTransform: "uppercase",
            padding: ".5em"
        }
    },
    reportingHistory: {
        width: "100%"
    },
    reportsHeader:{
        padding: ".5em",
        display: "flex",
        alignItems: "center",
        "& > h2": {
            marginRight: "1em",
            ...Styles.patientPageTitle
        }
    },
    buttonGroup:{
        "& > button.selected":{
            color: "white",
            backgroundColor: Colors.textDarkGray
        }
    }
  
})

const ReportingHistory = observer(() => {
    const [calendarVisible,setCalendarVisible] = useState(false);
    const [day,setDay] = useState(new Date())
    const classes = useStyles();
    const {practitionerStore} = useStores();

    const handleChange = (change) =>{
        setDay(change)
    }
    return (
        <div className={classes.reportingHistoryContainer}>
        <ReportingHistoryLabel setCalendarVisible={setCalendarVisible} calendarVisible={calendarVisible} />
            <div className={classes.reportingHistory}>
                {calendarVisible && <CalendarTest
                    selectedDay={day}
                    handleChange={handleChange}
                    reports={practitionerStore.selectedPatient.reports}
                    treatmentStart={practitionerStore.selectedPatient.details.treatmentStart}
                />}
                {!calendarVisible && <ReportsView />}
            </div>
        </div>
    )

})

const ReportingHistoryLabel = (props) => {
    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');
    return(
    <div className={classes.reportsHeader}>
        <Typography variant="h2">{t('coordinator.patientProfile.reportingHistory')}</Typography>
        <ButtonGroup className={classes.buttonGroup} size="small">
            <Button onClick={()=>{props.setCalendarVisible(false)}} className={!props.calendarVisible && "selected"}>List</Button>
            <Button onClick={()=>{props.setCalendarVisible(true)}} className={props.calendarVisible && "selected"}>Calendar</Button>
        </ButtonGroup>
    </div>)
}

export default ReportingHistory;