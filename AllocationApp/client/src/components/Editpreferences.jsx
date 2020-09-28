import React, { Component } from "react";
import '../style/style.css';
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom'
import api from '../api'

class classes extends Component {
constructor(props){
    super(props)
    
  this.state={
    projectPreference1:'volvo',
    projectPreference2:'volvo',
    projectPreference3:'volvo',
    technicalBackground:'volvo',
    msg:'',
  }
  }

    handleRegisterUser = async event => {
    event.preventDefault();
    let studentID = localStorage.getItem('uid');
    const { projectPreference1, projectPreference2, projectPreference3, technicalBackground} = this.state
    // Add in validation here
    if (projectPreference1 !== '' && projectPreference2 !== '' && projectPreference3 !== '' && technicalBackground !== ''){
      await api.addPreferencesBackground({studentID, projectPreference1, projectPreference2, projectPreference3, technicalBackground}).then(res => {
        // Do whatever you want to do whether its a page redirect etc.
        console.log(res)
        if (res.status === 200){
          // Success condition
          window.alert('Successful Add data to Database!')
          //this.props.history.push('/SignIn')
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
        <br/><br/><br/><br/>
    <div className="row text-center">
      <div className="col-md-2 col-12">
        <i className="fas fa-arrow-left clr"></i>
        <span className="clr">classes</span>
      </div>
      <div className="col-md-8 col-12" >
        <p className="txt">Edit Your Preference</p>
      </div>
      <div className="col-md-2 col-12">
        <p className="clr1"></p>
      </div>
    </div>
    <div className="row text-center">
      <div className="col md-12 col-12">
        <p>Please select and save your preference for class</p>
      </div>
    </div>
    <div className="row">
      <div className="col-md-2 col-12"></div>
      <div className="col-md-8 col-12 bg-frm">
        <div className="row">
          <div className="col-md-6 col-12">
            <label for="cars" className="lbl">1. Project- First Preference</label><br/>
            <select id="cars" 
            name="projectPreference1" 
    value={this.state.projectPreference1} onChange={(e)=>this.setState({projectPreference1:e.target.value})}
             form="carform" className="form-control">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            </select>
          </div>

          <div className="col-md-6 col-12 tp">
            <label for="cars" className="lbl">4. Technical Background</label><br/>
            <select id="cars" 
name="technicalBackground" 
    value={this.state.technicalBackground} onChange={(e)=>this.setState({technicalBackground:e.target.value})}
             form="carform" className="form-control">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            </select>
          </div>
         
           <div className="col-md-6 col-12 tp">
            <label for="cars" className="lbl">2.Project- Second Preference</label><br/>
            <select id="cars" 
name="projectPreference2" 
    value={this.state.projectPreference2} onChange={(e)=>this.setState({projectPreference2:e.target.value})}
             form="carform" className="form-control">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            </select>
          </div>
            <div className="col-md-6 col-12">
           </div>
         

           <div className="col-md-6 col-12">
            <label for="cars" className="lbl">3. Project- Third Preference</label><br/>
            <select id="cars" 
            name="projectPreference3" 
    value={this.state.projectPreference3} onChange={(e)=>this.setState({projectPreference3:e.target.value})}
             form="carform" className="form-control">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            </select>
          </div>
          
          
        

      </div>
      <div className="col-md-2 col-12"></div>
       <div className="row  ">

      <div className="col-md-4 col-12"></div>

      <div className="col-md-4 col-12">
              <button id="sign" className="btn btn-primary btn-block" onClick={this.handleRegisterUser} >Save</button>
             </div>
      <div className="col-md-2 col-12"></div>
            </div>
    </div>

  </div>

      </div>
      </div>
    );
  }
}

export default withRouter(classes);