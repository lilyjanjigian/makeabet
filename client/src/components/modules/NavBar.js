import React, { useState } from "react";
import "./NavBar.css";
import Skeleton from "../pages/Skeleton.js";

const NavBar = (props) => {
    return (<div className="NavBar-Container">
        <div className="NavBar-Title">
            BET.
        </div>
        {/* {(props.page === "Global Feed") ? (

        ):(

        )} */}
        <div className="NavBar-Login">
        <Skeleton handleLogin={props.handleLogin} handleLogout={props.handleLogout} userId={props.userId}/>
        </div>
    </div>)
}

export default NavBar;