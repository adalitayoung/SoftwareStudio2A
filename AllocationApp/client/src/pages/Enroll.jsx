import React from 'react';

import api from '../api';

import { Link } from 'react-router-dom';
import { Component } from 'react';

class Enroll extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: props.location.state.user,
      course: props.location.state.course,
      className: props.location.state.className,
      classData: [],
      isLoading: false,
    };
    console.log(props);
    this.getClasses();
  }

    getClasses() {
        api.getAllCourses().then((data) => {
          console.log(data);
          this.setState({ classData: data.data.data });
          console.log(this.state.classData);
        });
    }
    
    join(course) {
      const id = this.state.user.id
      console.log(course.name)
      api.addStudentToClass(id, course.name).then((data) => {
        //this.setState({ course: data })
        window.alert(this.state.user.fullName + " is enrolled into class.")
      })
    }

    viewClass = async event => {
        event.preventDefault();
        const user = this.state.user;
        this.props.history.push({
          pathname: '/student/ClassList',
          state: {user: user}
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
          state: {user: user, course: course}
        })    // redirect to enroll page
      }
    
    renderTable() {
      return this.state.classData.map((course, index) => {
        const { name, numberOfStudents, _id } = course; //destructuring
        console.log(_id);
        return (
          <tr key={_id}>
            <td id='tdclass'>{name}</td>
            <td id='tdclass'>{numberOfStudents}</td>
            <td>
              <button
                style = {{width: "70%", marginLeft: "15%"}} 
                className="btn btn-primary btn-block"
                onClick={() => this.join(course)}
              >
                Enroll
              </button>
            </td>
          </tr>
        );
      });
    }

    render() {
        return (
        <div className='container scrollable'>
            <div className='row align-items-center'>
            <div className='col' id='column'>
                <h2>Please enroll in following classes.</h2>
                <div className="row">
                  <button style = {{width: "15%", position: "absolute", marginLeft: ""}} className="btn btn-primary btn-block" onClick = {this.viewClass}>Classes</button>
                  <button style = {{width: "15%", marginLeft: "16%", left: "0"}} className="btn btn-primary btn-block" onClick = {this.viewProject}>Projects</button>
                  <button style = {{width: "15%", position: "absolute", right: "3%"}} className="btn btn-primary btn-block" onClick = {this.enroll}>Enroll in</button>    
                </div>
                <table className='center' id='table'>
                <tr>
                    <th id='th'>Class Name</th>
                    <th id='th'>Student Number</th>
                    <th id='th'>Join Class</th>
                    <th></th>
                    <th></th>
                </tr>
                <tbody>
                    {this.renderTable()}
                </tbody>
                </table>
            </div>
            </div>
        </div>
        );
    }
}

export default Enroll;
