import React from 'react';

const DoorSummary = ({fSystem}) => {

    return (
        <div className="summary">
            <span>Status: {fSystem.dummyData}</span>
        </div>
    )
}

export default DoorSummary;