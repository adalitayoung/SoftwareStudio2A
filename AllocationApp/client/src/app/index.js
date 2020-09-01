import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { NavBar, Home, Signin,UHome,Nav2 } from '../components'
import { Signup } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'
var nav;
if(window.location.href=='http://localhost:8000/SignIn' || window.location.href=='http://localhost:8000/Register' || window.location.href=='http://localhost:8000/')
{
  nav = <NavBar/>;
}
else if(window.location.href=='http://localhost:8000/UHome') {
  nav = <Nav2/>;
}
function App() {
    return (
        <Router>
            {nav}
            <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/Register" exact component={Signup} />
          <Route path="/SignIn" exact component={() => <Signin />} />
          <Route path="/UHome" exact component={() => <UHome />} />
        </Switch>
        </Router>
    )
}

export default App
