import React from 'react';

const PulseSummary = ({fSystem}) => {

    return (
        <div className="summary">
            <span>Status: {fSystem.dummyData}</span>
        </div>
    )
}

export default PulseSummary;