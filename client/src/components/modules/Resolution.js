import React, { useState } from "react";
import { get, post } from "../../utilities.js";

const Resolution = (props) => {
  const handleEvent = (event) => {
    console.log("button clicked for" + event);
    const body = {
      bet_id: props.bet_id,
      answer: props.content,
    };
    post("/api/betanswer", body).then((betanswer) => {});
  };
  return (
    <div>
      <button onClick={handleEvent}>
        {props.content}
      </button>
    </div>
  );
};

export default Resolution;
