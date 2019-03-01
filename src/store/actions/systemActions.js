
export const createSystem = () => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    const userID = getState().firebase.auth.uid;

    // add system to firestore collection with userID
    firestore.collection('systems').add({
      userID: userID,
      dummyData: "(firestore data)"
    }).then( () => {
      dispatch({
        type: 'CREATE_SYSTEM_SUCCESS'
      })
    }).catch( (err) => {
      dispatch({
        type: 'CREATE_SYSTEM_ERROR',
        err
      })
    })
  }
}


export const updateLight = (checkbox) => {
  return (dispatch, getState, {getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    // get the document
    // TO DO - get specific system for that user
    const docRef = firestore.collection('RPi').doc('system1');
    docRef.get().then();

    // get value of light switch
    const led1 = docRef.get();
    const led2 = docRef.get();
    console.log(led1, led2);
  }
}