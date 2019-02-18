import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

const LightDetails = (props) => {

    const { system, auth } = props;

    if (!auth.uid) return <Redirect to='/login' />

    return (
        <div>
            <h3>Light</h3>

            <div>
                <input type="checkbox" id="checkLed1" />
                <label htmlFor="checkLed1">Turn Light on</label>
            </div>

            <div>
            <span className="card-title">Status: {system.light.reading}</span>
            </div>


        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    
    const id = ownProps.match.params.id;
    const systems = state.firestore.data.systems;
    const system = systems ? systems[id] : null;

    return {
        system: system,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'systems' }
    ])
)(LightDetails);