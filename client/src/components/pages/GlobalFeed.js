import React, { useState, useEffect } from "react";
import { get } from "../../utilities.js";
import SingleBet from "../modules/SingleBet.js";
import Leaderboard from "../modules/Leaderboard.js";
import ComposeBetTest from "../modules/ComposeBetTest.js";

const GlobalFeed = (props) => {
  //define state to hold bets
  const [bets, setBets] = useState([]);

  useEffect(() => {
    document.title = "Global Feed";
    get("/api/globalbets").then((betObjs) => {
      let reversedBetObjs = betObjs.reverse();
      setBets(reversedBetObjs); // an array of bet objects
    });

    setInterval(() => {
      get("/api/globalbets").then((betObjs) => {
        let reversedBetObjs = betObjs.reverse();
        setBets(reversedBetObjs); // an array of bet objects
      });
    }, 5000);
  }, []);

  const generateFeedBets = () => {
    let feedBets = null;
    if (bets.length !== 0) {
      feedBets = bets.map((betObj) => {
        // return <SingleBet creator_id={betObj.creator_id} creator_name={betObj.creator_name} content={betObj.content} />;
        return (
          <SingleBet
            bet_id={betObj._id}
            creator_name={betObj.creator_name}
            content={betObj.content}
            options={betObj.options}
            time_posted={betObj.time_posted}
            time_expired={betObj.time_expired}
            point_value={betObj.point_value}
            isresolved={betObj.isresolved}
            voters={betObj.voters}
            answer={betObj.answer}
            userId={props.userId}
            userPoints={props.points}
          />
        );
      }); //map takes in a function, which we will apply to every item in the array
    } else {
      feedBets = <div> no bets </div>;
    }
    return feedBets;
  };

  return (
    <div className="GlobalFeed-Container">
      <div className="Card-newbetcontainer">
        <ComposeBetTest />
      </div>
      <Leaderboard />

      <div>{generateFeedBets()}</div>
    </div>
  );
};

export default GlobalFeed;
