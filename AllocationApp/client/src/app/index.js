import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { NavBar, Home, Signin, Footer } from '../components'
import { Signup, TeacherClassList, AdminStudentList } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'mdbreact/dist/css/mdb.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/Register" exact component={Signup} />
          <Route path="/SignIn" exact component={() => <Signin />} />
          <Route path='/teacher/ClassList' exact component = {TeacherClassList} />
          <Route path='/admin/AdminStudentList' exact component = {AdminStudentList} />
        </Switch>
        <Footer/>
        </Router>
    )
}

export default App
