import { process_params } from "express/lib/router";
import React, { useState, useEffect } from "react";
import { get } from "../../utilities.js";
import SingleBet from "../modules/SingleBet.js";
import NewBet from "../modules/ComposeBet.js"; // later change it to {}
import Leaderboard from "../modules/Leaderboard.js";

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
      console.log("asking server for new bets");

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
        console.log(`bet obj: ${JSON.stringify(betObj)}`);
        // return <SingleBet creator_id={betObj.creator_id} creator_name={betObj.creator_name} content={betObj.content} />;
        return (
          <SingleBet
            creator_name={betObj.creator_name}
            content={betObj.content}
            options={betObj.options}
            time_posted={betObj.time_posted}
            time_expired={betObj.time_expired}
            point_value={betObj.point_value}
            isresolved={betObj.isresolved}
          />
        );
      }); //map takes in a function, which we will apply to every item in the array
    } else {
      feedBets = <div> no bets! </div>;
    }
    return feedBets;
  };

  return (
    <div>
      <h1 className="u-textCenter"> Global Feed </h1>
      <Leaderboard />
      <NewBet />

      <div>{generateFeedBets()}</div>
    </div>
  );
};

export default GlobalFeed;

/*
  useEffect(() => {
    makeFeed;
  });

  const makeFeed = (bets) => {
    */
