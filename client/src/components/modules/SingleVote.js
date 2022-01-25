import React, { useState } from "react";

/* component for rendering when a user places their vote on the bet 

1. first get all the options 
2. when user presses a button nothing else can be pressed
3. the chart is made 
*/

const SingleVote = (props) => {
  const [disable, setDisable] = useState(false);
  return (
    <div>
      <button disabled={disable} onClick={() => setDisable(true)}>
        {props.content}
      </button>
    </div>
  );
};

export default SingleVote;
