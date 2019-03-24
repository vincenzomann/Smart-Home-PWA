import React from 'react'


const LightSummary = ({database}) => {
    return (
        <div className="summary">
            {/* <p>Status: {fSystem.dummyData}</p> */}
            <span>Manual Light: <b>{lightStatus(database.led1)}</b></span>
            <br/>
            <span>Automated Light: <b>{lightStatus(database.led2)}</b></span>
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