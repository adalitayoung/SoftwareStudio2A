import React from 'react';
import { Component } from 'react';
import back from '../res/back.png';

import api from '../api';
import '../style/style.css';

class AddToProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: localStorage.user,
      studentID: '',
      roleType: '',
    };

    this.onChangeStudent = this.onChangeStudent.bind(this);
    this.onChangeRoleType = this.onChangeRoleType.bind(this);
    this.addStudent = this.addStudent.bind(this);
  }

  addStudent(event) {
    event.preventDefault();
    const studentID = this.state.studentID;
    const roleType = this.state.roleType;
    const projectID = localStorage.projectID;

    //idk how to put all 3 variables into 1 payload so just gona do this for now
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      projectID: projectID,
      studentID: studentID,
      roleType: roleType,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      'http://localhost:3000/api/project/addStudentToProjectManually',
      requestOptions
    )
      .then((response) => response.text())
      .then(() => window.history.back())
      .catch((error) => console.log('error', error));
  }

  onChangeStudent(event) {
    this.setState({ studentID: event.target.value });
  }
  onChangeRoleType(event) {
    this.setState({ roleType: event.target.value });
  }

  render() {
    return (
      <div className='signup addClass'>
        <div className='box'>
          <div className='box__left'>
            <a id='back' href='javascript:history.back()'>
              <img width='20px' src={back}></img> &nbsp;Project
            </a>
          </div>
          <div
            className='box__center'
            style={{ marginTop: '-100px', width: '50%' }}
          >
            <div className='form-group'>
              <br></br>
              <h2>Add a student to {localStorage.projectName} </h2>
              <br></br>
              <br></br>
              <div className='name'>Student ID</div>
              <input
                type='text'
                className='form-control'
                value={this.state.studentID}
                onChange={this.onChangeStudent}
              ></input>
              <div className='name'>Role</div>
              <h5 id='note'>
                Please note this must be an already existing role
              </h5>
              <input
                type='text'
                className='form-control'
                value={this.state.roleType}
                onChange={this.onChangeRoleType}
              ></input>
            </div>
            <div className='box button-container'>
              <button
                type='button'
                className='button button--add-class'
                onClick={this.addStudent}
              >
                Add to Project
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AddToProject;
