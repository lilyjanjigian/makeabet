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
  let dateTime = new Date();
  let date = String(dateTime.getMonth()+1)+'/'+String(dateTime.getDate())+'/'+String(dateTime.getFullYear())
  let hours = dateTime.getHours() > 12 ? String(dateTime.getHours() - 12) : String(dateTime.getHours());
  let minutes = dateTime.getMinutes() > 10 ? String(dateTime.getMinutes()) : '0'+String(dateTime.getMinutes());
  let AMPM = dateTime.getHours() < 12 ? ' AM' : ' PM';
  let timestamp = date+' at '+hours+':'+minutes+AMPM;
  return (
    <div className="Card-container">
      <div className="u-bold" className="Card-title">
        {props.creator_name}
      </div>
      <div className="Card-betcontent"> {props.content} </div>
      <div className="Card-options">
        {Array.from(Array(props.options.map((option) => <SingleVote content={option} />)))};
      </div>
      <div>Posted on {timestamp} </div>
    </div>
  );
};

export default SingleBet;
