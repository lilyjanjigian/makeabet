import React from "react";

// the side bar on the profile page
// needs to take in the props of the usernam
const SideBar = (props) => {
  return (
    <div>
      {props.userName}
      {props.points} points
      <div></div>
      Ranking {props.ranking}
    </div>
  );
};

export default SideBar;
