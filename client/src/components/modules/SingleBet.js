import React, {useState, useEffect} from "react";
import "./Card.css";
import SingleOption from "./SingleOption.js";
import { get, post } from "../../utilities.js";
import SingleVote from "./SingleVote.js";

/*
//SingleBet is a component that renders the creator and the content of a bet

*/
/* useEffect calculates percentage 
store user IDs of each people and then compares to see if the person has voted 
have a list property of users who have placed a bet on a specific bet */
const SingleBet = (props) => {

  const [hasVoted, setHasVoted] = useState(false)
  const [votes, setVotes] = useState([]);

  const checkExpiration = () => {
    let currentTime = Date.now();
    if (currentTime > Date.parse(props.time_expired)) {
      return true;
    }
    else {
      return false;
    }
  }

  useEffect(() => {
    console.log('you have voted', hasVoted);
   }, [hasVoted]);

  useEffect(() => {
      if (checkExpiration()){
        console.log("asking server for votes");
        get("/api/votes", {parent_id: props.bet_id}).then((voteObjs) => {
          console.log(voteObjs);
          setVotes(voteObjs); // an array of vote objects
        });
      }
      else{
        setInterval(() => {
          if (!checkExpiration()){
            console.log("asking server for new votes");
            get("/api/votes", {parent_id: props.bet_id}).then((voteObjs) => {
              console.log(voteObjs);
              setVotes(voteObjs); // an array of vote objects
            });
          }
      }, 2000);
      }
  }, []);

  const generateVotes = () => {
    let totalVotes = null;
    if (votes.length !== 0) {
      totalVotes = votes.map((voteObj) => {
        console.log(`vote obj: ${JSON.stringify(voteObj)}`);
        return (
          <SingleVote creator_name = {voteObj.creator_name} content={voteObj.content} />
        );
      }); //map takes in a function, which we will apply to every item in the array
    } else {
      totalVotes = <div> no votes! </div>;
    }
    return totalVotes;
  };

  return (
    <div className="Card-container">
      <div className="u-bold" className="Card-title">
        {props.creator_name}
      </div>
      <div>  Bet id: {props.bet_id} </div>
      <div className="Card-betcontent"> {props.content} </div>
      <div className="Card-options"></div>
      <div>
        {checkExpiration() ? (
          <> <div> this bet has expired and votes are no longer being accepted! see all the votes: </div>
          <div>  {generateVotes()} </div> </>
        ) : (
          hasVoted ? <> <div> your vote was submitted! see all the votes: </div>
          <div>  {generateVotes()} </div> </>: 
          <><div> {props.options.map((opt) => (
            <SingleOption key={opt.id} votes={opt.votes} hasVoted={hasVoted} setHasVoted={setHasVoted} parent_id = {props.bet_id} parent_content={props.content} content={opt.name} />
          )) }</div></>
        )}
      </div>
      <div>Posted on {props.time_posted} </div>
      {checkExpiration() ? (
        <div>Expired on {props.time_expired}</div>
      ) : (
        <div>Expires on {props.time_expired}</div>
      )}
      <div>Point value: {props.point_value}</div>
      <div> {props.isresolved ? "Resolved!" : "Not yet resolved"} </div>
    </div>
  );
};

export default SingleBet;
