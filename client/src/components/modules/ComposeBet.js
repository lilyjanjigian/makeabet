import React, { useState } from "react";
import { get, post } from "../../utilities.js";
//ComposeBet is the component that is used to create a new bet

const ComposeBet = (props) => {
  const [value, setValue] = useState(""); // initial state of bet is empty string

  const handleChange = (event) => {
    setValue(event.target.value); //called whenever the user types in the box
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit(value);
    setValue("");
  };

  return (
    <div>
      Create a new bet!
      <br></br>
      <input type="text" value={value} onChange={handleChange} />
      <button type="submit" onClick={handleSubmit}>
        BET
      </button>
    </div>
  );
};

/** New Bet is a component that will live on the feed for adding in new bets
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId optional prop?? *DECIDE IF NEEDED*
 * @param {({storyId,value}) => void} onSubmit: (function) triggered when submit button is pressed
 */

const NewBet = (props) => {
  const addBet = (value) => {
    const body = { content: value, name: props.userName };
    /* const body = { content: value, _id: props.userId, name: props.userName }; */
    post("/api/bet", body).then((bet) => {});
  };
  return <ComposeBet defaultText="create a new bet!" onSubmit={addBet} />;
};

export default NewBet;

// what we are doing is adding a new post by passing down the function addBet from NewBet to ComposeBet
