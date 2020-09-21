import React from 'react'

import api from '../api'

import {AiOutlineEdit} from 'react-icons/ai'
import {ImCross} from 'react-icons/im'
import { Link } from 'react-router-dom'
import { Component } from "react";

class AdminTeacherList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: props.location.state.user,
            teacherData: [],
            isLoading: false,
        }

        this.fetchTeacherList()
    }

    fetchTeacherList(){
        api.fetchUserData("Teacher",null).then(data => {
            // need to change class model and check if the course is for that teacher
            // console.log(data)
            this.setState({teacherData: data.data.userData})
            console.log(this.state.teacherData)
        })
    }

    /*editClass(user) {
        // event.preventDefault();
        console.log('edit')
        console.log(user)
    }

    deleteClass(user) {
        // event.preventDefault();
        console.log('delete')
        console.log(user)
    }
    */
   
    teacher = async event => {
        // add function to redirect it to 
        event.preventDefault();
    }

    student = async event => {
        // add function to redirect it to teacher page
        event.preventDefault();
    }

    addTeacher= async event => {
        event.preventDefault();
        // redirect to add class
    }


    renderTableData() {
        
        return this.state.teacherData.map((teacher, index) => {
            const { fullName, email,_id } = teacher //destructuring
            return (
               <tr key={_id}>
                 
                  <td style={{textAlign: "center"}}>{fullName}</td>
                  <td style={{textAlign: "center"}}>{email}</td>
                  
                  
                  <td>
                      <AiOutlineEdit />
                  </td>
                  <td>
                      <ImCross />
                  </td>
               </tr>
            )
         })
    }

    render() {
        return(
            <div className="container scrollable">
                <div className="row align-items-center">
                    <div className = "col" style={{marginTop: "10%"}}>

                    <div className="row">
                        <div class="text-block">
                        <div className="box title-container">
                            <h2 class="font-weight-light"></h2>
                            <div className="adminstfontgradon">Hello, Admin</div>
                            <div className="adminstfontauto">Add/Remove Teacher</div> 
                        </div>
                        </div>
                        <div className="box adminstbutton-container">
                        <button type="button" style = {{top: "500px", left: "124px", width: "180px",height: "45px",color: "#FFFFFFF", background: "#4285F4", borderRadius: "50px", opacity: "1", fontFamily: "Helvetica", fontSize: "15px", display:"block"}} className="btn btn-primary btn-block" onClick = {this.student}>Teacher</button>
                        <button type="button" style = {{top: "472px", left: "124px", width: "180px",height: "45px",color: "#FFFFFFF", background: "#4285F4",borderRadius: "50px", opacity: "1",fontFamily: "Helvetica", fontSize: "15px",display: "block", margin:"10%"}} className="btn btn-primary btn-block" onClick = {this.teacher}>Student</button>
                        <button style = {{width: "15%", position: "absolute", right: "0", width: "180px",height: "45px",background: "#26A6FF34 0% 0% no-repeat padding-box", borderRadius: "50px", opacity: "1", fontFamily: "Helvetica", fontSize: "15px", display:"block"}} className="btn btn-primary btn-block" onClick = {this.addStudent}>Add Teacher</button>
                   </div>
                   
                </div>
                <div class="backgroundbox">
                    <table class="center">
                        <tr>
                        
                            <th style={{fontWeight:"bold",textAlign: "center",fontSize:"17px", color:"#707070", opacity:"1"}}> 
                                Teacher Name
                            </th>
                            <th style={{fontWeight:"bold",textAlign: "center",fontSize:"17px", color:"#707070", opacity:"1"}}>
                                Teacher Email
                            </th>
                           
                            <th></th>
                            <th></th>
                        </tr>
                        <tbody>
                            {this.renderTableData()}
                        </tbody>
                    </table>
                    </div>
                    </div>
                </div>
                
            </div>
            
        )
    }
}

export default AdminTeacherList;