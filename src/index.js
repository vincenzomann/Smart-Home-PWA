import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import './NavBar.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './store/reducers/rootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import fbConfig from './config/fbConfig'
// import { FirebaseDatabaseProvider } from '@react-firebase/database'

const allStoreEnhancers = compose(
  applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
  reduxFirestore(fbConfig),
  reactReduxFirebase(fbConfig, {useFirestoreForProfile: true, userProfile: 'users', attachAuthIsReady: true}),
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // redux chrome dev tools must be commented out when being deployed!!!
)

const store = createStore(rootReducer, allStoreEnhancers);


// store.firebaseAuthIsReady.then( () => {
//   ReactDOM.render(<Provider store={store}><FirebaseDatabaseProvider ><App /></FirebaseDatabaseProvider></Provider>, document.getElementById('root'));
// })

store.firebaseAuthIsReady.then( () => {
  ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
