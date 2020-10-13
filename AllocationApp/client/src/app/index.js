import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { NavBar, Home, Signin, Footer } from '../components';
import Student from '../components/Student';
import Teacher from '../components/Teacher';
import Admin from '../components/Admin';
import SignOut from '../components/SignOut';
import Editpreferences from '../components/Editpreferences';

import {
  Signup,
  AddProject,
  AddClass,
  EditClass,
  TeacherClassList,
  TeacherStudentList,
  TeacherProjectList,
  AdminTeacherList,
  AdminStudentList,
  StudentClassList,
  Enroll,
  StudentProjectList,
  AdminUpdateUserRole
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
        <Route path='/AddClass' exact component={() => <AddClass />} />
        <Route path='/EditClass' exact component={() => <EditClass />} />
        <Route path='/Student' exact component={() => <Student />} />
        <Route path='/Teacher' exact component={() => <Teacher />} />
        <Route path='/Admin' exact component={() => <Admin />} />
        <Route path='/SignOut' exact component={() => <SignOut />} />
        <Route path='/AddProject' exact component={AddProject} />
        <Route
          path='/admin/AdminTeacherList'
          exact
          component={AdminTeacherList}
        />
        <Route
          path='/admin/AdminStudentList'
          exact
          component={AdminStudentList}
        />
        <Route 
          path='/admin/UpdateUserRole' exact component={AdminUpdateUserRole}/>
        <Route path='/teacher/ClassList' exact component={TeacherClassList} />
        <Route path='/student/ClassList' exact component={StudentClassList} />
        <Route path='/student/Enroll' exact component={Enroll} />
        <Route
          path='/student/StudentProjectList'
          exact
          component={StudentProjectList}
        />
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
        <Route
          path='/student/updatepreferences'
          exact
          component={Editpreferences}
        />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
