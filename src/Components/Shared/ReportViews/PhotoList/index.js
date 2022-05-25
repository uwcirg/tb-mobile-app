import { Box, Button, Typography } from '@material-ui/core';
import { DateTime } from 'luxon';
import React, { useReducer, useState } from 'react';
import ShortDate from '../../ShortDate';
import ReportContainer from '../ReportContainer';


export default function PhotoList({ photoDays, reportsHash }) {


    const [numberOfDaysToDisplay, dispatch] = useReducer((numberOfDaysToDisplay, action) => {
        switch (action.type) {
            case 'showMore':
                return numberOfDaysToDisplay + 7;
            default:
                throw new Error();
        }
    }, 7)

    const photoDaysToDisplay = Object.keys(photoDays).reverse().filter(each => { return DateTime.fromISO(each).diffNow('days').days < 0 }).slice(0,numberOfDaysToDisplay)

    return (
        <Box padding="16px">
            {photoDaysToDisplay.map(date => {
                return <ReportContainer key={`photo-preview-${date}`} to={`?date=${date}`} disabled={!reportsHash[date]}>
                    <Box padding="8px">
                        <ShortDate date={date} />
                    </Box>
                </ReportContainer>
            })}
            <Button onClick={()=>{dispatch({type: 'showMore'})}}>Load More</Button>
        </Box>
    )
}