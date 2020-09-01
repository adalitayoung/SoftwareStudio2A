import React from "react";
import '../style/style.css';
import signup from '../img1.png'
import name from '../name.png'
import mail from '../mail.png'
import lock from '../lock.png'

import api from '../api'

import { Link } from 'react-router-dom'
import { Component } from "react";

class Signup extends Component {
  constructor(props){
    super(props)
    this.state = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      isLoading: false,
    }
  }

  handleChangeName = async event => {
    const fullName = event.target.value;
    this.setState({fullName})
  }

  handleChangeEmail = async event => {
    const email = event.target.value;
    this.setState({email})
  }

  handleChangePassword = async event => {
    const password = event.target.value;
    this.setState({password})
  }

  handleChangeConfirmPassword = async event => {
    const confirmPassword = event.target.value;
    this.setState({confirmPassword})
  }

  handleRegisterUser = async event => {
    event.preventDefault();
    const {fullName, email, password} = this.state
    // Add in validation here
    if (fullName !== '' && email !== '' && password !== ''){
      await api.addUserToDatabase({fullName, email, password}).then(res => {
        // Do whatever you want to do whether its a page redirect etc.
        console.log(res)
        if (res.status === 201){
          // Success condition
          window.alert('Successful Registration')
          this.props.history.push('/SignIn')
        }
      }, error => {
        console.log(error)
      })
    }
   
  }

  render() {
    return (
      <div className="signup">
        <div className="container">
          <div className="row align-items-center">
            <img className="signuppic" src={signup} width="55%" />
            <div className="col-sm-5">
              <h1 className="font-weight">Create an account</h1>
              <form>
              <div className="form-group">
                  <label htmlFor="exampleInputName"><img className="name" src={name} width="15px"/>Full Name</label>
                  <input type="name" className="form-control" id="exampleInputName" onChange={this.handleChangeName} placeholder="Enter Full Name"></input>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1"><img className="name" src={mail} width="15px"/>Email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" onChange={this.handleChangeEmail} aria-describedby="emailHelp" placeholder="Enter email"></input>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1"><img className="password" src={lock} width="15px"/>Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword1" onChange={this.handleChangePassword} placeholder="Password"></input>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1"><img className="lock" src={lock} width="15px"/> Confirm Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword1" onChange={this.handleChangeConfirmPassword} placeholder="Password"></input>
                </div>
                <button id="sign" className="btn btn-primary btn-block" onClick={this.handleRegisterUser} >Sign up</button>
                <p className="account"><Link to="SignIn" className="nav-link">Already have an account? Sign In</Link></p>
              </form>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}



export default Signup;