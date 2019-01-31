import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/' component={Dashboard}/>
            {/* <Route path='/login' component={LogIn} />
            <Route path='/signup' component={SignUp} /> */}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
