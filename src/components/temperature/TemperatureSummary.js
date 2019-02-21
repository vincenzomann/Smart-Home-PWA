import React from 'react';

const TemperatureSummary = ({fSystem}) => {

    return (
        <div className="summary">
            <span>Status: {fSystem.dummyData}</span>
        </div>
    )
}

export default TemperatureSummary;