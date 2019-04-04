import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { updateLight } from '../../store/actions/dataActions'
import { fetchSystemData } from '../../store/actions/dataActions'

class DoorDetails extends Component {

    // Fetch RTD data straight away otherwise values set as undefined on first render
    componentDidMount = () => {
        // get values from RTD and stored in redux state
        this.props.fetchSystemData();
    }

    // method to print if door sensor is triggered
    doorStatus = (door) => {
        if (door === true)
            return "Open"
        else if (door === false)
            return "Closed"
        else
            return "-"
    }

    handleLightSwitch = (e) => {
        // pass in element id
        this.props.updateLight(e.target.id);
    }

    // method to translate "true" to "On" and "false" to "Off"
    lightStatus = (light) => {
        if (light === true)
            return "On"
        else if (light === false)
            return "Off"
        else
            return "-"
    }

    render(){

        const { fSystem, auth, database } = this.props;

        if (!auth.uid) return <Redirect to='/login' />

        // system is undefined at first so need to wait for async fetch to be set properly
        if (fSystem){
            return (
                <div>
                    <h3>Door Sensor</h3>

                    <div>
                        <span>Door Status: <b>{this.doorStatus(database.door)}</b></span>
                        <br/>
                        <span>Door Timestamp: <b>{database.doorTime}</b></span>
                    </div>

                    <br/>

                    <div>
                        <span>Security Light: <b>{this.lightStatus(database.led3)}</b></span>
                    </div>

                    <div>
                        <button id="btnLed3Off"
                            onClick={this.handleLightSwitch}>Turn off</button> 
                    </div>

                    <br/>

                    <div>
                    <span className="card-title">Status: {fSystem.dummyData}</span>
                    </div>


                </div>
            )
        }
        else{
            return (
                <div className="container center">
                    <p>Loading ...</p>
                </div>
            )
        }
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
    // TO DO - get specific data system for that user
    const database = state.database;

    // return object - represents which properties are attached to the props of this component
    return {
        fSystem: firestoreSystem,
        auth: state.firebase.auth,
        lSystem: localSystem,
        database
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSystemData: () => dispatch(fetchSystemData()),
        updateLight: (btnID) => dispatch(updateLight(btnID))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'systems'}
    ])
)(DoorDetails);