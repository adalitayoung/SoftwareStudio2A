import React, { Component } from "react";
import '../style/style.css';
import { withRouter } from "react-router-dom";

import { Link } from 'react-router-dom'

class Student extends Component {

  constructor(props) {
    super(props)
    this.state = {
        user: props.location.state.user,
        classData: [],
        isLoading: false,
    }

      //this.fetchClassList(this.state.user._id)
}

viewClass = async event => {
  event.preventDefault();
  console.log("it works")
    // redirect to class list
}

viewProject = async event => {
  event.preventDefault();
  console.log("it works")
    // redirect to project page
}

enroll = async event => {
  event.preventDefault();
  console.log("it works")
    // redirect to enroll page
}

edit = async event => {
  event.preventDefault();
   // redirect to edit page
}

renderTableData(){
  return this.state.classData.map((course, index) => {
    const { studentID, courseName,teacherName, time, room, __v, _id } = course //destructuring
    return (
       <tr key={_id}>
          <td style={{textAlign: "center"}}>{studentID}</td>
          <td style={{textAlign: "center"}}>{courseName}</td>
          <td style={{textAlign: "center"}}>{teacherName}</td>
          <td style={{textAlign: "center"}}>{time}</td>
          <td style={{textAlign: "center"}}>{room}</td>
          <td>
            <button style = {{width: "70%", marginLeft: "15%"}} className="btn btn-primary btn-block" onClick={this.edit}>
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
              <div className = "col" style={{marginTop: "10%"}}>
                <h2>{this.state.user.fullName}'s Classes</h2>
              <div className="row">
                    
                    <button style = {{width: "15%", position: "absolute", left: "0"}} className="btn btn-primary btn-block" onClick = {this.viewClass}>Classes</button>
                    <button style = {{width: "15%", position: "absolute", right: "0"}} className="btn btn-primary btn-block" onClick = {this.enroll}>Enroll in</button>
                    <button style = {{width: "15%", marginLeft: "15%", left: "0"}} className="btn btn-primary btn-block" onClick = {this.viewProject}>Projects</button>
              </div>
              <table class="center">
                <tr>
                  <th style={{textAlign: "center"}}>
                    ID
                  </th>
                  <th style={{textAlign: "center"}}> 
                    Class Name
                  </th>
                  <th style={{textAlign: "center"}}>
                    Teacher Name
                  </th>
                  <th style={{textAlign: "center"}}>
                    Time
                  </th>
                  <th style={{textAlign: "center"}}>
                    Room
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

export default withRouter(Student);