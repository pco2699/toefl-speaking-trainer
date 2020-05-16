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
  const { start, stop, player } = useRecorder();
  const { seconds, start: startTimer, reset, isRunning, isExpired } = useTimer({ inputSec: 45, onExpire: () =>  stop() });

  function resetAll() {
    reset();
  }

  function quitAll() {
    stop()
    resetAll()
  }

  function startAll() {
    startTimer()
    start()
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className={`App-logo ${isRunning ? "running" : ""}`} alt="logo" />
        <p>
            {seconds}
        </p>

        <Container>
          <Row  className="justify-content-center">
                {isExpired ?
                      (<Button variant="primary" onClick={resetAll}>Reset</Button>) :
                      (isRunning ?
                        (<Button onClick={quitAll}>Quit</Button>) :
                        (<Button onClick={startAll}>Start</Button>)
                      )
                }
          </Row>
          <Row  className="justify-content-center mt-3">
              {!!player && 
                  (
                  <ButtonGroup><Button onClick={() => player.play()}>play sound</Button>
                  <Button onClick={() => player.pause()}>pause sound</Button>
                  <Button>
                          <a
                            href={player.src}
                            download={`recording-${Date.now()}`}
                          >
                            download
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
