import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useTimer } from './utils';
import { useRecorder } from 'use-recorder';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/Button';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

interface Props {
  time: Date
}

function Timer() {
  const { start: startRecorder, stop: stopRecorder, player } = useRecorder();
  const { seconds, start: startTimer, reset: resetTimer, isRunning, initialSec, setInit, stop: stopTimer } = useTimer({ inputSec: 45, onExpire: () => {stop();} });

  function stop() {
    stopRecorder();
    stopTimer();
    setTimeout(()=> {
      resetTimer();
    }, 500);
  }

  function start() {
    startTimer();
    startRecorder();
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event?.target?.value === "") {
      setInit(0)
      return;
    }
    const val = parseInt(event?.target?.value);
    if (Number.isInteger(val)) {
      setInit(val);
    }
  };


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className={`App-logo ${isRunning ? "running" : ""}`} alt="logo" />
        <input
            type="text"
            name="username"
            value={initialSec}
            onChange={handleChange}
        />
        <p>
            {seconds}
        </p>

        <Container>
          <Row  className="justify-content-center">
                {
                    (isRunning ?
                      (<Button onClick={stop}>Quit</Button>) :
                      (<Button onClick={start}>Start</Button>)
                    )
                }
          </Row>
          <Row  className="justify-content-center mt-3">
              {!!player && 
                  (
                  <ButtonGroup><Button onClick={() => player.play()}>Play</Button>
                  <Button onClick={() => player.pause()}>Pause</Button>
                  <Button onClick={() => { player.currentTime = 0 }}>Reset</Button>
                  <Button>
                          <a
                            href={player.src}
                            download={`recording-${Date.now()}`}
                          >
                            Download
                          </a>
                    </Button>
                  </ButtonGroup>)}
          </Row>
        </Container>



      </header>
    </div>
  );

}

function App() {
  return <Timer />;
}

export default App;
