import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { Button, Card } from '@material-ui/core';
import useCountdown from '../../../Hooks/useCountdown';
import SimpleButton from '../../../Basics/SimpleButton';
import { DateTime, Duration, Interval } from 'luxon';

import usePersistCountdown from '../../../Hooks/usePersistCountdown';

const useStyles = makeStyles({
  root: {
    minHeight: '150px',
    margin: '10px',
    padding: '5px',
    background: '#90EE90',
  },
});
localStorage.setItem(
  'now',
  DateTime.local().plus({ seconds: 1200 }).toString()
);

const Countdown = observer(() => {
  const classes = useStyles();
  // const [second, minute, setCountdown] = useCountdown(20);
  let now = DateTime.local();
  let dur = Duration.fromObject({ seconds: 1200 });
  let { count, later, nowish, setLocalTimes, interval, localCount } =
    usePersistCountdown();

  return (
    <div>
      <Card className={classes.root}>
        <h2>Please, use this timer</h2>
        <p>
          {/* {minute}:{second < 10 && '0'}
          {second} */}
          {now.toISO().toString()} now now now!
        </p>
        <p>{localStorage.getItem('later')}</p>
        <p>{localStorage.getItem('now')} now + 20 minutes</p>
        <p>{Number(dur.seconds) / 60} minutes</p>
        <p>{interval} INTERVAL!</p>
        <SimpleButton onClick={setLocalTimes}>Very simple</SimpleButton>
      </Card>
      <h1>{1200 - count}</h1>
      <h2>{later}</h2>
      <h2>{nowish}</h2>
      <h3>{localStorage.getItem('count')}</h3>
      <h4>{localCount}</h4>
    </div>
  );
});

export default Countdown;
