import React from 'react';

import api from '../api';
import edit from '../res/edit.png';
import del from '../res/delete.png';
import back from '../res/back.png';

import { Link } from 'react-router-dom';
import { Component } from 'react';

var xlsx = require('xlsx');
var saveAs = require('file-saver');
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
const FILE_NAME = 'ProjectDetails'
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
  }

  getProjectData() {
    const class_id = this.state.course;
    localStorage.setItem('classID', class_id);
    localStorage.setItem('className', this.state.className);

    api.showClassProjects(class_id).then((data) => {
      console.log(data);
      this.setState({ projectData: data.data });
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

  deleteProject(_id, projectName) {
    const name = projectName;
    const classname = this.state.className;
    api.deleteProject(_id).then(() => {
      window.alert(name + ' has been removed from ' + classname);
      window.location.reload();
    });
  }

  exportProject() {
    const id = this.state.course;
    api.outputToExcel(id).then((data) => {
       console.log(data.data);
       var info = data.data
       const worksheet = xlsx.utils.json_to_sheet(info)
       const workbook = {
         Sheets:{
           'info' : worksheet
         },
         SheetNames:['info']
       }
       const excelBuffer = xlsx.write(workbook,{bookType: 'xlsx', type:'array'})
       console.log(excelBuffer)
       var saveData = new Blob([excelBuffer], {type: EXCEL_TYPE} );
       saveAs(saveData, FILE_NAME + EXCEL_EXTENSION)
      //save to client as .xlsx file
    });
  }





  addStudentToProject(_id, name) {
    this.props.history.push({
      pathname: '/AddToProject',
      state: { course: _id, className: name },
    });
  }



  viewAllocations(_id, projectName) {
    localStorage.setItem('projectID', _id);
    localStorage.setItem('projectName', projectName);

    // console.log(localStorage.className);
    const name = projectName;
    localStorage.setItem('projectName', name);
    this.props.history.push({
      pathname: '/AllocatedStudents',
      state: { projectID: _id, projectName: name },
    });
  }

  addProject = async (event) => {
    event.preventDefault();
    event.preventDefault();
    this.props.history.push({
      pathname: '/AddProject',
    });
  };

  renderTableData() {
    return this.state.projectData.map((project) => {
      const { createdByname, projectName, description, _id } = project; //destructuring
      return (
        <tr key={_id}>
          <td id='tdclass'>{projectName}</td>
          <td id='tdclass'>{description}</td>
          <td>
            <button
              key={_id}
              id='classbtn'
              style={{
                width: '70%',
              }}
              className='btn btn-primary btn-round'
              onClick={() => this.viewAllocations(_id, projectName)}
            >
              View Project Details
            </button>
          </td>
          <td>
            <button
              id='icon'
              onClick={() => this.deleteProject(_id, projectName)}
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
          <a id='back' href='javascript:history.back()'>
            <img width='20px' src={back}></img> &nbsp;Classes
          </a>
          <div className='col' id='column'>
            <div className='row'>
              <h2>Projects in {this.state.className} </h2>
              <button
                style={{
                  width: '25%',
                  position: 'absolute',
                  right: '50px',
                  marginTop: '25px',
                }}
                id='export'
                className='btn btn-primary btn-round'
                onClick={this.exportProject()}
              >
                Download Project details
              </button>
            </div>
            <br></br>
            <table className='center' id='table'>
              <tr>
                <th id='th'>Project Name</th>
                <th id='th'>Project Description</th>
                <th id='th'>Project Allocations</th>
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
