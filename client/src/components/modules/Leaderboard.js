import React, { useState, useEffect } from "react";
import { get } from "../../utilities.js";
import "./Leaderboard.css";

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

  return <div className="Leaderboard-Container">
      <div className="Leaderboard-Title">
          Leaderboard
      </div>
      <div className="Leaderboard-Users">
          {top10.map((user) => (
              <div className="Leaderboard-User">
                  <div className="Leaderboard-UserName">
                      {user[0]}
                    </div>
                    <div className="Leaderboard-Points">
                      {user[1]}
                    </div>
              </div>
          ))}
      </div>
    </div>;
};

export default Leaderboard;
