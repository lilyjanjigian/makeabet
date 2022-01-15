import { process_params } from "express/lib/router";
import React from "react";
import Skeleton from "./Skeleton.js";

const GlobalFeed = (props) => {
    return (
        <div>
            <Skeleton handleLogin={props.handleLogin} handleLogout={props.handleLogout} userId={props.userId}/>
        </div>
    )
}

export default GlobalFeed;