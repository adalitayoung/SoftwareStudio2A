import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import back from '../res/back.png';

import api from '../api';
import '../style/style.css';

class EditClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: localStorage.user,
      className: '',
      numberOfStudents: '',
      courseName: localStorage.className,
    };

    console.log(localStorage);

    if (this.state.user === 'undefined') {
      localStorage.setItem('user', this.state.user.fullName);
    }
    console.log(this.state);
  }

  editClass() {
    const id = localStorage.classID;
    const numberOfStudents = this.state.numberOfStudents;
    const name = this.state.className;

    api.updateCourse(id, name, numberOfStudents).then((data) => {
      console.log(data);
    });
  }

  render() {
    return (
      <div className='signup addClass'>
        <div className='box'>
          <div className='box__left'>
            <a id='back' href='javascript:history.back()'>
              <img width='20px' src={back}></img> &nbsp;Classes
            </a>
          </div>
          <div
            className='box__center'
            style={{ marginTop: '-100px', width: '50%' }}
          >
            <div className='form-group'>
              <br></br>
              <br></br>
              <h2>{this.state.courseName} </h2>
              <br></br>
              <div className='name'>Update Class Name</div>
              <input
                type='className'
                className='form-control'
                id='ExampleInputClassName1'
                onChange={(e) => this.setState({ className: e.target.value })}
              ></input>
              <div className='name'>Update Number of students</div>
              <input
                type='className'
                className='form-control'
                id='ExampleInputClassName1'
                onChange={(e) =>
                  this.setState({ numberOfStudents: e.target.value })
                }
              ></input>
            </div>
            <div className='box button-container'>
              <button
                type='button'
                className='button button--add-class'
                onClick={this.editClass()}
              >
                Update Class Details
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditClass;
