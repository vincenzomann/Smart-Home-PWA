
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


export const updateLight = (btnID) => {
  return (dispatch, getState, {getFirestore}) => {
    
    // make async call to database
    const firestore = getFirestore();
    // get the document
    // TO DO - get specific system for that user
    var docRef = firestore.collection('RPi').doc('system1');
    // update firestore with new value
    if (btnID === "btnLed1On") {
        docRef.update({
          led1: true
        })
    }
    if (btnID === "btnLed1Off") {
        docRef.update({
          led1: false
        })
    }
    if (btnID === "btnLed2On") {
        docRef.update({
          led2: true
        })
    }
    if (btnID === "btnLed2Off") {
        docRef.update({
          led2: false
        })
    }
    
    // snapshot is what you recieve back when getting the docRef
    // snapshot of data in each document of RPi
    firestore.collection('RPi').get().then((snapshot) => {
        snapshot.docs.forEach( doc => {
          console.log(doc.data())
        })
      }
    )
  }
}