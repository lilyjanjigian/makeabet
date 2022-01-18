import React from "react";
import SideBar from "../modules/SideBar.js";
//will spice up later

const Profile = (props) => {
  return (
    <>
      <div>
        <h1> Profile page! ~to come~ </h1>
        <SideBar userName={props.userName} />
      </div>
    </>
  );
};

export default Profile;
