import authReducer from './authReducer';
import systemReducer from './systemReducer';
import dataReducer from './dataReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  auth: authReducer,
  system: systemReducer,
  database: dataReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;