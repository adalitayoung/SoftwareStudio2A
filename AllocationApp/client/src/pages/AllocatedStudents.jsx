import React from 'react';

import api from '../api';
import edit from '../res/edit.png';
import del from '../res/delete.png';
import back from '../res/back.png';

import { Link } from 'react-router-dom';
import { Component } from 'react';

class AllocatedStudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: localStorage.user,
      course: props.location.state.course,
      projectName: localStorage.projectName,
      projectData: [], //stores the output from the api call
      isLoading: false,
    };
    console.log(this.state);
    this.showRoles();
  }

  showRoles() {
    const class_id = this.state.course;
    localStorage.setItem('classID', class_id);
    localStorage.setItem('className', this.state.className);
    console.log(localStorage);
    api.showRoles(class_id).then((data) => {
      console.log(data);
      //   this.setState({ projectData: data.data });
    });
  }

  addStudentToProject(_id) {
    // localStorage.setItem('classID', _id);
    // localStorage.setItem('className', name);
    // console.log(localStorage.className);
    console.log('whats happening');
    this.props.history.push({
      pathname: '/AddToProject',
      state: { course: _id },
    });
  }

  deleteProject(_id, projectName) {
    const name = projectName;
    const classname = this.state.className;
    api.deleteProject(_id).then(() => {
      window.alert(name + ' has been removed from ' + classname);
      window.location.reload();
    });
  }

  renderTableData() {
    return this.state.projectData.map((project) => {
      const { roleType, studentsEnrolledID, positionsLeft, _id } = project; //destructuring
      return (
        <tr key={_id}>
          <td id='tdclass'>{roleType}</td>
          <td id='tdclass'>{studentsEnrolledID}</td>
          <td id='tdclass'>{positionsLeft}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className='container scrollable'>
        <div className='row align-items-center'>
          <a id='back' href='javascript:history.back()'>
            <img width='20px' src={back}></img> &nbsp;Classes
          </a>
          <div className='col' id='column'>
            <div className='row'>
              <h2>Students Allocated in {this.state.projectName}</h2>
            </div>
            <br></br>
            <table className='center' id='table'>
              <tr>
                <th id='th'>Role Type</th>
                <th id='th'>Students Enrolled IDs</th>
                <th id='th'>Positions Left</th>
              </tr>
              <tbody>{this.renderTableData()}</tbody>
              <button
                style={{
                  width: '25%',
                  position: 'absolute',
                  right: '50px',
                  marginTop: '25px',
                }}
                className='btn btn-primary btn-round'
                onClick={() => this.addStudentToProject()}
              >
                Add Student to project
              </button>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default AllocatedStudents;
