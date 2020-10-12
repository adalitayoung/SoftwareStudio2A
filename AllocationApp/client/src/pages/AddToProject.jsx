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
    };
  }

  render() {
    return (
      <div className='signup addClass'>
        <div className='box'>
          <div className='box__left'>
            <Link to='/teacher/ClassList'>
              <div className='name'>
                <img width='20px' src={back}></img> &nbsp;Classes
              </div>
            </Link>
          </div>
          <div className='box__center'>
            <div className='form-group'>
              <h3>Manually add a student to Project: </h3>

              <div>number of places available: </div>
              <div>Roles available: </div>
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
            <div className='box button-container'>
              <button
                type='button'
                className='button button--add-class'
                // onClick={}
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
