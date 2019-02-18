import React, {Component} from 'react'
import {connect} from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'
import LightSummary from '../light/LightSummary'

class Dashboard extends Component{
  render(){

    // grab system data from state using destructuring then pass as props into the components
    const { system, auth } = this.props;

    // if user is not logged in then redirect to login page
    if (!auth.uid) return <Redirect to='/login'/>

    return (
      <div className="dashboard">
        <h3>Dashboard</h3>
        <LightSummary system={system}/>
      </div>
    )
  }
}

// map state from the store and pass in as props so child components can access it
const mapStateToProps = (state, ownProps) => {

  const id = ownProps.match.params.id;
  const systems = state.firestore.data.systems;
  const system = systems ? systems[id] : null;

  // return object - represents which properties are attached to the props of this component
  return {
    system: system,
    auth: state.firebase.auth
  }

}

// connect component to the store state
// connect component to firestore, telling what data to sync
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'systems'},
    { collection: 'users'},
    { collection: 'notifications'},
    { collection: 'RPi'}
  ])
)(Dashboard);