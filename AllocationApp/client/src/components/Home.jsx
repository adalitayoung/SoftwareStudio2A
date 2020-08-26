import React from "react";
import grad from './grad.png';
import background from './background.jpg';

console.log(grad);
console.log(background);

function Home() {
  const mystyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "20px",
    fontFamily: "Arial",
    margin: "6px 2px",
    marginLeft: "30px",
    fontSize: "16px",
    borderRadius: "12px"
  };
  return (
      <div className="home" >
          <div class="container" >
        
                      <div className="box" >
            <h1 class="font-weight-light"></h1>
              <img src={require("./grad.png")} alt="grad" width="200" height="150"/>
              

              <h1>GRADONLINE</h1>
              <h2>Automatic Student Group Allocation</h2>
                          <br></br>
              </div>
              <div className="box">
          
              
              <button type="button" style={mystyle}>SIGN IN</button>
              
              <button type="button" style={mystyle}>SIGN OUT</button>
              
              </div>
         
      </div>
    </div>
  );
}

export default Home;