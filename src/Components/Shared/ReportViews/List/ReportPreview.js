import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react'
import Colors from '../../../../Basics/Colors'
import IssueArea from '../../../../Practitioner/ReviewPatients/IssueArea'
import ShortDate from '../../ShortDate'

export default function ReportPreview({ date, report }) {

    const issues = report ? {
        missedMedication: report.medicationWasTaken ? 1 : null,
        supportRequests: !report.doingOkay ? 1 : null,
        symptoms: report.symptoms.length,
        unreviewedPhotos: report.photoUrl ? 1 : null

    } : null;

    const bgcolor = () => {
        if(report && report.medicationWasTaken) return Colors.calendarGreen
        return Colors.calendarRed
    }

    return (
        <Box padding=".5em" border={report && "solid 1px lightgray"} borderRadius="4px" marginBottom=".5em">
            <Grid container alignItems='center'>
                <Box bgcolor={bgcolor()} borderRadius="4px" padding=".5em">
                    <ShortDate date={date} />
                </Box>
                <Box flexGrow="1" />
                {report ? <IssueArea issues={issues} patientId={1} /> : <Typography style={{fontStyle: "italic"}}> No Report Submitted</Typography>}
            </Grid>
        </Box>
    )
}