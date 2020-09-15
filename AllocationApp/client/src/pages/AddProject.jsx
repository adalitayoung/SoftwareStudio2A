import React from "react";
import { Component } from "react";
import { Link } from 'react-router-dom';

import api from '../api';
import './addProject.css';

class addProject extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projectName: '',
      projectDesc: '',
      minStudents: '',
      maxStudents: '',
      roleName: '',
      positionsReq: '',
      isLoading: false,
    }
  }

  handleProjectName = async event => {
    const projectName = event.target.value;
    this.setState({ projectName })
  }

  handleProjectDesc = async event => {
    const projectDesc = event.target.value;
    this.setState({ projectDesc })
  }

  handleChooseClass = async event => {
    const chooseClass = event.target.value;
    this.setState({ chooseClass })
  }

  handleMinStudents = async event => {
    const minStudents = event.target.value;
    this.setState({ minStudents })
  }

  handleMaxStudents = async event => {
    const maxStudents = event.target.value;
    this.setState({ maxStudents })
  }

  handleRoleName = async event => {
    const roleName = event.target.value;
    this.setState({ roleName })
  }

  handlePositionsReq = async event => {
    const positionsReq = event.target.value;
    this.setState({ positionsReq })
  }

  handleAddProject = async event => {
    event.preventDefault();
    const { projectName, projectDesc, chooseClass, minStudents, maxStudents, roleName, positionsReq } = this.state
    // Add in validation here
    if (projectName !== '' && projectDesc !== '' && minStudents !== '' && maxStudents !== '') {
      await api.addUserToDatabase({ projectName, projectDesc, chooseClass, minStudents, maxStudents, roleName, positionsReq }).then(res => {
        // Do whatever you want to do whether its a page redirect etc.
        console.log(res)
        if (res.status === 201) {
          // Success condition
          window.alert('Project Added')
          this.props.history.push('/AddProject')
        }
      }, error => {
        console.log(error)
      })
    }

  }


  render() {
    return (
      <div className="signup addProject">
        <div className="fontclass"> </div>
        <div className="container">
          <div className="box">
            <div className="box__left">
              <Link to="TeacherView">
                <div className="name">{'<-'} Projects</div>
              </Link>
            </div>
            <div className="box__center">
              <div className="form-group">
                <div className="name">Project Name</div>
                <input type="projectName" className="form-control" onChange={this.handleProjectName}></input>
                <div className="name">Project Description</div>
                <input type="projectDesc" className="form-control" onChange={this.handleProjectDesc}></input>
                <div className="name">Class</div>
                <form onSubmit={this.handleAddProject}>
                  <select value={this.state.value} onChange={this.handleChooseClass}>
                    <option value="Classone">Class One</option>
                    <option value="Classone">Class Two</option>
                    <option value="Classone">Class Three</option>
                      <input type="submit" value="Submit" />
                  </select>
                </form>

                <div className="students-container split-container">
                  <div>
                    <label className="namemin">Min Students</label>
                    <input type="minStudents" className="form-min" onChange={this.handleMinStudents}></input>
                  </div>
                  <div>
                    <div className="namemax">Max Students</div>
                    <input type="maxStudents" className="form-min" onChange={this.handleMaxStudents}></input>
                  </div>
                </div>
                <div className="students-container split-container">
                  <div>
                    <div className="namemin">Role Name</div>
                    <input type="roleName" className="form-control form-role" onChange={this.handleRoleName}></input>
                  </div>
                  <div>
                    <div className="namemax">Positions Required</div>
                    <input type="positionsReq" className="form-control form-role" onChange={this.handlePositionsReq}></input>
                  </div>
                  <div>
                    <button type="button" className="button button--add-role">Add Role</button>
                  </div>
                </div>
              </div>
              <div className="button-container">
                <button type="button" className="button button--add-project">Add Project</button>
              </div>
             </div>
         </div>
       </div>
      </div>
    
    
    );

  }


}

export default addProject;