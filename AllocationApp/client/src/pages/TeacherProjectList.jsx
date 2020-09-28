import React from 'react';
import { useHistory, Link } from 'react-router-dom';

import api from '../api';
import edit from '../res/edit.png';
import del from '../res/delete.png';

import { Component } from 'react';

class TeacherProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.location.state.user.fullName,
      course: props.location.state.course,
      className: props.location.state.className,
      projectData: [], //stores the output from the api call
      isLoading: false,
    };

    this.getProjectData();
    console.log(this.state.className);
  }

  getProjectData() {
    const class_id = this.state.course;
    api.showClassProjects(class_id).then((data) => {
      console.log(data);
      this.setState({ projectData: data.data });
    });
  }

  viewStudents = async (event) => {
    const user = this.state.user;
    const course_id = this.state.course_id;
    this.props.history.push({
      pathname: '/Teacher/StudentList',
      state: { user: user, course: course_id },
    });
  };

  addProject = async (event) => {
    event.preventDefault();
    // redirect to add class
  };

  renderTableData() {
    return this.state.projectData.map((project, index) => {
      const { createdByname, projectName, description, _id } = project; //destructuring
      return (
        <tr key={_id}>
          <td id='tdclass'>{projectName}</td>
          <td id='tdclass'>{description}</td>
          <td id='tdclass'>{createdByname}</td>
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
            Classes
          </a>
          <div className='col' id='column'>
            <div className='row'>
              <h2>Projects in {this.state.className} </h2>
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
                <th id='th'>Project Name</th>
                <th id='th'>Project Description</th>
                <th id='th'>Created By</th>
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
                onClick={this.addProject}
              >
                Add Project
              </button>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default TeacherProjectList;
