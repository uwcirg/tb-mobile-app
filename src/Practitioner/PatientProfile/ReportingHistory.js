import React from 'react'
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

const ReportingHistory = () => {
    const classes = useStyles();
    return (
        <div className={classes.reportingHistoryContainer}>
            <ReportingHistoryLabel />
            <div className={classes.reportingHistory}>
                {false ? <CalendarTest
                    selectedDay={day}
                    handleChange={(date) => { setDay(date) }}
                    reports={practitionerStore.selectedPatient.reports}
                    treatmentStart={practitionerStore.selectedPatient.details.treatmentStart}
                /> : <ReportsView />}
            </div>
        </div>
    )

}

const ReportingHistoryLabel = () => {
    const classes = useStyles();
    return(
    <div className={classes.reportsHeader}>
        <Typography variant="h2">Reporting History View</Typography>
        <ButtonGroup className={classes.buttonGroup} size="small">
            <Button className="selected">List</Button>
            <Button>Calendar</Button>
        </ButtonGroup>
    </div>)
}

export default ReportingHistory;