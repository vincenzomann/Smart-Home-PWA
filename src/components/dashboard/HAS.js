import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import LightSummary from '../light/LightSummary'

const HAS = (props) => {

    const { fSystem, auth, lSystem } = props;

    if (!auth.uid) return <Redirect to='/login' />

    // wait for async fetch to be set properly
    if (fSystem){

        // assign the uid to local system
        lSystem.userID = auth.uid;
        console.log("lsystem:\n", lSystem);
        console.log("fSystem:\n", fSystem);

        return (
            <div className="dashboard">
                {console.log("props:\n", props)}
                <h2>HAS</h2>

                {/* Load Summary components with links to their respective detail pages */}
                <div>
                    <Link to='/light'>
                        <LightSummary fSystem={fSystem} />
                    </Link>
                </div>

            </div>
        )
    }
    else{
        return (
            <div className="container center">
                <p>Loading HAS...</p>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const systems = state.firestore.data.systems;
    const firestoreSystem = systems ? systems[id] : null;
    const localSystem = state.system;

    // return object - represents which properties are attached to the props of this component
    return {
        fSystem: firestoreSystem,
        auth: state.firebase.auth,
        lSystem: localSystem
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'systems'}
    ])
)(HAS);