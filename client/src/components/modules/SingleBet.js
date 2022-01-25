import React, {useState} from "react";
import { Link } from "@reach/router";
import "./Card.css";
import SingleVote from "./SingleVote.js";
import { get, post } from "../../utilities.js";

/*
//SingleBet is a component that renders the creator and the content of a bet

*/

const SingleBet = (props) => {
  const [opts, setOpts] = useState({opts: []});

  const [vote, setVote] = useState("")
  const [hasVoted, setHasVoted] = useState(false)
  const handleVote = (event) => {
    setVote(event.target.value);
    setHasVoted(true);
    alert(JSON.stringify(hasVoted))
  };

  const handleEvent = (optId) => {
    const updatedList = opts.map(opt => {
      if (opt.id === optId) {
        return Object.assign({}, opt, {
          votes: opt.votes + 1
        });
      } else {
        return opt;
      }
    });
  
    setOpts({
      opts: updatedList
    });
  };

  return (
    <div className="Card-container">
      <div className="u-bold" className="Card-title">
        {props.creator_name}
      </div>
      <div className="Card-betcontent"> {props.content} </div>
      <div className="Card-options"></div>
      <div>
        Options
        {props.options.map((opt) => (
          <SingleVote key={opt.id} votes={opt.votes} parent={props.content} content={opt.name}  />
        ))}
      </div>
      <div>Posted on {props.time_posted} </div>
      <div>Expires on {props.time_expired}</div>
      <div>Point value: {props.point_value}</div>
      <div> Resolved? {props.isresolved ? "true" : "false"} </div>
    </div>
  );
};

export default SingleBet;
