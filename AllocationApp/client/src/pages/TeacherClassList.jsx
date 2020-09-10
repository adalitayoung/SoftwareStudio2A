import React from 'react';

import api from '../api';

import edit from '../res/edit.png';
import del from '../res/delete.png';
import { Link } from 'react-router-dom';
import { Component } from 'react';

class TeacherClassList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.location.state.user,
      classData: [],
      isLoading: false,
    };

    this.fetchClassList(this.state.user._id);
  }

  fetchClassList(userId) {
    api.getAllCourses().then((data) => {
      // need to change class model and check if the course is for that teacher
      // console.log(data)
      this.setState({ classData: data.data.data });
      console.log(this.state.classData);
    });
  }

  editClass(user) {
    // event.preventDefault();
    console.log('edit');
    console.log(user);
  }

  deleteClass(user) {
    // event.preventDefault();
    console.log('delete');
    console.log(user);
  }

  viewStudents = async (event) => {
    event.preventDefault();
  };

  viewProjects = async (event) => {
    event.preventDefault();
  };

  addClass = async (event) => {
    event.preventDefault();
    // redirect to add class
  };

  renderTableData() {
    return this.state.classData.map((course, index) => {
      const { name, numberOfStudents, __v, _id } = course; //destructuring
      return (
        <tr key={_id}>
          <td id='tdclass'>{name}</td>
          <td id='tdclass'>{numberOfStudents}</td>
          <td>
            <button
              id='classbtn'
              className='btn btn-primary btn-round'
              onClick={this.viewStudents}
            >
              Students
            </button>
          </td>
          <td>
            <button
              id='classbtn'
              className='btn btn-primary btn-round'
              onClick={this.viewProjects}
            >
              Projects
            </button>
          </td>
          <td>
            <button id='icon' onClick={() => this.deleteClass(_id)}>
              <img id='edit' src={edit} />
            </button>
          </td>
          <td>
            <button id='icon' onClick={() => this.deleteClass(_id)}>
              <img id='del' src={del} />
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
            <div className='row'>
              <h2>{this.state.user.fullName}'s Classes</h2>
              <button
                style={{ width: '15%', position: 'absolute', right: '50px' }}
                className='btn btn-primary btn-round'
                onClick={this.addClass}
              >
                Add Class
              </button>
            </div>
            <table className='center' id='table'>
              <tr>
                <th id='th'>Name</th>
                <th id='th'>Number of Students</th>
                <th id='th'>View Students</th>
                <th id='th'>View Projects</th>
                <th></th>
                <th></th>
              </tr>
              <tbody>{this.renderTableData()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default TeacherClassList;
