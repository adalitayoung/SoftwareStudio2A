import React from "react";
import { Component } from "react";

import './addClass.css';

class AddClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      isLoading: false,
    }
  }

  handleChangeAddClass = async event => {
    const addClass = event.target.value;
    this.setState({ addClass })
  }

  handleAddCLass = async event => {
    event.preventDefault();
    const { addClass } = this.state
  }


  render() {
    return (
      <div className="signup addClass">
        <div className="fontclass"> </div>
        <div className="box">
          <div className="box__left">
            <div className="name">{'<-'} Classes</div>
          </div>
          <div className="box__center">
            <div className="form-group">
              <div className="name">Class Name</div>
              <input type="addClass" className="form-control" onChange={this.handleChangeAddClass}></input>
            </div>
            <div className="box button-container">
              <button type="button" className="button button--add-class">Add Class</button>
            </div>
          </div>
              <div className="box__right"></div>
        </div>
      </div>
    );

  }


}

export default AddClass;