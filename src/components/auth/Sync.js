import React, {Component} from 'react'
import {connect} from 'react-redux'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { firestoreConnect, isLoaded } from 'react-redux-firebase'

class Sync extends Component{

  render(){

    // grab system data from state using destructuring then pass as props into the components
    const { systems, auth, lSystem } = this.props;

    // if user is not logged in then redirect to login page
    if (!auth.uid){
      return <Redirect to='/login'/>
    } 

    // wait for systems to be grabbed because it is set to undefined whilst it is fetching the data
    if ( (isLoaded(systems))  ){

      // find this specific system
      const system = systems.find( (system) => { 
        return system.userID === auth.uid;
      });
      
      // wait to find for the new specific system to be added to the systems collection
      // once the specific system has been found redirect to that system with route id as the system doc id
      if (system){
        console.log("found system:\n", system);
        lSystem.docID = system.id;
        return <Redirect to={'/' + system.id + '/HAS'} />
      }
      else {
        return (
          <div className="container center">
              <p>Fetching system...</p>
          </div>
        )
      }

    }else{
      return (
          <div className="container center">
              <p>Loading systems...</p>
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
    lSystem: state.system
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