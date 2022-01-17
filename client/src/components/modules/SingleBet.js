import React from "react";
import { Link } from "@reach/router";
import "./Card.css";

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
    </div>
  );
};

export default SingleBet;
