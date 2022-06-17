import { DateTime, Interval } from 'luxon';
import { useState, useEffect } from 'react';

export default function usePersistCountdown() {
  let localCount = Number(localStorage.getItem('count'));
  let [count, setCount] = useState(localCount);
  const later = localStorage.getItem('later');
  const nowish = localStorage.getItem('nowish');
  const interval = localStorage.getItem('interval');

  const setLocalTimes = () => {
    localStorage.setItem(
      'later',
      DateTime.local().plus({ seconds: 1200 }).toString()
    );

    localStorage.setItem('nowish', DateTime.local().toString());

    localStorage.setItem('count', '0');

    localStorage.setItem(
      'interval',
      Interval.fromDateTimes(
        DateTime.local(),
        DateTime.local().plus({ seconds: 1200 })
      ).length('seconds')
    );
  };

  useEffect(() => {
    while (count < localStorage.getItem('interval')) {
      const interval = setInterval(() => {
        setCount((prev) => prev + 1);
        localStorage.setItem('count', count.toString());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [count]);

  return { count, later, nowish, interval, localCount, setLocalTimes };
}
