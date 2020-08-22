import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export default class SignUp extends Component {
    render() {
        return (
            <form>
                <h3>SIGN UP</h3>

                <div className="form-group">
                    <input type="text" className="form-control" placeholder="First Name" id="FName" required="required" />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Last Name" id="LName" required="required"/>
                </div>
                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Email" id="Email" required="required"/>
                </div>

                <div className="form-group">
                    <input type="email" className="form-control" placeholder="ConfirmEmail" required="required"/>
                </div>

                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" id="Password" required="required"/>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="ConfirmPassword" required="required"/>
                </div>
                <Link className="btn btn-primary btn-block" to={"/sign-in"}>Sign In</Link>
                <p className="forgot-password text-right">
                    Already registered <a href="#">sign in?</a>
                </p>
            </form>
        );
    }
}
