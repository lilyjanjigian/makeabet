import React, { useState } from "react";
import "./SignUpNavBar.css";
import Skeleton from "../pages/Skeleton.js";

const SignUpNavBar = (props) => {
  return (
    <div className="NavBar-Container">
      <span className="NavBar-Title">BET.</span>
      <span className="NavBar-Login">
        <Skeleton
          handleLogin={props.handleLogin}
          handleLogout={props.handleLogout}
          userId={props.userId}
        />
      </span>
    </div>
  );
};

export default SignUpNavBar;
