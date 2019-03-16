import React from 'react'


const LightSummary = ({database}) => {
    return (
        <div className="summary">
            {/* <p>Status: {fSystem.dummyData}</p> */}
            <p>Light 1: <b>{lightStatus(database.led1)}</b></p>
            <p>Light 2: <b>{lightStatus(database.led2)}</b></p>
        </div>
    )
}

// method to translate "true" to "On" and "false" to "Off"
const lightStatus = (light) => {
    if (light === true)
        return "On"
    else if (light === false)
        return "Off"
    else
        return "-"
}

export default LightSummary;