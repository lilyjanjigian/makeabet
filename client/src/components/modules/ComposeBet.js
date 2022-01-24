import React, { useState } from "react";
import { get, post } from "../../utilities.js";
//ComposeBet is the component that is used to create a new bet

const initialValues = {
  bet: "",
  option1: "",
};

const ComposeBet = (props) => {
  const [values, setValues] = useState(initialValues); // initial state of bet is empty string

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };
  //called whenever the user types in the box

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit(value);
    setValue("");
  };

  return (
    <div>
      Create a new bet!
      <br></br>
      <input type="text" value={values.bet} onChange={handleChange} name="bet" label="Bet" />
      <div>Options</div>
      <input
        type="text"
        value={values.option1}
        onChange={handleChange}
        name="option1"
        label="Option 1"
      />
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
