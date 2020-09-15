import React from 'react';

import api from '../api';

import back from '../res/back.png';
import { Link } from 'react-router-dom';
import { Component } from 'react';

class Enroll extends Component {

    fetchAvailableClass(userID) {
        //display classes to join
    }

    join = async event => {
        event.preventDefault();
        console.log("join");
        //add the student to the class
    }

    viewClass = async event => {
        event.preventDefault();
        console.log("it works")
        this.props.history.push({
          pathname: '/student/ClassList',
        })   // redirect to class list
      }
      
      viewProject = async event => {
        event.preventDefault();
        console.log("it works")
        this.props.history.push({
          pathname: '/student/ClassList/StudentProjectList',
        })  // redirect to project page
      }
      
      enroll = async event => {
        event.preventDefault();
        console.log("it works")
        this.props.history.push({
          pathname: '/student/ClassList/Enroll',
        })    // redirect to enroll page
      }
  

    render() {
        return (
        <div className='container scrollable'>
            <div className='row align-items-center'>
            <div className='col' id='column'>
                <a>
                <img id='back' src={back}></img>
                </a>
                <h2>Please enroll in following classes.</h2>
                <div className="row">
                    
                    <button style = {{width: "15%", position: "absolute", left: "0"}} className="btn btn-primary btn-block" onClick = {this.viewClass}>Classes</button>
                    <button style = {{width: "15%", position: "absolute", right: "0"}} className="btn btn-primary btn-block" onClick = {this.enroll}>Enroll in</button>
                    <button style = {{width: "15%", marginLeft: "15%", left: "0"}} className="btn btn-primary btn-block" onClick = {this.viewProject}>Projects</button>
                </div>
                <table className='center' id='table'>
                <tr>
                    <th id='th'>ID</th>
                    <th id='th'>Class Name</th>
                    <th id='th'>Class Teacher</th>
                    <th id='th'>Join Class</th>
                    <th></th>
                    <th></th>
                </tr>
                <tbody>
                    
                </tbody>
                </table>
            </div>
            </div>
        </div>
        );
    }
}

export default Enroll;
