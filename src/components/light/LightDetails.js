import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { updateLight } from '../../store/actions/systemActions'

class LightDetails extends Component {

    handleLightSwitch = (e) => {
        const led = document.getElementById("checkLed1")
        console.log(led)
        console.log(e.target);
        // pass in checkbox element
        this.props.updateLight(e.target);
    }

    isLightChecked = (e) => {
        console.log(e.target);
    }

    // checkboxLight = () => {
        
        
    //     if (light1 === 'true'){
    //         boxLed1.setAttribute("checked")
    //     }
    //     else{
    //         if (boxLed1.hasAttribute("checked") === "true")
    //             boxLed1.removeAttribute("checked")
    //     }

    //     if (light2 === 'true'){
    //         boxLed2.setAttribute("checked")
    //     }
    //     else{
    //         if (boxLed2.hasAttribute("checked") === "true")
    //             boxLed2.removeAttribute("checked")
    //     }
    // }
    
    render() {
        // get firestore state and pass to props using destructoring
        const { fSystem, auth, rpi } = this.props;
        
        if (!auth.uid) return <Redirect to='/login' />
        
        // system is undefined at first so need to wait for async fetch to be set properly
        if (fSystem && rpi){
            
            // get light values from firestore
            const light1 = rpi.led1;
            const light2 = rpi.led2;
            
            // this.props.updateLight();
            console.log(light1, light2);

            this.isLightChecked(light1,light2);

            
            return (
                <div>
                    <h3>Light</h3>

                    <div>
                        {/* to get element by id in react, use ref attribute */}
                        <input type="checkbox" id="checkLed1" 
                            ref={ref => this.getLed1 = ref}
                            onChange={this.handleLightSwitch}/>
                        <label htmlFor="checkLed1">Turn Light 1 on</label>
                    </div>

                    <div>
                        <span>Status: <b>{rpi.led1.toString()}</b></span>
                    </div>

                    <div>
                        <input type="checkbox" id="checkLed2" ref="checkLed2"
                            onChange={this.handleLightSwitch}/>
                        <label htmlFor="checkLed2">Turn Light 2 on</label>
                    </div>

                    <div>
                        <span>Status: <b>{rpi.led2.toString()}</b></span>
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
        updateLight: (checkbox) => dispatch(updateLight(checkbox))
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