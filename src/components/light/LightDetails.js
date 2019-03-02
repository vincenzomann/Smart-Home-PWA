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

    status = (light) => {
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
            
            return (
                <div>
                    <h3>Light</h3>

                    <div>
                        <span>Light 1: <b>{this.status(light1)}</b></span>
                    </div>

                    <div>
                        <button id="btnLed1On"
                            onClick={this.handleLightSwitch}>Turn on</button>
                        <button id="btnLed1Off"
                            onClick={this.handleLightSwitch}>Turn off</button> 
                    </div>

                    <br/>

                    <div>
                        <span>Light 2: <b>{this.status(light2)}</b></span>
                    </div>

                    <div>
                        <button id="btnLed2On"
                            onClick={this.handleLightSwitch}>Turn on</button>
                        <button id="btnLed2Off"
                            onClick={this.handleLightSwitch}>Turn off</button>
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