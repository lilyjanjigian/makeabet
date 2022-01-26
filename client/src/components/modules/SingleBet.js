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

  useEffect(() => {
    console.log('you have voted', hasVoted);
   }, [hasVoted]);

  useEffect(() => {
      setInterval(() => {
      console.log("asking server for new votes");
      get("/api/votes", {parent: props.content}).then((voteObjs) => {
        console.log(voteObjs);
        setVotes(voteObjs); // an array of vote objects
      });
    }, 2000);
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

  const theTime = new Date();

  let status_expiration = ""
  const compareTime = () => {
    if (theTime > props.time_expired) {
      status_expiration=
      'Has Expired'
    }
    else {
      status_expiration="Has Not Expired"    }
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
        {hasVoted ? <> <div> you already voted! see all the votes: </div>
        <div>  {generateVotes()} </div> </>: 
        <><div> {props.options.map((opt) => (
            <SingleOption key={opt.id} votes={opt.votes} hasVoted={hasVoted} setHasVoted={setHasVoted} parent_id = {props.bet_id} parent_content={props.content} content={opt.name} />
          )) }</div></>
        }
      </div>
      <div>Posted on {props.time_posted} </div>
      <div>Expires on {props.time_expired}</div>
      <div>Current Date {JSON.stringify(theTime)} </div>
      <div> {status_expiration} </div>
      <div>Point value: {props.point_value}</div>
      <div> {props.isresolved ? "Resolved!" : "Not yet resolved"} </div>
    </div>
  );
  };

export default SingleBet;
