import React, { Component } from 'react';

import api from '../api';

import edit from '../res/edit.png';
import del from '../res/delete.png';

class TeacherStudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.location.state.user.fullName,
      course: props.location.state.course,
      studentData: [],
      isLoading: false,
    };
    this.getUserData();
  }

  getUserData() {
    const id = this.state.course;
    api.fetchUserData('Student', id).then((data) => {
      console.log(data.data.data);
      this.setState({ studentData: data.data.data });
    });
  }

  addStudent = async (event) => {
    event.preventDefault();
    // redirect to add class
  };

  renderTableData() {
    return this.state.studentData.map((student, index) => {
      const { email, role, _id } = student; //destructuring
      return (
        <tr key={_id}>
          <td id='tdclass'>{role}</td>
          <td id='tdclass'>{email}</td>
          <td id='tdclass'>{_id}</td>
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
          <a id='back' href='javascript:history.back()'>
            <svg
              width='2em'
              height='2em'
              viewBox='0 0 16 16'
              class='bi bi-arrow-left-short'
              fill='currentColor'
            >
              <path
                fill-rule='evenodd'
                d='M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z'
              />
            </svg>
            <p>Classes</p>
          </a>
          <div className='col' id='column'>
            <div className='row'>
              <h2>Students in Class: </h2>
            </div>
            <a
              id='navbtn'
              class='btn btn-primary btn-lg '
              role='button'
              aria-disabled='true'
            >
              Students
            </a>
            <a
              id='navbtn'
              href='#'
              class='btn btn-primary btn-lg disabled'
              role='button'
              aria-disabled='true'
            >
              Projects
            </a>
            <table className='center' id='table'>
              <tr>
                <th id='th'>Student Role</th>
                <th id='th'>Student Email</th>
                <th id='th'>Student ID</th>
              </tr>
              <tbody>{this.renderTableData()}</tbody>
              <button
                style={{
                  width: '15%',
                  position: 'absolute',
                  right: '50px',
                  marginTop: '25px',
                }}
                className='btn btn-primary btn-round'
                onClick={this.addStudent}
              >
                Add Student
              </button>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default TeacherStudentList;
