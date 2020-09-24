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
      projectData: [], //stores the output from the api call
      isLoading: false,
    };
    console.log(props);
    this.getProjectData();
  }

  getProjectData() {

    const class_id = '5f630e87f683506900040a02';
    api.showClassProjects(class_id).then((data) => {
      this.setState({ projectData: data.data });
    });
  }

  renderTableData() {
    return this.state.projectData.map((project, index) => {
      const { createdByname, projectName, description, _id } = project; //destructuring
      return (
        <tr key={_id}>
          <td id='tdclass'>{projectName}</td>
          <td id='tdclass'>{description}</td>
          <td id='tdclass'>{createdByname}</td>
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
              <h2>{this.state.user}'s Projects</h2>
            </div>
            <table className='center' id='table'>
              <tr>
                <th id='th'>Project Name</th>
                <th id='th'>Project Description</th>
                <th id='th'>Created By</th>{' '}
              </tr>
              <tbody>{this.renderTableData()}</tbody>{' '}
            </table>{' '}
          </div>{' '}
        </div>
      </div>
    );
  }
}

export default TeacherProjectList;
