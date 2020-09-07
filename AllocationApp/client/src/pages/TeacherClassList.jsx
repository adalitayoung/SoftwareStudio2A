import React from 'react'

import api from '../api'

import {AiOutlineEdit} from 'react-icons/ai'
import {ImCross} from 'react-icons/im'
import { Link } from 'react-router-dom'
import { Component } from "react";

class TeacherClassList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: props.location.state.user,
            classData: [],
            isLoading: false,
        }

        this.fetchClassList(this.state.user._id)
    }

    fetchClassList(userId){
        api.getAllCourses().then(data => {
            // need to change class model and check if the course is for that teacher
            // console.log(data)
            this.setState({classData: data.data.data})
            console.log(this.state.classData)
        })
    }

    editClass(user) {
        // event.preventDefault();
        console.log('edit')
        console.log(user)
    }

    deleteClass(user) {
        // event.preventDefault();
        console.log('delete')
        console.log(user)
    }

    viewStudents = async event => {
        event.preventDefault();
    }

    viewProjects = async event => {
        event.preventDefault();
    }

    addClass = async event => {
        event.preventDefault();
        // redirect to add class
    }


    renderTableData() {
        
        return this.state.classData.map((course, index) => {
            const { name, numberOfStudents, __v, _id } = course //destructuring
            return (
               <tr key={_id}>
                  <td style={{textAlign: "center"}}>{name}</td>
                  <td style={{textAlign: "center"}}>{numberOfStudents}</td>
                  <td>
                    <button style = {{width: "70%", marginLeft: "15%"}} className="btn btn-primary btn-block" onClick={this.viewStudents}>
                        Students
                    </button>
                  </td>
                  <td>
                    <button style = {{width: "70%", marginLeft: "15%"}} className="btn btn-primary btn-block" onClick = {this.viewProjects}>
                        Projects
                    </button>
                  </td>
                  <td>
                      <AiOutlineEdit onClick={() => this.editClass(_id)}/>
                  </td>
                  <td>
                      <ImCross onClick = {() => this.deleteClass(_id)} />
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
                        <h2>{this.state.user.fullName}'s Classes</h2>
                        <button style = {{width: "15%", position: "absolute", right: "0"}} className="btn btn-primary btn-block" onClick = {this.addClass}>Add Class</button>
                    </div>
                    <table class="center">
                        <tr>
                            <th style={{textAlign: "center"}}>
                                Name
                            </th>
                            <th style={{textAlign: "center"}}> 
                                Number of Students
                            </th>
                            <th style={{textAlign: "center"}}>
                                View Students
                            </th>
                            <th style={{textAlign: "center"}}>
                                View Projects
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
            
        )
    }
}

export default TeacherClassList;