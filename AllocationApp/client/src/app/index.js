import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import { NavBar, Home, Signin, Footer } from '../components'
// import { Signup, TeacherClassList, AdminStudentList, AdminTeacherList } from '../pages'
import Student from '../components/Student';
import Teacher from '../components/Teacher';
import Admin from '../components/Admin';
import SignOut from '../components/SignOut';

import { NavBar, Home, Signin, Footer } from '../components';
import {
  Signup,
  TeacherClassList,
  TeacherStudentList,
  TeacherProjectList,
  AdminTeacherList,
  AdminStudentList,
} from '../pages';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdbreact/dist/css/mdb.css';

function App() {

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path='/' exact component={() => <Home />} />
        <Route path='/Register' exact component={Signup} />
        <Route path='/SignIn' exact component={() => <Signin />} />
        <Route path='/Student' exact component={() => <Student />} />
        <Route path='/Teacher' exact component={() => <Teacher />} />
        <Route path='/Admin' exact component={() => <Admin />} />
        <Route path='/SignOut' exact component={() => <SignOut />} />
        <Route path='/teacher/ClassList' exact component = {TeacherClassList} />
        <Route path='/admin/AdminStudentList' exact component = {AdminStudentList} />
        <Route path='/admin/AdminTeacherList' exact component = {AdminTeacherList} />

        <Route
          path='/teacher/StudentList'
          exact
          component={TeacherStudentList}
        />
        <Route
          path='/teacher/ProjectList'
          exact
          component={TeacherProjectList}
        />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
