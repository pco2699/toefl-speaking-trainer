import { useState, useEffect, useRef } from 'react';
import Time from './Time';
import Validate from './Validate';

export default function useTimer(settings) {
  const { inputSec, onExpire } = settings || {};
  const [initialSec, setInitialSec] = useState(inputSec);
  const [seconds, setSeconds] = useState(initialSec);
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

  function setInit(sec) {
    setInitialSec(sec);
    setSeconds(sec);
  }

  function start() {
    if (!intervalRef.current) {
      const expiryTime = new Date();
      expiryTime.setSeconds(expiryTime.getSeconds() + initialSec);

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

  function stop() {
    clearIntervalRef();
  }

  function reset(){
    setSeconds(initialSec);
  }

  useEffect(() => {
    return clearIntervalRef;
  }, []);


  return {
    seconds, start, reset, stop, isRunning, setInit, initialSec
  };
}
