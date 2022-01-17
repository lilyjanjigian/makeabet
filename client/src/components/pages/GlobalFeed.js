import { process_params } from "express/lib/router";
import React, { useState, useEffect } from "react";
import NavBar from "../modules/NavBar.js";
import { get } from "../../utilities.js";
import SingleBet from "../modules/SingleBet.js";
import NewBet from "../modules/ComposeBet.js";

const GlobalFeed = (props) => {
  //define state to hold bets
  const [bets, setBets] = useState([]);

  useEffect(() => {
    document.title = "Global Feed";
    get("/api/globalbets").then((betObjs) => {
      setBets(betObjs);
    });
  }, []);

  return (
    <div>
      <SingleBet creator_name="randomhuman" content="i love cheese" />
    </div>
  );
};

/* ~ const addNewBet = (betObj) => {
    setBets([betObj].concat(bets));
  };

  let betsList = null;
  const hasBets = bets.length !== 0;
  if (hasBets) {
    betsList = bets.map((betObj) => (
      <SingleBet
        creator_name={betObj.creator_name}
        creator_id={betObj.creator_id}
        content={betObj.content}
      />
      //Bet object
    ));
  } else {
    betsList = <div>No bets!</div>;
  }

  return (
    <div>
      <NavBar
        page={"Global Feed"}
        handleLogin={props.handleLogin}
        handleLogout={props.handleLogout}
        userId={props.userId}
      />
      This is the global feed!
      <NewBet />
    </div>
  );
};
*/

export default GlobalFeed;
