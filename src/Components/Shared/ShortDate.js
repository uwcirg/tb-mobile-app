import { Box, Grid, Typography, makeStyles } from '@material-ui/core';
import { DateTime } from 'luxon';
import React from 'react';

const useStyles = makeStyles({
  date: {
    width: 'fit-content',
    minWidth: '22px',
    '& > *': {
      lineHeight: '1em',
    },
  },
  day: {
    fontSize: '1em',
    fontWeight: 600,
  },
  month: {
    fontSize: '.8em',
  },
});

//Expects an ISO Date
export default function ShortDate({ date }) {
  const classes = useStyles();
  const parsedDate = DateTime.fromISO(date);

  return (
    <Box>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.date}
      >
        <Typography className={classes.day}>
          {parsedDate.toLocaleString({ day: 'numeric' })}
        </Typography>
        <Box height="5px" />
        <Typography className={classes.month}>
          {parsedDate.toLocaleString({ month: 'short' })}
        </Typography>
      </Grid>
    </Box>
  );
}
