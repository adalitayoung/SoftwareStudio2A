import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import back from '../res/back.png';

import api from '../api';
import '../style/style.css';

class AddToProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: localStorage.user,
      studentName: '',
      numberOfStudents: '',
      role: '',
      courseName: localStorage.className,
      projectID: localStorage.projectID,
      positionsLeft: '',
    };
    console.log(this.state.projectID);
    console.log(localStorage);
  }

  addStudent() {
    const id = this.state.projectID;
    const role = this.state.roleType;
    const positions = this.state.positionsLeft;
    const studentID = this.state.studentName;
    api
      .addStudentToProjectManually(id, role, studentID, positions)
      .then((data) => {
        console.log(data);
      });
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
              <div className='name'>Student Name</div>
              <input
                type='className'
                className='form-control'
                id='ExampleInputClassName1'
                onChange={(e) => this.setState({ studentName: e.target.value })}
              ></input>
              <div className='name'>Role</div>
              <input
                type='className'
                className='form-control'
                id='ExampleInputClassName1'
                onChange={(e) => this.setState({ role: e.target.value })}
              ></input>
            </div>
            <div className='name'>Positions Left</div>
            <input
              type='className'
              className='form-control'
              id='ExampleInputClassName1'
              onChange={(e) => this.setState({ positionsLeft: e.target.value })}
            ></input>
            <div className='box button-container'>
              <button
                type='button'
                className='button button--add-class'
                onClick={this.addStudent()}
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
