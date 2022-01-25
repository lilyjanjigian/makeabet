import React, { useState } from "react";
import { get, post } from "../../utilities.js";

/* component for rendering when a user places their vote on the bet 

1. first get all the options 
2. when user presses a button nothing else can be pressed
3. the chart is made 
*/

const SingleOption = (props) => {
  const [voted, setVoted] = useState(false);
  const handleEvent = (event) => {
    console.log("button clicked for" + event);
    props.setHasVoted(true)
    const body = {
      content: props.content,
      parent: props.parent
    }
    post("/api/vote", body).then((vote) => {})
  };
  return (
    <div>
      <button onClick={handleEvent}>
        {props.content}
      </button>
    </div>
  );
};

export default SingleOption;
