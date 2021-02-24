import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Styles from '../../../../Basics/Styles';
import {SingleReport} from '../../../PatientProfile/ReportList';
import { DateTime } from 'luxon';
import Issues from './Issues';
import Profile from './Profile';
import Report from './Report'
import ExpansionPanel from '../../../../Basics/ExpansionPanel'
import Colors from '../../../../Basics/Colors';

const cardStyles = makeStyles({
    container: {
        ...Styles.profileCard,
        display: "flex",
        backgroundColor: "white",
        marginBottom: "1em",
        minWidth: "800px",
        minHeight: "200px",
        "& > div": {
            padding: "1em"
        }
    },
    reports: {
        flex: "1 1 0",
        padding: "0 !important",
        "& > div":{
            padding: ".5em",
            borderBottom: "solid 1px lightgray"
        },
        "& > div:last-of-type":{
            borderBottom: "none"
        },
        "& > div > h3": {
            fontSize: "1em"
        }
    },
    patientProfile:{
        minWidth: "100px"
    },
    expansionPreview:{
        width: "unset",
        backgroundColor: "unset",
        "& > span": {
            color: Colors.buttonBlue
        },
        "& > svg": {
            color: Colors.buttonBlue
        }
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
                    <Report report={todaysReport} />
                </div>
                <div>
                    <Typography variant="h3"> Yesterdays Report</Typography>
                    <Report report={yesterdaysReport} />
                </div>

                <div><ExpansionPanel 
                preview={`View all ${props.dailyReports.length} reports since last check in`}
                previewClassName={classes.expansionPreview}
                >
                    {props.dailyReports.length > 0 && props.dailyReports.map( (dr) => {
                        return <Report report={dr} />
                    })}
                    </ExpansionPanel></div>
            </div>
            <Issues id={props.id} />
        </div>
    )
}

export default PatientCard;
