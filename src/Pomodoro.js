import React, { useState, useEffect } from "react";
import bell from "./assets/bell.wav";
import Length from "./Length";

function Pomodoro() {
  const [displayTime, setDisplayTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [sessionTime, setSessionTime] = useState(25 * 60);
  const [timerOn, setTimerOn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [displayMessage, setDisplayMessage] = useState("");

  const playBell = () => {
    const startBell = new Audio(bell);
    startBell.currentTime = 0;
    startBell.play();
  };

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    return (
      (minutes < 10 ? `0${minutes}` : minutes) +
      `:` +
      (seconds < 10 ? `0${seconds}` : seconds)
    );
  };

  const changeTime = (amount, type) => {
    if (type === "break") {
      if ((breakTime <= 60 && amount < 0) || breakTime >= 60 * 60) {
        return;
      }
      setBreakTime((prev) => prev + amount);
      if (!timerOn) {
        setDisplayTime(breakTime + amount);
      }
    } else {
      if ((sessionTime <= 60 && amount < 0) || sessionTime >= 60 * 60) {
        return;
      }
      setSessionTime((prev) => prev + amount);
      if (!timerOn) {
        setDisplayTime(sessionTime + amount);
      }
    }
  };

  const controlTime = () => {
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    let onBreakVariable = onBreak;

    if (!timerOn) {
      let interval = setInterval(() => {
        date = new Date().getTime();
        if (date > nextDate) {
          setDisplayTime((prev) => {
            if (prev <= 0 && !onBreakVariable) {
              onBreakVariable = true;
              setDisplayMessage("Break time!");
              return breakTime;
            } else if (prev <= 0 && onBreakVariable) {
              onBreakVariable = false;
              setDisplayMessage("Study time!");
              return sessionTime;
            }
            return prev - 1;
          });
          nextDate += second;
        }
      }, 30);
      localStorage.clear();
      localStorage.setItem("interval-id", interval);
    }
    if (timerOn) {
      clearInterval(localStorage.getItem("interval-id"));
    }
    setTimerOn(!timerOn);
  };

  useEffect(() => {
    if (displayTime <= 0) {
      setOnBreak(true);
      playBell();
    } else if (!timerOn && displayTime === breakTime) {
      setOnBreak(false);
    }
  }, [displayTime, onBreak, timerOn, breakTime, sessionTime]);

  const resetTime = () => {
    setDisplayTime(25 * 60);
    setBreakTime(5 * 60);
    setSessionTime(25 * 60);
  };

  return (
    <main role="main" className="pomodoro">
      <h1>Pomodoro Time</h1>
      <h2>{onBreak ? displayMessage : <p>Let's get started!</p>}</h2>
      <p className="time">{formatTime(displayTime)}</p>
      <button className="mainBtns" onClick={controlTime}>
        {timerOn ? "Pause" : "Play"}
      </button>
      <button className="reset mainBtns" onClick={resetTime}>
        Reset
      </button>
      
<div className="lengths">
      <Length
        title="Set break time"
        type={"break"}
        time={breakTime}
        changeTime={changeTime}
        formatTime={formatTime}
      />
      <Length
        title="Set study time"
        type={"session"}
        time={sessionTime}
        changeTime={changeTime}
        formatTime={formatTime}
      />
      </div>
    </main>

  );
}

export default Pomodoro;
