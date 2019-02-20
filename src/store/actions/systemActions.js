
export const createSystem = () => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    const userID = getState().firebase.auth.uid;

    // add system to firestore collection with userID
    firestore.collection('systems').add({
      userID: userID,
      dummyData: "Lorem Ipsum"
    }).then( () => {
      dispatch({
        type: 'CREATE_SYSTEM_SUCCESS',
        userID: userID
      })
    }).catch( (err) => {
      dispatch({
        type: 'CREATE_SYSTEM_ERROR',
        err
      })
    })
  }
}


export const lightSwitch = () => {
  return () => {
    
  }
}