import React from 'react'
import { Link } from 'react-router-dom'

const LightSummary = ({system}) => {

    return (
        <div className="card z-depth-0 project-summary">
            <div className="card-content grey-text text-darken-3">
                <Link to="/light" >Light</Link><br />
                <span className="card-title">Status: </span>
                <span className="card-value"></span>
            </div>
        </div>
    )
}

export default LightSummary;