import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import LightSummary from '../light/LightSummary'

const HAS = (props) => {

    const { system, auth } = props;

    if (!auth.uid) return <Redirect to='/login' />

    // wait for async fetch to be set properly
    if (!system){
        return (
            <div className="container center">
                <p>Loading HAS...</p>
            </div>
        )
    }
    else{
        return (
            <div className="dashboard">
                {console.log(props)}
                <h2>HAS</h2>
                
                <div>
                    <Link to='/light'>
                        <LightSummary system={system} />
                    </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const systems = state.firestore.data.systems;
    const system = systems ? systems[id] : null;

    console.log(systems);

    // return object - represents which properties are attached to the props of this component
    return {
        system: system,
        auth: state.firebase.auth,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'systems'}
    ])
)(HAS);