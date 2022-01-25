import React, { useState } from "react";
import "./NavBar.css";
import { Link } from "@reach/router";
import Skeleton from "../pages/Skeleton.js";

const NavBar = (props) => {
    return (<div className="NavBar-Container">
        <div className="NavBar-Title">
            BET.
        </div>
        {props.userId ? (
            <div className="NavBar-LinkContainer">
            <Link to="/" className="NavBar-Link">
                World
            </Link>
            <Link to="/profile" className="NavBar-Link">
                Profile
                {/* TO-DO: MAKE THIS SAY THE USERNAME INSTEAD OF PROFILE??*/}
            </Link>
            </div>
        ) : (
            <></>
        )}
        <div className="NavBar-Login">
        <Skeleton handleLogin={props.handleLogin} handleLogout={props.handleLogout} userId={props.userId}/>
        </div>
    </div>)
}

export default NavBar;