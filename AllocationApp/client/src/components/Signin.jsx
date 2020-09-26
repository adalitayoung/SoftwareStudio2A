import React, { Component } from 'react';
import '../style/style.css';
import api from '../api';
import mail from '../res/mail.png';
import lock from '../res/lock.png';
import { withRouter } from 'react-router-dom';

import { Link } from 'react-router-dom';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      msg: '',
      //fullname: ''
    };
  }

  handleChangeName = async (event) => {
    const email = event.target.value;
    this.setState({ email });
  };

  handleChangePassword = async (event) => {
    const password = event.target.value;
    this.setState({ password });
  };

  handleSignin = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    if (email !== '' && password !== '') {
      await api.login({ email, password }).then(
        (res) => {
          console.log(res);

          if (res.status === 201) {
            let msh = res.data;
            let role = msh.role;
            this.setState({ msg: 'Succesfull Login!' });

            localStorage.setItem('Token', 'Logged in');
            window.alert('Welcome ' + email);
            if (role == 'Student') {
              this.props.history.push({
                pathname: '/student/ClassList',
                state: { user: res.data },
              });
              //window.location='/Student'
            } 
            if (res.data.role === "Teacher"){
              this.props.history.push({
                pathname: '/teacher/ClassList',
                state: {user: res.data}
              })
            }
            if (res.data.role === "Admin"){
              this.props.history.push({
                pathname: '/admin/AdminStudentList',
                state: {user: res.data}
              })
            }
          }
        },
        (error) => {
          console.log(error);
          window.alert('Email or Password is wrong.');
        }
      );
    }
  };

  render() {
    return (
      <div className='signin'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-5 mx-auto'>
              <div className='content'>
                <div className='column' id='signin'>
                  <h1 className='signinh1'>Sign In</h1>
                  <form>
                    <div className='form-group'>
                      <label htmlFor='exampleInputEmail'>
                        <img className='mail' src={mail} width='15px' /> Email
                      </label>
                      <input
                        type='name'
                        className='form-control'
                        id='exampleInputEmail'
                        onChange={this.handleChangeName}
                        placeholder='Enter Your Email'
                      ></input>
                    </div>
                    <div className='form-group'>
                      <label htmlFor='exampleInputPassword1'>
                        <img className='lock' src={lock} width='15px' />{' '}
                        Password
                      </label>
                      <input
                        type='password'
                        className='form-control'
                        id='exampleInputPassword1'
                        onChange={this.handleChangePassword}
                        placeholder='Password'
                      ></input>
                    </div>
                    <button
                      id='sign'
                      className='btn btn-primary btn-block'
                      onClick={this.handleSignin}
                    >
                      Sign in
                    </button>
                    <p className='account'>
                      <Link to='' className='nav-link'>
                        Forgot your password?
                      </Link>
                    </p>
                  </form>
                  {this.state.msg}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Signin);
