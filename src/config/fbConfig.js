import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyB1X48SrnZyb0IE4j8UDooTmqmX7-cdgXY",
  authDomain: "smart-home-pwa.firebaseapp.com",
  databaseURL: "https://smart-home-pwa.firebaseio.com",
  projectId: "smart-home-pwa",
  storageBucket: "smart-home-pwa.appspot.com",
  messagingSenderId: "940731683055"
};


firebase.initializeApp(config);
firebase.firestore();

export default firebase;