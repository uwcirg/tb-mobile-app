import { Box, makeStyles } from '@material-ui/core';
import { DateTime } from 'luxon'
import React from 'react'
import ReportPreview from './ReportPreview';

const useStyles = makeStyles({
    
})

export default function ReportList({reportHash, patient}){

    let dates = [];
    
    let startDate = DateTime.local().startOf('day')
    let endDate = DateTime.local().startOf('day').minus({days: 7})

    while(!startDate.equals(endDate)){
        dates.push(startDate.toISODate());
        startDate = startDate.minus({day: 1})
    }
    
    return(<Box padding={"1em"}>
        {dates.map( date => {
            return <ReportPreview key={`report-list-${date}`} date={date} report={reportHash[date]} />
        })}
    </Box>)
}