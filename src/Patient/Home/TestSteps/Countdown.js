import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
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
    laterTime: DateTime.local().plus({ minutes: 20 }).toISO(),
    currentTime: DateTime.local(),
  });

  useEffect(() => {
    setState({
      ...state,
      laterTime: DateTime.local().plus({ minutes: 20 }).toISO(),
    });
    localStorage.setItem('later', state.laterTime);
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

  const setFutureTime = async () => {
    const newTime = await DateTime.local().plus({ minutes: 20 }).toISO();
    setState({
      ...state,
      laterTime: newTime,
    });
    localStorage.setItem('later', newTime);
  };

  const dif = DateTime.fromISO(localStorage.getItem('later')).diff(
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
