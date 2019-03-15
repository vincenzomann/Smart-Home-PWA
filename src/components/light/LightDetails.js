import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { updateLight } from '../../store/actions/systemActions'

class LightDetails extends Component {

    handleLightSwitch = (e) => {
        // pass in element id
        this.props.updateLight(e.target.id);
    }

    // method to translate "true" to "On" and "false" to "Off"
    lightStatus = (light) => {
        if (light === "true")
            return "On"
        else
            return "Off"
    }
    
    render() {
        // get firestore state and pass to props using destructoring
        const { fSystem, auth, rpi } = this.props;
        
        if (!auth.uid) return <Redirect to='/login' />
        
        // system is undefined at first so need to wait for async fetch to be set properly
        if (fSystem && rpi){
            
            // get light values from firestore
            const light1 = rpi.led1.toString();
            const light2 = rpi.led2.toString();
            const luxVal = rpi.lux.toString();
            
            return (
                <div>
                    <h3>Light</h3>

                    <div>
                        <span>Light 1: <b>{this.lightStatus(light1)}</b></span>
                    </div>

                    <div>
                        <button id="btnLed1On"
                            onClick={this.handleLightSwitch}>Turn on</button>
                        <button id="btnLed1Off"
                            onClick={this.handleLightSwitch}>Turn off</button> 
                    </div>

                    <br/>

                    <div>
                        <span>Light 2: <b>{this.lightStatus(light2)}</b></span>
                    </div>

                    <div>
                        <button id="btnLed2On"
                            onClick={this.handleLightSwitch}>Turn on</button>
                        <button id="btnLed2Off"
                            onClick={this.handleLightSwitch}>Turn off</button>
                    </div>

                    <br/>

                    <div>
                        <span>Lux value: <b>{luxVal}</b></span>
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
    // TO DO - get specific rpi for that system
    const RPIs = state.firestore.ordered.RPi;
    const rpi = RPIs ? RPIs[0] : null;

    // return object - represents which properties are attached to the props of this component
    return {
        fSystem: firestoreSystem,
        auth: state.firebase.auth,
        lSystem: localSystem,
        rpi
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
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
            },
            { collection: 'RPi'}
        ]
    })
)(LightDetails);