import React, { useState, useEffect } from "react";
import SideBar from "../modules/SideBar.js";
import { get, post } from "../../utilities.js";
import "./Profile.css"
//will spice up later

const Profile = (props) => {

  const [userRanking, setUserRanking] = useState(0);
  // const [bets, setBets] = useState([]);

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
    <div className="Profile-TopBox">
      <div className="Profile-UserName">
        {props.userName}
        {/* <SideBar userName={props.userName} points={props.points} ranking={userRanking} /> */}
      </div>
      <div className="Profile-Points">
        points: {props.points}
      </div>
      <div className="Profile-Ranking">
        world ranking: {userRanking}
      </div>
    </div>
    {/* <div className="Profile-BetBox">
        <div className="Profile-Subtitle">created by you</div>
        {bets.map((betObj) => {
          betObj.content
        })}
      </div> */}
    </>
  );
};

export default Profile;
