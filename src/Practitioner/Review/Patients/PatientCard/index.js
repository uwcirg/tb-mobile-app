import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Styles from '../../../../Basics/Styles'
import {SingleReport} from '../../../PatientProfile/ReportList'
import { DateTime } from 'luxon';
import Issues from './Issues'
import Profile from './Profile'

const cardStyles = makeStyles({
    container: {
        ...Styles.profileCard,
        display: "flex",
        backgroundColor: "white",
        marginBottom: "1em",
        minHeight: "200px",
        "& > div": {
            padding: "1em"
        }
    },
    reports: {
        flex: "1 1 0",
        "& > div > h3": {
            fontSize: "1em"
        }
    },
    patientProfile:{
        minWidth: "100px"
    }
})


const PatientCard = (props) => {

    const classes = cardStyles();

    const todaysReport = props.dailyReports.length > 0 && props.dailyReports.find( report => { return report.date === DateTime.local().toISODate()})
    const yesterdaysReport = props.dailyReports.length > 0 && props.dailyReports.find( report => { return report.date === DateTime.local().minus({day: 1}).toISODate()})

    return (
        <div className={classes.container}>
            <Profile {...props} />

            <div className={classes.reports}>
                <div>
                    <Typography variant="h3"> Todays Report</Typography>
                    {todaysReport && <SingleReport report={todaysReport} />}
                </div>
                <div>
                    <Typography variant="h3"> Yesterdays Report</Typography>
                    {yesterdaysReport && <SingleReport report={yesterdaysReport} />}
                </div>
            </div>
            <Issues id={props.id} />
        </div>
    )
}

export default PatientCard;
