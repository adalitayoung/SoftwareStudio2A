import React from 'react';

import api from '../api';

import back from '../res/back.png';
import { Link } from 'react-router-dom';
import { Component } from 'react';

class TeacherStudentList extends Component {
  render() {
    return (
      <div className='container scrollable'>
        <div className='row align-items-center'>
          <div className='col' id='column'>
            <a>
              <img id='back' src={back}></img>
            </a>
            <h2>Class Name: Students</h2>
            <table className='center' id='table'>
              <tr>
                <th id='th'>Student Name</th>
                <th id='th'>Student Email</th>
                <th id='th'>Student Number</th>
                <th id='th'>Project ID</th>
                <th id='th'>Project Role</th>
                <th></th>
                <th></th>
              </tr>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default TeacherStudentList;
