import React from 'react'


const LightSummary = ({fSystem}) => {

    return (
        <div className="summary">
            <h3>Light</h3>
            <span>Status: {fSystem.dummyData}</span>
        </div>
    )
}

export default LightSummary;