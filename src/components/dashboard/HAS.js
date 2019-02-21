import React, {Component} from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import LightSummary from '../light/LightSummary'

class HAS extends Component{
    
    render(){

        const { fSystem, auth, lSystem, sysDocID } = this.props;

        if (!auth.uid) return <Redirect to='/login' />

        // wait for async fetch to be set properly
        if (fSystem){

            // assign the uid to local system
            lSystem.userID = auth.uid;
            console.log("lsystem:\n", lSystem);
            console.log("fSystem:\n", fSystem);

            return (
                <div className="dashboard">
                    {console.log("props:\n", this.props)}
                    <h2>HAS</h2>

                    {/* Load Summary components with links to their respective detail pages */}
                    <div>
                        <Link to={'/' + sysDocID + '/light' }><h3>Light</h3></Link>
                        <LightSummary fSystem={fSystem} />
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
    console.log(systems);

    // return object - represents which properties are attached to the props of this component
    return {
        fSystem: firestoreSystem,
        auth: state.firebase.auth,
        lSystem: localSystem,
        sysDocID
    }
}


export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'systems'}
    ])
)(HAS);