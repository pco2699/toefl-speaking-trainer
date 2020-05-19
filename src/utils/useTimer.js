import { useState, useEffect, useRef } from 'react';
import Time from './Time';
import Validate from './Validate';

export default function useTimer(settings) {
  const { inputSec, onExpire } = settings || {};
  const [seconds, setSeconds] = useState(inputSec);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef();

  function clearIntervalRef() {
    if (intervalRef.current) {
      setIsRunning(false);
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }

  function handleExpire() {
    clearIntervalRef();
    Validate.onExpire(onExpire) && onExpire();
  }

  function start() {
    if (!intervalRef.current) {
      const expiryTime = new Date();
      expiryTime.setSeconds(expiryTime.getSeconds() + inputSec);

      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        const secondsValue = Time.getSecondsFromExpiry(expiryTime.getTime());
        if (secondsValue <= 0) {
          handleExpire();
        }
        setSeconds(secondsValue);
      }, 1000);
    }
  }

  function reset() {
    clearIntervalRef();
    setSeconds(inputSec);
  }


  useEffect(() => {
    return clearIntervalRef;
  }, []);


  return {
    ...Time.getTimeFromSeconds(seconds), start, reset, isRunning
  };
}
