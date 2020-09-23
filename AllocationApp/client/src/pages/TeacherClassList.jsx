import React from 'react';

import api from '../api';

import edit from '../res/edit.png';
import del from '../res/delete.png';
import { Component } from 'react';

class TeacherClassList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.location.state.user,
      classData: [],
      isLoading: false,
    };
    console.log(props);
    this.fetchClassList(this.state.user._id);
  }

  fetchClassList(userId) {
    api.getAllCourses().then((data) => {
      // need to change class model and check if the course is for that teacher
      console.log(data);
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

  getId = async (event) => {
    const classdata = this.state.classData;
    const user = this.state.user;

    var array = classdata.length;
    for (var i = 0; i < array; i++) {
      const id = classdata[i]._id;
    }
  };

  viewStudents = async (event) => {
    const user = this.state.user;
    this.props.history.push({
      pathname: '/Teacher/StudentList',
      state: { user: user },
    });
  };

  viewProjects = async (event) => {
    const user = this.state.user;
    // const classdata = this.state.classData;
    this.props.history.push({
      pathname: '/Teacher/ProjectList',
      state: { user: user },
    });
  };

  addClass = async (event) => {
    event.preventDefault();
    // redirect to add class
  };

  renderTableData() {
    return this.state.classData.map((course, index) => {
      const { name, numberOfStudents, _id } = course; //destructuring
      console.log(_id);
      return (
        <tr key={_id}>
          <td id='tdclass'>{name}</td>
          <td id='tdclass'>{numberOfStudents}</td>
          <td>
            <button
              id='classbtn'
              className='btn btn-primary btn-round'
              onClick={this.viewStudents}
              value={JSON.stringify({ _id })}
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
              <button
                style={{
                  width: '15%',
                  position: 'absolute',
                  right: '50px',
                  marginTop: '25px',
                }}
                className='btn btn-primary btn-round'
                onClick={this.addClass}
              >
                Add Class
              </button>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default TeacherClassList;
