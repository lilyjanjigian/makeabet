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
    <div className="Card-story">
      <div className="u-bold">{props.creator_name}</div>
      <div className="Card-storycontent"> {props.content} </div>
    </div>
  );
};

export default SingleBet;
