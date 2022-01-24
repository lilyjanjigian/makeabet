import React, { useState } from "react";
import { get, post } from "../../utilities.js";
import "./Card.css";
//ComposeBet is the component that is used to create a new bet

const initialValues = {
  bet: "",
};

const ComposeBet = (props) => {
  const [values, setValues] = useState(initialValues); // initial state of bet is empty string
  const [counter, setCounter] = useState(0);
  const [currentInput, setCurrentInput] = useState("");
  const [allInputs, setAllInputs] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };
  //called whenever the user types in the box

  const handleOptionChange = (event) => {
    setCurrentInput(event.target.value);
  };

  const handleOptionClick = () => {
    setCounter(counter + 1);
    console.log(counter);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit(values);
    setAllInputs([...allInputs, currentInput]);
    setCurrentInput("");
    setValues(initialValues);
  };
  return (
    <div className="Card-newbetcontainer">
      Create a new bet!
      <br></br>
      <input
        type="text"
        value={values.bet}
        onChange={handleChange}
        name="bet"
        placeholder="Create a bet"
      />
      <div>Options</div>
      <input
        type="text"
        value={values.option1}
        onChange={handleChange}
        name="option1"
        label="Option 1"
      />
      <input type="text" value={values.option2} onChange={handleChange} name="option2" />
      <button type="submit" onClick={handleOptionClick}>
        Add Option
      </button>
      {Array.from(Array(counter)).map((c, index) => {
        return (
          <input
            key={c}
            type="text"
            onChange={handleOptionChange}
            placeholder="Add an option"
          ></input>
        );
      })}
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
  const addBet = (values, allInputs) => {
    const body = {
      content: values.bet,
      options: allInputs,
    };
    /* const body = { content: value, _id: props.userId, name: props.userName }; */
    post("/api/bet", body).then((bet) => {});
  };
  return <ComposeBet defaultText="create a new bet!" onSubmit={addBet} />;
};

export default NewBet;

// what we are doing is adding a new post by passing down the function addBet from NewBet to ComposeBet
