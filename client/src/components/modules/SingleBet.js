import React from "react";
import { Link } from "@reach/router";

//SingleBet is a component that renders the creator and the content of a bet

const SingleBet = (props) => {
  return (
    <div>
      <SingleBet
        creator_name={props.creator_name}
        creator_id={props.creator_id}
        content={props.content}
      />
    </div>
  );
};

export default SingleBet;
