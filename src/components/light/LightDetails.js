import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

const LightDetails = (props) => {

    const { fSystem, auth, } = props;

    if (!auth.uid) return <Redirect to='/login' />

    // system is undefined at first so need to wait for async fetch to be set properly
    if (fSystem){
        return (
            <div>
                <h3>Light</h3>

                <div>
                    <input type="checkbox" id="checkLed1" />
                    <label htmlFor="checkLed1">Turn Light on</label>
                </div>

                <div>
                <span className="card-title">Status: {fSystem.dummyData}</span>
                </div>


            </div>
        )
    }
    else{
        return (
            <div className="container center">
                <p>Loading Light...</p>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    // data.systems is object of objects filtered by doc id
    // ordered.systems is array of objects filtered by index

    // route id is the same as system document id
    // grab firestore system by doc id
    const sysDocID = ownProps.match.params.id;
    const systems = state.firestore.data.systems;
    const firestoreSystem = systems ? systems[sysDocID] : null;
    const localSystem = state.system;

    // return object - represents which properties are attached to the props of this component
    return {
        fSystem: firestoreSystem,
        auth: state.firebase.auth,
        lSystem: localSystem,
    }
}



export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'systems'}
    ])
)(LightDetails);