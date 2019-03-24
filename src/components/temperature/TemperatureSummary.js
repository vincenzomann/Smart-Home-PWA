import React from 'react';

const TemperatureSummary = ({database}) => {

    return (
        <div className="summary">
            <span>Temperature: <b>{celcius(database.temp)}</b></span>
            <br/>
            <span>Heating: <b>{heatingStatus(database.led4)}</b></span>
        </div>
    )
}

// method to add celcius unit
const celcius = (temp) => {
    return temp + "°C"
}

// method to translate "true" to "On" and "false" to "Off"
const heatingStatus = (heating) => {
    if (heating === true)
        return "On"
    else if (heating === false)
        return "Off"
    else
        return "-"
}

export default TemperatureSummary;