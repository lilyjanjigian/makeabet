import React, { useState } from "react";
import "./NavBar.css";
import Skeleton from "../pages/Skeleton.js";

const SignUpNavBar = (props) => {
    return (<div className="NavBar-Container">
        <div className="NavBar-Title">
            BET.
        </div>
        <div className="NavBar-Login">
        <Skeleton handleLogin={props.handleLogin} handleLogout={props.handleLogout} userId={props.userId}/>
        </div>
    </div>)
}

export default SignUpNavBar;