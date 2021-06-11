import { useState } from "react";

const PomodoroOne = () => {

    const [displayTime, setDisplayTime] = useState("")
    const [studyTime, setStudyTime] = useState(25 * 60)
    const [breakTime, setBreakTime] = useState(5 * 60)

    const formatTime = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
    
        return (
          (minutes < 10 ? `0${minutes}` : minutes) +
          `:` +
          (seconds < 10 ? `0${seconds}` : seconds)
        );
      };
      

    return (  
        <div>
            <h1>Hey</h1>
        </div>
    );
}
 
export default PomodoroOne;