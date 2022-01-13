import React from "react";
import "./SignUpPage.css";
import SignUpNavBar from "../modules/SignUpNavBar.js";

const SignUpPage = (props) => {
    return (<>
    <SignUpNavBar handleLogin={props.handleLogin} handleLogout={props.handleLogout} userId={props.userId}/>
    <div className="SignUpPage-Background">
        <div className="SignUpPage-Title">
            Predict the future
        </div>
        <div className="SignUpPage-Subtitle1">Betting just got better</div>
        <div className="SignUpPage-Subtitle2">Log in above to start playing</div>
    </div>
    </>)
}

export default SignUpPage;