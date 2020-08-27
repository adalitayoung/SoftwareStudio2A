import React from "react";

import background from './updatedbackground.jpg';
import { Link } from 'react-router-dom'


console.log(background);

function Home() {
    const hpbutton = {
        color: "black",
        backgroundColor: "LightGrey",
        padding: "10px 24px",
        fontFamily: "Arial",
        margin: "6px 4px",
        textAlign: "center",
        position: "absoluteright",
        
        fontSize: "20px",
        borderRadius: "12px",
        display: "inline-block",
} 
  return (
      <div className="home" >
          <div class="container" >
              < div class="piccontainer">
                  <img className="hppic" src={background} width="100%" />
                  <div class= "text-block">
              <div className="box" >
                 
            <h1 class="font-weight-light"></h1>
             
              

              <div className="fontgradon">GRADONLINE</div>
              <h2>Automatic Student Group Allocation</h2>
                          <br></br>
              </div>
              <div className="box">
          
              <Link to="Signin">
              <button type="button" style={hpbutton}>SIGN IN</button>
                  </Link>
                <Link to="Register">
              <button type="button" style={hpbutton}>REGISTER</button>
              </Link>
              </div>
         
      </div>
     </div>
          </div>
          </div>
  );
}

export default Home;