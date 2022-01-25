import React from "react";
import { Link } from "@reach/router";
import "./Card.css";
import SingleVote from "./SingleVote.js";
/*
//SingleBet is a component that renders the creator and the content of a bet

Proptypes 
@param {string} _id of the story
@param {string} creator_name
@param {string} content of the story 
*/

const SingleBet = (props) => {
  return (
    <div className="Card-container">
      <div className="u-bold" className="Card-title">
        {props.creator_name}
      </div>
      <div className="Card-betcontent"> {props.content} </div>
      <div className="Card-options"></div>
      <div>Options {props.options}</div>
      <div>Posted on {props.time_posted} </div>
      <div>Expires on {props.time_expired}</div>
      <div>Point value: {props.point_value}</div>
      <div> Resolved? {"true" ? props.isresolved : "false"} </div>
    </div>
  );
};

export default SingleBet;

/*
        {Array.from(Array(props.options.map((option) => <SingleVote content={option} />)))};
*/
