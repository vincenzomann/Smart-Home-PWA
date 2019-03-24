import React, {Component} from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import NotificationsSummary from '../notifications/NotificationsSummary'
import TemperatureSummary from '../temperature/TemperatureSummary'
import LightSummary from '../light/LightSummary'
import PulseSummary from '../pulse/PulseSummary'
import DoorSummary from '../door/DoorSummary'
import MotionSummary from '../motion/MotionSummary'
import { fetchSystemData } from '../../store/actions/dataActions'

class HAS extends Component{

    componentDidMount = () => {
        // get values from RTD and stored in redux state
        this.props.fetchSystemData();
    }
    
    render(){

        const { fSystem, auth, lSystem, sysDocID, database } = this.props;

        if (!auth.uid) return <Redirect to='/login' />

        // system is undefined at first so need to wait for async fetch to be set properly
        if (fSystem && (database.led1 != null) ){

            // assign the uid to local system
            lSystem.userID = auth.uid;
            console.log("lSystem:\n", lSystem);
            console.log("fSystem:\n", fSystem);
            console.log(database);

            return (
                <div className="dashboard">
                    {console.log("props:\n", this.props)}
                    <h2>HAS</h2>

                    {/* Load Summary components with links to their respective detail pages */}
                    <div className="summary-link">
                        <Link to={'/' + sysDocID + '/notifications' }><h3>Notifications</h3></Link>
                        <NotificationsSummary fSystem={fSystem} />
                    </div>
                    <div className="summary-link">
                        <Link to={'/' + sysDocID + '/light' }><h3>Light</h3></Link>
                        <LightSummary database={database}/>
                    </div>
                    <div className="summary-link">
                        <Link to={'/' + sysDocID + '/temperature' }><h3>Temperature</h3></Link>
                        <TemperatureSummary database={database} fSystem={fSystem} />
                    </div>
                    <div className="summary-link">
                        <Link to={'/' + sysDocID + '/pulse' }><h3>Heart Rate</h3></Link>
                        <PulseSummary database={database} fSystem={fSystem} />
                    </div>
                    <div className="summary-link">
                        <Link to={'/' + sysDocID + '/door' }><h3>Door Sensor</h3></Link>
                        <DoorSummary database={database} fSystem={fSystem} />
                    </div>
                    <div className="summary-link">
                        <Link to={'/' + sysDocID + '/motion' }><h3>Motion Sensor</h3></Link>
                        <MotionSummary database={database} fSystem={fSystem} />
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
    // TO DO - get specific rpi for that system
    const database = state.database;

    // return object - represents which properties are attached to the props of this component
    return {
        fSystem: firestoreSystem,
        auth: state.firebase.auth,
        lSystem: localSystem,
        sysDocID,
        database
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSystemData: () => dispatch(fetchSystemData())
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
)(HAS);