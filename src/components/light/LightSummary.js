import React from 'react'


const LightSummary = ({system}) => {

    return (
        <div className="summary">
            <h3>Light</h3>
            <span>Status: {system.dummyData}</span>
        </div>
    )
}

export default LightSummary;