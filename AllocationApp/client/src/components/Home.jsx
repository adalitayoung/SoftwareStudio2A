import React from "react";
import background from './updatedbackground.jpg';
import { Link } from 'react-router-dom'


console.log(background);


function Home() {
    const hpbutton = {
        color: "white",
        backgroundColor: "#3da2ff",
        padding: "10px 24px",
        fontFamily: "Arial",
        margin: "6px 4px",
        textAlign: "center",
        position: "absoluteright",

        fontSize: "20px",
        borderRadius: "10px",
        border: "none",
        display: "inline-block",
        minWidth: "140px",
        maxWidth: "140px"
    }
    return (
        <div className="home" >
            <div class="container" >
                <div class="piccontainer">
                    <div class="body">
                        <img className="hppic" src={background} width="100%" />
                            <div class="text-block">
                                <div className="box title-container">
                                    <h1 class="font-weight-light"></h1>
                                        <div className="fontgradon">GRADONLINE</div>
                                        <div className="fontauto">Automatic Student Group Allocation</div>              
                                </div>
                                            <div className="box button-container">
                                                <Link to="Signin">
                                                    <button type="button" style={hpbutton}>Sign in</button>
                                                </Link>
                                                <Link to="Register">
                                                    <button type="button" style={hpbutton}>Register</button>
                                                </Link>
                                            </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;