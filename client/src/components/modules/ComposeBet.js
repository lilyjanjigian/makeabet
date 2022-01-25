import React, { useState } from "react";
import { get, post } from "../../utilities.js";
import "./Card.css";
//ComposeBet is the component that is used to create a new bet

const initialValues = {
  bet: "",
};

const ComposeBet = (props) => {
  const [values, setValues] = useState(initialValues); // initial state of bet is empty string
  const [allInputs, setAllInputs] = useState({});
  const [optionBoxes, setOptionBoxes] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };
  //called whenever the user types in the box

  const handleOptionChange = (event) => {
    if (event.target.name in allInputs) {
      let tempInputs = { ...allInputs };
      tempInputs[event.target.name] = tempInputs[event.target.name] + event.target.value;
      setAllInputs(tempInputs);
    } else {
      setAllInputs({
        ...allInputs,
        [event.target.name]: event.target.value,
      });
    }
    console.log(allInputs);
  };

  const addInputBox = () => {
    const indString = optionBoxes.length.toString();
    const newBox = (
      <div>
        <input
          value={allInputs[indString]}
          name={indString}
          onChange={handleOptionChange}
          type="text"
          placeholder="Add a new option"
        />
      </div>
    );
    setOptionBoxes([...optionBoxes, newBox]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit(values);
    setAllInputs({});
    setOptionBoxes([]);
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
      <button type="submit" onClick={addInputBox}>
        Add Option
      </button>
      {optionBoxes}
      <input type="text" />
      <button type="submit" onClick={handleSubmit}>
        BET
      </button>
    </div>
  );
};
/** 
<div>Options</div>
<input
type="text"
value={values.option1}
onChange={handleChange}
name="option1"
label="Option 1"
/>

const handleOptionClick = () => {
    setCounter(counter + 1);
    console.log(counter);
  };
<input type="text" value={values.option2} onChange={handleChange} name="option2" />
*/

/**
 * 
 * @param {      {Array.from(Array(counter)).map((c, index) => {
        return (
          <input
            key={c}
            type="text"
            onChange={handleOptionChange}
            placeholder="Add an option"
          ></input>
        );
      })}} props 
 * @returns 
 */

/** New Bet is a component that will live on the feed for adding in new bets
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {string} storyId optional prop?? *DECIDE IF NEEDED*
 * @param {({storyId,value}) => void} onSubmit: (function) triggered when submit button is pressed
 */

const NewBet = (props) => {
  const [values, setValues] = useState(initialValues); // initial state of bet is empty string
  const [allInputs, setAllInputs] = useState({});
  const [optionBoxes, setOptionBoxes] = useState([]);

  const addBet = (values, allInputs) => {
    const body = {
      content: values.bet,
      options: allInputs,
    };
    console.log(values);
    console.log(allInputs);
    /* const body = { content: value, _id: props.userId, name: props.userName }; */
    post("/api/bet", body).then((bet) => {});
  };
  return (
    <ComposeBet onSubmit={addBet} allInputs={allInputs} values={values} optionBoxes={optionBoxes} />
  );
};

export default NewBet;

// what we are doing is adding a new post by passing down the function addBet from NewBet to ComposeBet
