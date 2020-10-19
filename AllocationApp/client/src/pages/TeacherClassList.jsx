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
      courseIds: [],
    };
    console.log(localStorage);
    localStorage.setItem('user', this.state.user.fullName);
    this.fetchClassList();
  }

  fetchClassList() {
    api.getAllCourses().then((data) => {
      console.log(data);
      this.setState({ classData: data.data.data });
    });
  }

  editClass(_id, name) {
    localStorage.setItem('classID', _id);
    localStorage.setItem('className', name);
    console.log(localStorage.className);

    this.props.history.push({
      pathname: '/EditClass',
      state: { course: _id },
    });
  }

  deleteClass(_id, name) {
    const class_id = _id;
    api.deleteCourse(class_id).then((data) => {
      window.alert(name + ' has been deleted!');
      window.location.reload();
    });
  }

  viewStudents(_id, name) {
    const user = this.state.user;
    const classname = name;
    this.props.history.push({
      pathname: '/Teacher/StudentList',
      state: { user: user, course: _id, className: classname },
    });
  }

  viewProjects = async (_id, name) => {
    const user = this.state.user;
    const classname = name;
    this.props.history.push({
      pathname: '/Teacher/ProjectList',
      state: { user: user, course: _id, className: classname },
    });
  };

  algorithm(name) {
    api
      .startAlgorithm(name)
      .then((res) => {
        console.log(res.status);
        window.alert(name + ' has been allocated!');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  random(name) {
    api.startRandomSort(name).then(() => {
      window.alert(name + ' has been randomly sorted!');
    });
  }

  addClass = async (event) => {
    event.preventDefault();
    this.props.history.push({
      pathname: '/AddClass',
    });
  };

  renderTableData() {
    return this.state.classData.map((course, index) => {
      const { name, numberOfStudents, _id } = course;
      return (
        <tr key={_id}>
          <td id='tdclass'>{name}</td>
          <td id='tdclass'>{numberOfStudents}</td>
          <td>
            <button
              key={_id}
              id='classbtn'
              className='btn btn-primary btn-round'
              onClick={() => this.viewStudents(_id, name)}
            >
              Students
            </button>
          </td>
          <td>
            <button
              key={_id}
              id='classbtn'
              className='btn btn-primary btn-round'
              onClick={() => this.viewProjects(_id, name)}
            >
              Projects
            </button>
          </td>
          <td>
            <button
              key={_id}
              className='btn btn-primary btn-round algobtn'
              onClick={() => this.algorithm(name)}
            >
              Auto Allocate
            </button>
          </td>
          <td>
            <button
              key={_id}
              className='btn btn-primary btn-round algobtn'
              onClick={() => this.random(name)}
            >
              Random Allocate
            </button>
          </td>
          <td>
            <button
              id='icon'
              key={_id}
              onClick={() => this.editClass(_id, name)}
            >
              <img id='edit' src={edit} />
            </button>
          </td>
          <td>
            <button
              id='icon'
              key={_id}
              onClick={() => this.deleteClass(_id, name)}
            >
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
                <th id='th'>Algorithm</th>
                <th id='th'>Random Sort</th>
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
