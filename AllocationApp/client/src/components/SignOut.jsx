import React, {useHistory} from 'react';
import { Link, Redirect } from 'react-router-dom';

class SignOut extends React.Component{

    constructor(props){
    super(props)
    localStorage.removeItem("Token")
  setTimeout(()=>{
    
      window.location='/SignIn'
  },2000)
  }


  render(){
    
    return(
    
        <><div>
      <center><br/><br/><br/><br/><br/><br/> <h1> Logged Out Successfull!</h1> <br/><br/>
      </center>
       </div><br/><br/><br/></>
      );
  }
}

export default SignOut;