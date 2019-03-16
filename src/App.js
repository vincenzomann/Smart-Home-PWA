import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Sync from './components/auth/Sync'
import HAS from './components/dashboard/HAS'
import Navbar from './components/layout/Navbar' 
import LogIn from './components/auth/LogIn'
import SignUp from './components/auth/SignUp'
import NotificationsDetails from './components/notifications/NotificationsDetails'
import LightDetails from './components/light/LightDetails'
import TemperatureDetails from './components/temperature/TemperatureDetails'
import PulseDetails from './components/pulse/PulseDetails'
import DoorDetails from './components/door/DoorDetails'
import MotionDetails from './components/motion/MotionDetails'
// import { FirebaseDatabaseProvider } from '@react-firebase/database'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Sync}/>
            <Route path='/login' component={LogIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/:id/HAS' component={HAS}/>
            <Route path='/:id/notifications' component={NotificationsDetails}/>
            <Route path='/:id/light' component={LightDetails} />
            <Route path='/:id/temperature' component={TemperatureDetails} />
            <Route path='/:id/pulse' component={PulseDetails} />
            <Route path='/:id/door' component={DoorDetails} />
            <Route path='/:id/motion' component={MotionDetails} />
            <Route path='/:id/settings' component={Sync} />
            <Route path='/:id/contacts' component={Sync} />
            <Route path='/:id/messages' component={Sync} />
            <Route path='/:id/users' component={Sync} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
