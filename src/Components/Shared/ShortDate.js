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
  },
  month: {
    fontSize: '.8em',
  },
});

//Expects an ISO Date
export default function ShortDate({ date }) {
  const classes = useStyles();
  const parsed = DateTime.fromISO(date).plus({ months: 3 });
  const normal = DateTime.fromISO(date);

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
          {normal.toLocaleString({ day: 'numeric' })}
        </Typography>
        <Box height="5px" />
        <Typography className={classes.month}>
          {normal.toLocaleString({ month: 'short' })}
        </Typography>
      </Grid>
    </Box>
  );
}
