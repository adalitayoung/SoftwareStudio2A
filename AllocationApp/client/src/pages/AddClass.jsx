import React from "react";
import { Component } from "react";
import { Link } from 'react-router-dom';
import back from '../res/back.png';

import api from '../api';
import './addClass.css';

class AddClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      className: '',
    }
  }

  handleAddClass = async (event) => {
    const email = event.target.value;
    this.setState({ className });
  };

  handleRegisterClass = async event => {
    event.preventDefault();
    let studentID = localStorage.getItem('uid');
    const {className} = this.state
    // Add in validation here
    if (className !== ''){
      await api.addCourse({className}).then(res => {
        // Do whatever you want to do whether its a page redirect etc.
        console.log(res)
        if (res.status === 200){
          // Success condition
          window.alert('Successful Add data to Database!')
           //this.props.history.push('/teacher/classList')
        }
      }, error => {
        console.log(error)
      })
    }
   
  }


  render() {
    return (
      <div className="signup addClass">
        <div className="box">
          <div className="box__left"> 
            <Link to="/teacher/ClassList">
              <div className="name">
                <img width="20px" src={back}></img> &nbsp;Classes
              </div> 
            </Link>
          </div>
          <div className="box__center">
            <div className="form-group">
              <div className="name">Class Name</div>
              <input type="className" className="form-control" id="ExampleInputClassName1" onChange={this.handleAddClass}></input>
            </div>
            <div className="box button-container">
              <button type="button" className="button button--add-class" onClick={this.handleRegisterClass}>Add Class</button>
            </div>
          </div>
        </div>
      </div>
    );

  }

}

export default AddClass;