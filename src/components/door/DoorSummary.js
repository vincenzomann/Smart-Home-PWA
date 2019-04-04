import React from 'react';

const DoorSummary = ({database}) => {

    return (
        <div className="summary">
            <span>Security Light: <b>{lightStatus(database.led3)}</b></span>
            <br/>
            <span>Door Status: <b>{doorStatus(database.door)}</b></span>
            <br/>
            <span>Door Timestamp: <b>{database.doorTime}</b></span>
        </div>
    )
}

// method to print if door is detected
const doorStatus = (door) => {
    if (door === true)
        return "Open"
    else if (door === false)
        return "Closed"
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

export default DoorSummary;