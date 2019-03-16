import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'

// config keys stored in separate file and not uploaded to git
import { FirebaseKeys } from './keys/FirebaseKeys'


firebase.initializeApp(FirebaseKeys);
firebase.firestore();
export const rtdb = firebase.database().ref();

export default firebase;