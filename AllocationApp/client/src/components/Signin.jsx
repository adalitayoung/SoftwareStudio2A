import React, { Component } from "react";
import '../style/style.css';
import api from '../api'
import mail from '../mail.png'
import lock from '../lock.png'
import { withRouter } from "react-router-dom";

import { Link } from 'react-router-dom'

class Signin extends Component {

  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      //fullname: ''
    }
  }

  handleChangeName = async event => {
    const email = event.target.value;
    this.setState({email})
  }

  handleChangePassword = async event => {
    const password = event.target.value;
    this.setState({password})
  }

  handleSignin = async event => {
    event.preventDefault();
    const {email, password} = this.state
    if (email !== '' && password !== '') {
      await api.login({email, password}).then(res => {
        console.log(res)
        if(res.status === 400){
          window.alert('Email or Password is wrong.')
          this.props.history.push({
            pathname: '/Signin',
            /*state: { user: res.data }*/
            })
        } if(res.status === 201){
          window.alert('Welcome ' + res.fullname)
          this.props.history.push({
            pathname: '/',
            state: { user: res.data }
            })
        }
      }, error => {
        console.log(error)
      })
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
                  <label htmlFor="exampleInputEmail"><img className="mail" src={mail} width="15px"/> Email</label>
                  <input type="name" className="form-control" id="exampleInputEmail" onChange={this.handleChangeName} placeholder="Enter Your Email"></input>
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

export default withRouter(Signin);