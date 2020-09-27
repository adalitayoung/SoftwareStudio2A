import React from 'react';

import api from '../api';

//import back from '../res/back.png';
import { Link } from 'react-router-dom';
import { Component } from 'react';

class StudentProjectList extends Component {

  constructor(props){
    super(props);
    this.state = {
      user: props.location.state.user,
      projectData: [],
      isLoading: false,
    };
    console.log(props);
    this.getProject(this.state.user._id);
  }

    getProject() {
        const class_id = ''
        api.showClassProjects(class_id).then( data => {
          this.setState({ projectData: data.data.data})
        })
    }

    join = async event => {
        event.preventDefault();
        console.log("join");
        //add the student to the class
    }
  
    viewClass = async event => {
        event.preventDefault();
        console.log("it works")
        const user = this.state.user;
        this.props.history.push({
          pathname: '/student/ClassList',
          state: {user: user}
        })   // redirect to class list
      }
      
      viewProject = async event => {
        event.preventDefault();
        console.log("it works")
        const user = this.state.user;
        this.props.history.push({
          pathname: '/student/StudentProjectList',
          state: {user: user}
        })  // redirect to project page
      }
      
      enroll = async event => {
        event.preventDefault();
        console.log("it works")
        const user = this.state.user;
        this.props.history.push({
          pathname: '/student/Enroll',
          state: {user: user}
        })    // redirect to enroll page
      }

      renderTableData() {
        return this.state.projectData.map((course) => {
          const { name, des, role, _id} = course;

          return (
            <tr key={_id}>
              <td id='tdclass'>{name}</td>
              <td id='tdclass'>{des}</td>
              <td id='tdClass'>
                {role}
              </td>
            </tr>
          )
        })
      }

    render() {
        return (
        <div className='container scrollable'>
            <div className='row align-items-center'>
            <div className='col' id='column'>
                <h2>Ongoing Projects</h2>
                <div className="row">                    
                  <button style = {{width: "15%", position: "absolute", marginLeft: ""}} className="btn btn-primary btn-block" onClick = {this.viewClass}>Classes</button>
                  <button style = {{width: "15%", marginLeft: "16%", left: "0"}} className="btn btn-primary btn-block" onClick = {this.viewProject}>Projects</button>
                  <button style = {{width: "15%", position: "absolute", right: "3%"}} className="btn btn-primary btn-block" onClick = {this.enroll}>Enroll in</button>    
                </div>
                <table className='center' id='table'>
                <tr>
                    <th id='th'>Project Name</th>
                    <th id='th'>Project Description</th>
                    <th id='th'>Role</th>
                    <th></th>
                    <th></th>
                </tr>
                <tbody>
                    { this.renderTableData()}
                </tbody>
                </table>
            </div>
            </div>
        </div>
        );
    }
}

export default StudentProjectList;
