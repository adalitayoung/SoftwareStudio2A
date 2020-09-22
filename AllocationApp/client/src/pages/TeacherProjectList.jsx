import React from 'react';

import api from '../api';

import back from '../res/back.png';
import { Link } from 'react-router-dom';
import { Component } from 'react';

class TeacherProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.location.state.user.fullName,
      course: props.location.state.course_id,
      studentData: [], //stores the output from the api call
      isLoading: false,
    };
    console.log(props);
    this.getUserData();
  }

  getUserData() {
    api.showProject('', 'null').then((data) => {
      console.log(data.data.userData);
      this.setState({ studentData: data.data.userData });
    });
  }

  renderTableData() {
    return this.state.studentData.map((student, index) => {
      const { email, role, _id } = student; //destructuring
      return (
        <tr key={_id}>
          <td id='tdclass'>{role}</td>
          <td id='tdclass'>{email}</td>
          <td id='tdclass'>{_id}</td>
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
              <h2>{this.state.user}'s Students</h2>
            </div>
            <table className='center' id='table'>
              <tr>
                <th id='th'>Student Role</th>
                <th id='th'>Student Email</th>
                <th id='th'>Student ID</th>
              </tr>
              <tbody>{this.renderTableData()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default TeacherProjectList;
