import React, { useState, useEffect } from "react";
import SideBar from "../modules/SideBar.js";
import { get, post } from "../../utilities.js";
import "./Profile.css"
//will spice up later

const Profile = (props) => {

  const [userRanking, setUserRanking] = useState(0);
  // const [bets, setBets] = useState([]);
  const [createdBets, setCreatedBets] = useState(0);
  
  useEffect(() => {
        get("/api/createdbets", {creator_name: props.userName}).then((betObjs) => {
          setCreatedBets(betObjs); // an array of vote objects
        })}, []);


  useEffect(() => {
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

  
  useEffect(() => {
    setInterval(() => {
    post("/api/points").then(console.log('done updating points'))}, 86400000); }, []);

  
  return (
    <>
    <div className="Profile-TopBox">
      <div className="Profile-UserName">
        {props.userName}
      </div>
      <div className="Profile-Points">
        points: {props.points}
      </div>
      <div className="Profile-Ranking">
        world ranking: {userRanking}
      </div>
    </div>
    <div className="Profile-Ranking"> created by you </div>
    <div> {createdBets.length} </div>

    </>
  );
};

export default Profile;
