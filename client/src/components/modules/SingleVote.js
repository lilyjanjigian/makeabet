import React, { useState } from "react";
import { get, post } from "../../utilities.js";
import "./Card.css";

/* component for rendering when a user places their vote on the bet 

1. first get all the options 
2. when user presses a button nothing else can be pressed
3. the chart is made 
*/

const SingleVote = (props) => {
  return (
    <div>
      <div className="Card-subtitle2"> {props.creator_name} voted {props.content} </div>
    </div>
  );
};

export default SingleVote;
