import React, { useState, useEffect } from "react";
import SideBar from "../modules/SideBar.js";
import { get, post } from "../../utilities.js";
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
  return (
    <>
      <div>
        <h1> Profile page! ~to come~ </h1>
        <SideBar userName={props.userName} points={props.points} ranking={props.ranking} />
        <div>Created by you: </div>
      </div>
    </>
  );
};

export default Profile;
