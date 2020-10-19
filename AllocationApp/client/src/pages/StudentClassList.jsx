import React, { Component } from "react";
import '../style/style.css';
import { withRouter } from "react-router-dom";
import api from '../api';
import { Link } from 'react-router-dom'

class StudentClassList extends Component {

  constructor(props) {
    super(props)
    this.state = {
        user: props.location.state.user,
        course: props.location.state.course,
        className: props.location.state.className,
        classData: [],
        isLoading: false,
    }
    localStorage.setItem('user', this.state.user.fullName)
    localStorage.setItem('user', this.state.user.id)
    this.fetchClassList()
}

fetchClassList(){
    //fetch the class list the student has enrolled
    const _id = this.state.user.id;
    console.log(_id)
    api.showMyclasses(_id).then((data) => {
      // need to change class model and check if the course is for that teacher
      console.log(data);
      this.setState({ classData: data.data });
    });
}

// fetchClassList() {
//   const class_id = '';
//   //localStorage.setItem('classID', class_id);
//   //localStorage.setItem('className', this.state.className);

//   api.showMyclasses(class_id).then((data) => {
//     console.log(data);
//     this.setState({ classData: data.data});
//   });
// }

viewClass = async event => {
  event.preventDefault();
  this.props.history.push({
    pathname: '/student/ClassList',
  })   // redirect to class list
}

viewProject = async event => {
  event.preventDefault();
  const user = this.state.user;
  this.props.history.push({
    pathname: '/student/StudentProjectList',
    state: {user: user}
  })  // redirect to project page
}

enroll = async event => {
  event.preventDefault();
  const user = this.state.user;
  const course = this.state.course;
  this.props.history.push({
    pathname: '/student/Enroll',
    state: {user: user, course: course},
  })    // redirect to enroll page
}

edit(id){
  const user = this.state.user;
  console.log(id)
  this.props.history.push({
    pathname:`/student/updatepreferences/${id}`,
    state: {user: user, course: id}
  })
   // redirect to edit page
}

renderTableData(){
  return this.state.classData.map((course) => {
    const { name, numberOfStudents, _id } = course //destructuring
    return (
       <tr key={_id}>
          <td id='tdclass'>{name}</td>
          <td id='tdclass'>{numberOfStudents}</td>
          <td>
            <button 
              style = {{width: "40%", marginLeft: "30%"}} 
              className="btn btn-primary btn-block" 
              onClick={(course) => this.edit(_id)}>
                Edit
            </button>
          </td>
       </tr>
    )
 })
}

render() {
  return(
      <div className="container scrollable">
          <div className="row align-items-center">
              <div className = "col" id='column'>
                <h2>{this.state.user.fullName}'s Classes</h2> 
              <div className="row">                    
                  <button style = {{width: "15%", position: "absolute", marginLeft: ""}} className="btn btn-primary btn-block" onClick = {this.viewClass}>Classes</button>
                  <button style = {{width: "15%", marginLeft: "16%", left: "0"}} className="btn btn-primary btn-block" onClick = {this.viewProject}>Projects</button>
                  <button style = {{width: "15%", position: "absolute", right: "3%"}} className="btn btn-primary btn-block" onClick = {this.enroll}>Enroll in</button>                  
              </div>
              <table class="center" id='table'>
                <tr>
                  <th style={{textAlign: "center"}}> 
                    Class Name
                  </th>
                  <th style={{textAlign: "center"}}>
                    Number of Students
                  </th>
                  <th style={{textAlign: "center"}}>
                    Preference
                  </th>
                  </tr>
                  <tbody>
                      {this.renderTableData()}
                  </tbody>
                </table>
              </div>
          </div>
            
      </div>
        
    )
}
  
}

export default withRouter(StudentClassList);