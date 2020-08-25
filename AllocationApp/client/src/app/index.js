import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { NavBar, Home, Signin } from '../components'
import { Signup } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/Register" exact component={Signup} />
          <Route path="/SignIn" exact component={() => <Signin />} />
        </Switch>
        </Router>
    )
}

export default App
