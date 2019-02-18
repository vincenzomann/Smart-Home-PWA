// import { firestore } from "firebase";

export const login = (credentials) => {
  return (dispatch, getState, {getFirebase}) => {
    // initialise firebase
    const firebase = getFirebase();

    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then( () => {
      dispatch({ type: 'LOGIN_SUCCESS'})
    }).catch( (err) => {
      dispatch({ type: 'LOGIN_ERROR', err});
    })
  }
}

export const logout = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    firebase.auth().signOut().then(()=>{
      dispatch({ type: 'LOGOUT_SUCCESS'})
    });
  }
}

export const signup = (newUser) => {
  return (dispatch, getState, {getFirestore, getFirebase}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    // generate new user
    firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then( (response) => {
      // create new user record - doc() rather than add()
      return firestore.collection('users').doc(response.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: newUser.firstName[0] + newUser.lastName[0]
      });
    }).then( () => {
      dispatch({ type: 'SIGNUP_SUCCESS'})
    }).catch( err => {
      dispatch({ type: 'SIGNUP_ERROR', err})
    })
  }
}