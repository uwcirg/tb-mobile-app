import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { Satellite } from '@material-ui/icons';
import { DateTime } from 'luxon';

const useStyles = makeStyles({
  root: {
    minHeight: '150px',
    margin: '10px',
    padding: '5px',
    background: '#90EE90',
  },
});

const Countdown = observer(() => {
  // When it renders - grab the time that we are waiting for
  const [state, setState] = useState({
    laterTime: null,
    currentTime: DateTime.local(),
  });

  useEffect(() => {
    setState({
      ...state,
      laterTime: localStorage.getItem('later'),
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setState({
        ...state,
        currentTime: DateTime.local(),
      });
    }, 1000);
    return function cleanup() {
      clearInterval(interval);
    };
  }, []);

  // Update once per second to new display time

  const classes = useStyles();

  const setFutureTime = () => {
    const newTime = DateTime.local().plus({ minutes: 20 }).toISO();
    setState({
      ...state,
      laterTime: newTime,
    });
    localStorage.setItem('later', newTime);
  };

  const dif = DateTime.fromISO(state.laterTime).diff(
    state.currentTime,
    'seconds'
  ).seconds;

  return (
    <div>
      <button onClick={setFutureTime}>Set Time</button>
      {/* Display the time  */}
      <p>{state.laterTime && Math.round(dif)}</p>
    </div>
  );
});

export default Countdown;
