import React from "react";
import { Component } from "react";
import back from '../res/back.png';
import api from '../api';
import './addClass.css';
import Axios from "axios";

class AddClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      numberOfStudents:'',
      isLoading: false,
    }
    
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = async event => {
    event.preventDefault();
    console.log(this.state);
    Axios
      .post('http://localhost:3000/api/class/createClass', this.state)
      .then(response => {
        console.log(response)
        window.alert('Class Added')
        window.location.reload()
      })
      .catch(error => {
        console.log(error)
      })
  }


  render() {
    const { name, numberOfStudents } = this.state
    return (
      <div className="signup addClass">
        <form onSubmit={this.submitHandler}>
        <div className="box">
          <div className="box__left"> 
            <a id='back' href='javascript:history.back()'>
              <img width='20px' src={back}></img> &nbsp;Classes
            </a>
          </div>
          <div className="box__center">
            <div className="form-group">
              <div className="name">Class Name</div>
              <input type="className" className="form-control" name="name" value={name} onChange={this.changeHandler}></input>
              <div className="name">Number of Students</div>
              <input type="className" className="form-control" name="numberOfStudents" value={numberOfStudents} onChange={this.changeHandler}></input>
            </div>
            <div className="box button-container">
              <button type="submit" className="button button--add-class">Add Class</button>
            </div>
          </div>
        </div>
        </form>
      </div>
    );

  }

}

export default AddClass;