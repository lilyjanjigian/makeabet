import React, { useState } from "react";

//NewBet is the component that is used to create a new bet

const NewBet = (props) => {
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
      This is a new bet
      <input type="text" betInput={betInput} onChange={handleChange} />
      <button type="submit" onClick={handleSubmit}>
        {" "}
        Bet{" "}
      </button>
    </div>
  );
};

export default NewBet;
