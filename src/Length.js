import React, { useState} from 'react'
import Testings from "./Testings"


function Length({title, changeTime, type, time, formatTime}){
    
    

    return(
        <section className="time-set">
            
                <h3 className="title">{title}</h3>
                <h3>{formatTime(time)}</h3>
                <button onClick={() => changeTime(60, type)}>+</button>
                <button onClick={() => changeTime(-60, type)}>-</button>
            
        </section>
    )
}

export default Length