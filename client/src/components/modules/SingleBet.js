import React, {useState, useEffect} from "react";
import "./Card.css";
import SingleOption from "./SingleOption.js";
import { get, post } from "../../utilities.js";
import SingleVote from "./SingleVote.js";
import Resolution from "./Resolution.js";

/*
//SingleBet is a component that renders the creator and the content of a bet

*/
/* useEffect calculates percentage 
store user IDs of each people and then compares to see if the person has voted 
have a list property of users who have placed a bet on a specific bet */
const SingleBet = (props) => {
  // const [voters, setVoters] = useState([]);
  const [newVoter, setNewVoter] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [votes, setVotes] = useState([]);
  const [enoughPoints, setEnoughPoints] = useState(true);

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
   }, [hasVoted]);

  useEffect(() => {
    if (props.userPoints < props.point_value) {
      setEnoughPoints(false);
    }
  }, [enoughPoints]);

  useEffect(() => {
      if (checkExpiration()){
        get("/api/votes", {parent_id: props.bet_id}).then((voteObjs) => {
          setVotes(voteObjs); // an array of vote objects
        });
      }
      else{
        setInterval(() => {
          if (!checkExpiration()){
            get("/api/votes", {parent_id: props.bet_id}).then((voteObjs) => {
              setVotes(voteObjs); // an array of vote objects

            });
          }
      }, 2000);
      }
  }, []);

  useEffect(() => {
    if (props.voters.includes(props.userId)) {
      setHasVoted(true);
    }
  }, []);

  // useEffect(() => {
  //   console.log('voters list:', voters)
  //   if (votes.length !== 0) {
  //     votes.map((voteObj) => {
  //       setNewVoter(voteObj.creator_name);
  //       if (voters.includes(newVoter)) {} else {
  //         setVoters([...voters,newVoter]);
  //       }
  // })}}, [votes]);

  const generateVotes = () => {
    let totalVotes = null;
    if (votes.length !== 0) {
      totalVotes = votes.map((voteObj) => {
      
        return (
          <SingleVote creator_name = {voteObj.creator_name} content={voteObj.content} />
        );
        
      }); //map takes in a function, which we will apply to every item in the array
    } else {
      totalVotes = <div className="Card-subtitle"> no votes </div>;
    }
    return totalVotes;
  };

  return (
    <div className="Card-container">
      <div className="Card-titleline">
      <div className="u-bold" className="Card-title">
        {props.creator_name}
      </div>
      <div className="Card-title"> Posted on {props.time_posted} </div>
      </div>
      
      <div className="Card-betcontent"> {props.content} </div>
      <div className="Card-options"></div>
      <div>
        {checkExpiration() ? (
          <> <div className="Card-subtitle"> bet expired. see votes: </div>
          <div>  {generateVotes()} </div>
          {props.isresolved ? (
            <div className="Card-subtitle"> bet resolved. answer was {props.answer}</div>
           ) : (<>
            <div className="Card-subtitle"> bet not resolved. resolve below:</div>
            <div>
            {props.options.map((opt) => <Resolution bet_id={props.bet_id} content={opt.name}/>)}
            </div>
            </>
           )}
          </>   
        ) : (
          hasVoted ? (<> <div className="Card-subtitle"> vote submitted. see votes: </div>
          <div>  {generateVotes()} </div> 
          {/* <div> All voters: {voters} </div> */}
          </> ) : (
            enoughPoints ? (
              <><div> {props.options.map((opt) => (
                <SingleOption key={opt.id} votes={opt.votes} hasVoted={hasVoted} setHasVoted={setHasVoted} parent_id = {props.bet_id} parent_content={props.content} content={opt.name} />
              )) }</div></>
            ) : (
              <div className="Card-subtitle">sorry, you don't have enough points to vote</div>
            )
          )
        )}
      </div>
      
      <div className="Card-subtitle">Point value: {props.point_value}</div>
      
      
      <div className="Card-titleline">
      <div className="Card-title"> {props.isresolved ? "Resolved!" : "Not yet resolved"} </div>
      {checkExpiration() ? (
        <div className="Card-title">Expired on {props.time_expired}</div>
      ) : (
        <div className="Card-title">Expires on {props.time_expired}</div>
      )}
      </div>
    </div>
  );
};

export default SingleBet;
