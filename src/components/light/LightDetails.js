import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { updateLight } from '../../store/actions/dataActions'
import { fetchSystemData } from '../../store/actions/dataActions'

class LightDetails extends Component {

    // Fetch RTD data straight away otherwise values set as undefined on first render
    componentDidMount = () => {
        // get values from RTD and stored in redux state
        this.props.fetchSystemData();
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
    
    render() {
        // get firestore state and pass to props using destructoring
        const { fSystem, auth, database } = this.props;
        
        if (!auth.uid) return <Redirect to='/login' />
        
        // system is undefined at first so need to wait for async fetch to be set properly
        // TO DO - only return jsx when there is data
        if (fSystem && (database.led1 != null)) {
            
            return (
                <div>
                    <h3>Light</h3>

                    <div>
                        <span>Manual Light: <b>{this.lightStatus(database.led1)}</b></span>
                    </div>

                    <div>
                        <button id="btnLed1On"
                            onClick={this.handleLightSwitch}>Turn on</button>
                        <button id="btnLed1Off"
                            onClick={this.handleLightSwitch}>Turn off</button> 
                    </div>

                    <br/>

                    <div>
                        <span>Automated Light: <b>{this.lightStatus(database.led2)}</b></span>
                    </div>

                    <br/>

                    <div>
                        <span>Lux value: <b>{database.lux}</b></span>
                        <br/>
                        <span>Lux threshold: <b>{database.luxThreshold}</b></span>
                    </div>

                    <br/>

                    <div>
                        <span>Lux value guide</span>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Lighting condition</th>
                                    <th>Lux value range</th>
                                </tr>
                                <tr>
                                    <td>Pitch Black</td>
                                    <td>0 - 10</td>
                                </tr>
                                <tr>
                                    <td>Very Dark</td>
                                    <td>11 - 50</td>
                                </tr>
                                <tr>
                                    <td>Dark Indoors</td>
                                    <td>51 - 200</td>
                                </tr>
                                <tr>
                                    <td>Dim Indoors</td>
                                    <td>201 - 400</td>
                                </tr>
                                <tr>
                                    <td>Normal Indoors</td>
                                    <td>401 - 1000</td>
                                </tr>
                                <tr>
                                    <td>Bright Indoors</td>
                                    <td>1001 - 5000</td>
                                </tr>
                                <tr>
                                    <td>Dim Outdoors</td>
                                    <td>5001 - 10,000</td>
                                </tr>
                                <tr>
                                    <td>Cloudy Outdoors</td>
                                    <td>10,001 - 30,000</td>
                                </tr>
                                <tr>
                                    <td>Direct Sunlight</td>
                                    <td>30,001 - 100,000</td>
                                </tr>
                            </tbody>
                        </table>
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
    firestoreConnect( (props) => {
        // Wait for props to be fetched properly
        if (!props.auth.uid) return []
        return [
            {
            collection: 'systems',
            where: [['userID', '==', props.auth.uid]]
            // only grab this user's system
            }
        ]
    })
)(LightDetails);