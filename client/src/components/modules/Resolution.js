import React, { useState } from "react";
import { get, post } from "../../utilities.js";
import "./Card.css";

const Resolution = (props) => {
  const handleEvent = (event) => {
    const body = {
      bet_id: props.bet_id,
      answer: props.content,
    };
    post("/api/betanswer", body).then((betanswer) => {});
  };
  return (
    <div>
      <button onClick={handleEvent} className="Card-Vote">
        {props.content}
      </button>
    </div>
  );
};

export default Resolution;
