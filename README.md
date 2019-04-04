## Dependencies

npm install -g yarn
yarn install react-router-dom redux react-redux redux-thunk firebase react-redux-firebase redux-firestore moment react-firebase/database
yarn install -g firebase-tools

This app uses react-redux v5.1.1 and does not work with v6.

The redux dev tools extension must be commented out for app to work on mobile. Comment out before building and deploying to firebase.

run bash script ./has.sh to execute the python scripts