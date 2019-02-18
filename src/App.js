import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
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
            <Route exact path='/' component={Dashboard}/>
            <Route path='/login' component={LogIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/light' component={LightDetails} />
            <Route path='/temperature' component={Dashboard} />
            <Route path='/door' component={Dashboard} />
            <Route path='/motion' component={Dashboard} />
            <Route path='/pulse' component={Dashboard} />
            <Route path='/settings' component={Dashboard} />
            <Route path='/contacts' component={Dashboard} />
            <Route path='/messages' component={Dashboard} />
            <Route path='/users' component={Dashboard} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
