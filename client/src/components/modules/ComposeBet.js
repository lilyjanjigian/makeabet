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

const NewBet = (props) => {
  const addBet = (value) => {
    const body = { content: value, _id: props.userId, name: props.userName };
    post("/api/bet", body).then((bet) => {
      console.log("my bet is: " + bet);
      // props.addNewBet(bet);
    });
  };
  return <ComposeBet defaultText="New Bet" onSubmit={addBet} />;
};

export default NewBet;
