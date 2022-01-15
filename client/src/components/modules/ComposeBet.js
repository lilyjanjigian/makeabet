import React, { useState } from "react";

//ComposeBet is the component that is used to create a new bet

const ComposeBet = (props) => {
  const [betInput, setBetInput] = useState(""); // initial state of bet is empty string
  const handleChange = (event) => {
    setBetInput(event.target.value); //called whenever the user types in the box
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit(value);
    setValue("");
  };

  return (
    <div>
      Create a new bet
      <input type="text" betInput={betInput} onChange={handleChange} />
      <button type="submit" onClick={handleSubmit}>
        BET
      </button>
    </div>
  );
};

const NewBet = (props) => {
  const addBet = (value) => {
    const body = { content: value };
    post("/api/bet", body).then((bet) => {
      props.addNewBet(bet);
    });
  };
  return <ComposeBet defaultText="New Bet" onSubmit={addBet} />;
};



export default NewBet;
