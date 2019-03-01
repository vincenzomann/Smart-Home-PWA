import React from 'react'


const LightSummary = ({rpi}) => {

    return (
        <div className="summary">
            {/* <p>Status: {fSystem.dummyData}</p> */}
            <p>Light 1: {rpi.led1.toString()}</p>
            <p>Light 2: {rpi.led2.toString()}</p>
        </div>
    )
}

export default LightSummary;