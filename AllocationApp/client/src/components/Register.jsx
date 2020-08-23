import React from "react";
import '../style/style.css';
import signup from '../img1.png'
import name from '../name.png'
import mail from '../mail.png'
import lock from '../lock.png'
import { Link } from 'react-router-dom'


function Signup() {
  return (
    <div className="signup">
      <div class="container">
      <div class="row align-items-center">
      <img class="signuppic" src={signup} width="55%" />
          <div class="col-sm-5">
            <h1 class="font-weight">Create an account</h1>
            <form>
            <div class="form-group">
                <label for="exampleInputName"><img class="name" src={name} width="15px"/>Full Name</label>
                <input type="name" class="form-control" id="exampleInputName" placeholder="Enter Full Name"></input>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1"><img class="name" src={mail} width="15px"/>Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1"><img class="password" src={lock} width="15px"/>Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"></input>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1"><img class="lock" src={lock} width="15px"/> Confirm Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"></input>
              </div>
              <button id="sign" type="submit" class="btn btn-primary btn-block">Sign up</button>
              <p class="account"><Link to="SignIn" className="nav-link">Already have an account? Sign In</Link></p>
            </form>
            
      </div>
      </div>
      </div>
    </div>
  );
}

export default Signup;