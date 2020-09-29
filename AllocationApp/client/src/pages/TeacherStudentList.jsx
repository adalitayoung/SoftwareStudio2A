import React, { Component } from 'react';

import api from '../api';
import back from '../res/back.png';
import del from '../res/delete.png';

class TeacherStudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.location.state.user.fullName,
      course: props.location.state.course,
      className: props.location.state.className,
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

  deleteStudent(_id, email) {
    const student_id = _id;
    const classname = this.state.className;
    api.removeFromClass(student_id, classname).then(() => {
      window.alert(email + ' has been removed!');
      window.location.reload();
    });
  }

  addStudent = async (event) => {
    event.preventDefault();
    // redirect to add class
  };

  renderTableData() {
    return this.state.studentData.map((student) => {
      const { email, _id } = student;
      return (
        <tr key={_id}>
          <td id='tdclass'>{email}</td>
          <td id='tdclass'>{_id}</td>
          <td>
            <button id='icon' onClick={() => this.deleteStudent(_id, email)}>
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
            <img width='20px' src={back}></img> &nbsp;Classes
          </a>
          <div className='col' id='column'>
            <div className='row'>
              <h2>Students in {this.state.className} </h2>
            </div>
            <a
              id='navbtn'
              href='#'
              class='btn btn-primary btn-lg disabled'
              role='button'
              aria-disabled='true'
            >
              Students
            </a>
            <a
              id='navbtn'
              href='#'
              class='btn btn-primary btn-lg'
              role='button'
              aria-disabled='true'
            >
              Projects
            </a>
            <table className='center' id='table'>
              <tr>
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
