import React, { useState } from "react";
import "./Card.css";
import "./ComposeBetTest.css";
import { get, post } from "../../utilities.js";
//ComposeBet is the component that is used to create a new bet

const initialValues = {
  bet: "",
};

const ComposeBet = (props) => {
  const [formValues, setFormValues] = useState([{ name: "" }]);

  const handleOptionChange = (i, event) => {
    let newFormValues = [...formValues];
    newFormValues[i][event.target.name] = event.target.value;
    setFormValues(newFormValues);
  };

  const addFormFields = () => {
    setFormValues([...formValues, { name: "" }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(formValues));
  };

  return (
    <div className="Card-newbetcontainer">
      Create a new bet!
      <br></br>
      <input
        type="text"
        value={props.values.bet}
        onChange={props.handleChange}
        name="bet"
        placeholder="Create a bet"
      />
      <div className="ComposetBetTest-buttonadd">
        <button className="button-add" type="submit" onClick={props.addInputBox}>
          Add Option
        </button>
        {props.optionBoxes}
      </div>
      <input type="text" />
      <form>
        <button type="submit" onSubmit={props.handleSubmit}>
          BET
        </button>
      </form>
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
  const [formValues, setFormValues] = useState([{ name: "" }]);

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
  };

  const addFormFields = () => {
    setFormValues([...formValues, { option: "" }]);
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
    alert(JSON.stringify(values));
    alert(JSON.stringify(allInputs));
    addBet(values, allInputs);
    setOptionBoxes([]);
    setValues(initialValues);
  };

  return (
    <ComposeBet
      handleSubmit={handleSubmit}
      addBet={addBet}
      addInputBox={addInputBox}
      handleOptionChange={handleOptionChange}
      handleChange={handleChange}
      values={values}
      optionBoxes={optionBoxes}
      allInputs={allInputs}
    />
  );
};

export default NewBet;

// what we are doing is adding a new post by passing down the function addBet from NewBet to ComposeBet
