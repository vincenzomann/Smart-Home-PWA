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
            <Route path='/HAS/:id' component={HAS}/>
            <Route path='/login' component={LogIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/light' component={LightDetails} />
            <Route path='/temperature' component={Sync} />
            <Route path='/door' component={Sync} />
            <Route path='/motion' component={Sync} />
            <Route path='/pulse' component={Sync} />
            <Route path='/settings' component={Sync} />
            <Route path='/contacts' component={Sync} />
            <Route path='/messages' component={Sync} />
            <Route path='/users' component={Sync} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
