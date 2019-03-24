import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { fetchSystemData } from '../../store/actions/dataActions'

class TemperatureDetails extends Component {

    // Fetch RTD data straight away otherwise values set as undefined on first render
    componentDidMount = () => {
        // get values from RTD and stored in redux state
        this.props.fetchSystemData();
    }

    // method to add celcius unit
    celcius = (temp) => {
        return temp + "°C"
    }


    // method to translate "true" to "On" and "false" to "Off"
    heatingStatus = (heating) => {
        if (heating === true)
            return "On"
        else if (heating === false)
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
                    <h3>Temperature</h3>

                    <div>
                        <span>Temperature: <b>{this.celcius(database.temp)}</b></span>
                    </div>

                    <br/>

                    <div>
                        <span>Heating: <b>{this.heatingStatus(database.led4)}</b></span>
                        <br/>
                        <span>Heating Treshold: <b>{this.celcius(database.tempThreshold)}</b></span>
                    </div>


                    <br/>

                    <div>
                        <span className="card-title">{fSystem.dummyData}</span>
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
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'systems'}
    ])
)(TemperatureDetails);