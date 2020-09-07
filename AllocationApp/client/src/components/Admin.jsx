import React, { Component } from "react";
import '../style/style.css';
import { withRouter } from "react-router-dom";

import { Link } from 'react-router-dom'

class Admin extends Component {

  render(){
    return (
      <div className="signin">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div className="content">
                <div className="column">
                  <h1 className="font-weight-light">Admin</h1>
               
                </div>
              </div>            
            </div>              
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Admin);