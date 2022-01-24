import React, { useState, useEffect } from "react";
import { get } from "../../utilities.js";

const Leaderboard = (props) => {
  const [top10, setTop10] = useState([]);

  useEffect(() => {
    get("/api/users").then((userObjs) => {
      let sortedUsers = userObjs.sort((a, b) =>
        a.points < b.points ? 1 : a.points === b.points ? (a.name > b.name ? 1 : -1) : -1
      );
      let topUsers = sortedUsers.slice(0, 10);
      setTop10(
        topUsers.map((userObj) => {
          return [userObj.name, userObj.points];
        })
      );
    });
  }, []);

  return <div>Leaderboard: {top10}</div>;
};

export default Leaderboard;
