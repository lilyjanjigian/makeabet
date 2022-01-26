import React, { useState, useEffect } from "react";
import SideBar from "../modules/SideBar.js";
import { get, post } from "../../utilities.js";
import "./Profile.css"
//will spice up later

const Profile = (props) => {
  /*
  const [bets, setBets] = useState([]);
  useEffect(() => {
    document.title = "Profile";
    get("/api/createdbets").then((betObjs) => {
      setBets(betObjs);
    });
  }, []);
  */

  const [userRanking, setUserRanking] = useState(0);

  useEffect(() => {
    console.log(`user: ${props.userName}`)
    get("/api/users").then((userObjs) => {
      let sortedUsers = userObjs.sort((a, b) =>
        a.points < b.points ? 1 : a.points === b.points ? (a.name > b.name ? 1 : -1) : -1
      );
      let usernameList = sortedUsers.map((userObj) => {
        return userObj.name
      });
      setUserRanking(usernameList.indexOf(props.userName)+1)
    });
  }, [props.userName]);

  return (
    <>
      <div className="Profile-section">
        <h1> Profile page! ~to come~ </h1>
        <SideBar userName={props.userName} points={props.points} ranking={userRanking} />
        <div>Created by you: </div>
      </div>
    </>
  );
};

export default Profile;
