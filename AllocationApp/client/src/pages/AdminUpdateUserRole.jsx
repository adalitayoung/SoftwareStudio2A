import React from 'react'

import api from '../api'
import { Component } from "react";

class AdminUpdateUserRole extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: props.location.state.user_id,
            fullName: props.location.state.userName,
        }
    }

    updateRole() {
        var element = document.getElementById("role")
        var role = element.options[element.selectedIndex].value
        console.log(role)

        api.updateUserRole(this.state.user_id,role).then(data => {
            window.alert('User Role Updated');
            this.props.history.push({
                pathname: '/admin/AdminStudentList'
            })
        })
    }

    render() {
        return(
            <div className="container scrollable">
                <div className="row align-items-center">
                    <div className="col" style={{marginTop:"10%"}}>
                        <div className="box title-container">
                            <div style={{color: "#26a6ff", font: "normal normal bold 50px/61px Helvetica Neue"}}>Update {this.state.fullName}'s Role </div>
                        </div>
                    </div>
                </div>

                <div className="row backgroundboxaddy">
                    <div className="row backgroundwhiteboxaddy">
                        <div className="col" style={{marginLeft: '35%'}}> 
                            <div style={{margin: "auto"}} className="align-items-center">
                                <label style={{paddingRight: '3%'}}>Role  </label>
                                <select id="role">
                                    <option value="ADMIN">Admin</option>
                                    <option value="TEACHER">Teacher</option>
                                    <option value="STUDENT">Student</option>
                                </select>
                            </div>
                            <div>
                                <button className="btn btn-primary" onClick={() => this.updateRole()}>Update</button>
                            </div>
                        </div>
                        
                        
                    </div>
               </div> 

            </div>
        )
    }
}

export default AdminUpdateUserRole