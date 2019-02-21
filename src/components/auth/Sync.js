import React, {Component} from 'react'
import {connect} from 'react-redux'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { firestoreConnect, isLoaded } from 'react-redux-firebase'

class Sync extends Component{

  render(){

    // grab system data from state using destructuring then pass as props into the components
    const { systemUID, systems, auth } = this.props;

    // if user is not logged in then redirect to login page
    if (!auth.uid){
      return <Redirect to='/login'/>
    }
    
    // wait for systems to be grabbed because it is set to undefined whilst it is fetching the data
    // once the system has been created for the first time the redux state userID will be set
    if ( (isLoaded(systems)) && (systemUID != null) ){
      console.log(systems);
      // find this specific system
      const system = systems.find( (system) => { 
        return system.userID === auth.uid;
      });
      console.log(system);

      return <Redirect to={'/HAS/' + system.id } />
    }else{
      return (
            <div className="container center">
                <p>Synching...</p>
            </div>
        )
    }

  }
}

// map state from the store and pass in as props so child components can access it
const mapStateToProps = (state) => {

  // return object - represents which properties are attached to the props of this component
  return {
    auth: state.firebase.auth,
    systems: state.firestore.ordered.systems,
    systemUID: state.system.userID
  }

}

// connect component to the store state
// connect component to firestore, telling what data to sync
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
      { collection: 'systems'}
  ])
)(Sync);