import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import back from '../res/back.png';

import api from '../api';
import '../style/style.css';
import { AiOutlineConsoleSql } from 'react-icons/ai';

class EditClass extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      //   user: props.location.state.user.fullName,
      //   course: props.location.state.course,
      className: '',
      numberOfStudents: '',
      courseName: localStorage.className,
      //   projectData: [], //stores the output from the api call
      //   isLoading: false,
    };
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
            <Link to='/teacher/ClassList'>
              <div className='name'>
                <img width='20px' src={back}></img> &nbsp;Classes
              </div>
            </Link>
          </div>
          <div className='box__center'>
            <div className='form-group'>
              <h3>Update Details for class: {this.state.courseName} </h3>
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
