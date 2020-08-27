import React, { Component } from "react";
import '../style/style.css';
import api from '../api'
import name from '../name.png'
import lock from '../lock.png'

import { Link } from 'react-router-dom'

class Signin extends Component {

  constructor(props){
    super(props)
    this.state = {
      fullName: '',
      password: ''
    }
  }

  handleChangeName = async event => {
    const fullName = event.target.value;
    this.setState({fullName})
  }

  handleChangePassword = async event => {
    const password = event.target.value;
    this.setState({password})
  }

  handleSignin = async event => {
    event.preventDefault();
    const {fullName, password} = this.state
    if (fullName !== '' && password !== '') {
      
    }
  }

  render(){
    return (
      <div className="signin">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <h1 className="font-weight-light">Signin</h1>
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputName"><img className="name" src={name} width="15px"/>Full Name</label>
                  <input type="name" className="form-control" id="exampleInputName" onChange={this.handleChangeName} placeholder="Enter Full Name"></input>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1"><img className="lock" src={lock} width="15px"/> Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword1" onChange={this.handleChangePassword} placeholder="Password"></input>
                </div>
                <button id="sign" className="btn btn-primary btn-block" onClick={this.handleSignin}>Sign in</button>
                <p className="account"><Link to="" className="nav-link">Forgot your password?</Link></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}

export default Signin;