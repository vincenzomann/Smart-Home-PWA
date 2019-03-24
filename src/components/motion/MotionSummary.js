import React from 'react'

const MotionSummary = ({database}) => {

    return (
        <div className="summary">
            <span>Motion Light: <b>{lightStatus(database.led3)}</b></span>
            <br/>
            <span>Motion Status: <b>{motionStatus(database.motion)}</b></span>
            <br/>
            <span>Motion Timestamp: <b>{database.motionTime}</b></span>
        </div>
    )
}

// method to print if motion is detected
const motionStatus = (motion) => {
    if (motion === true)
        return "Motion Detected"
    // else if (light === false)
    //     return "-"
    else
        return "-"
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

export default MotionSummary;