import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Sync from './components/auth/Sync'
import HAS from './components/dashboard/HAS'
import Navbar from './components/layout/Navbar';
import LogIn from './components/auth/LogIn';
import SignUp from './components/auth/SignUp';
import LightDetails from './components/light/LightDetails'

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
            <Route path='/:id/light' component={LightDetails} />
            <Route path='/:id/temperature' component={Sync} />
            <Route path='/:id/door' component={Sync} />
            <Route path='/:id/motion' component={Sync} />
            <Route path='/:id/pulse' component={Sync} />
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
