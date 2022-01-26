import React, { useState } from "react";
import { get, post } from "../../utilities.js";
import "./ComposeBetTest.css";
import DateTimePicker from 'react-datetime-picker';
import PointsTest from "./PointsTest.js";

const ComposeBetTest = () => {
  const [value, setValue] = useState("");
  const [formValues, setFormValues] = useState([{ name: "" }]);
  const [dateTimeValue, onDateTimeChange] = useState(new Date());
  const handleBetChange = (event) => {
    setValue(event.target.value);
  };

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { name: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  const addBet = (value, formValues, dateTimeVal) => {
    const body = {
      content: value,
      options: formValues,
      time_expired: new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(dateTimeVal),
    };
    console.log(dateTimeVal)
    console.log(value);
    console.log(formValues);
    /* const body = { content: value, _id: props.userId, name: props.userName }; */
    post("/api/bet", body).then((bet) => {});
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    addBet(value, formValues, dateTimeValue);
    setValue("");
    setFormValues([{ name: "" }]);
  };
  // const onCalendarChange = (date) => {
  //   console.log(date);
  // }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={handleBetChange}
        value={value}
        name="bet"
        placeholder="Create a bet"
      />

      {formValues.map((element, index) => (
        <div className="form-inline" key={index}>
          <label>Option</label>
          <input
            type="text"
            name="name"
            value={element.name || ""}
            onChange={(e) => handleChange(index, e)}
          />
          {index ? (
            <button type="button" className="button remove" onClick={() => removeFormFields(index)}>
              Remove
            </button>
          ) : null}
        </div>
      ))}
      <label>Expires</label>
      <DateTimePicker
        minDate = {new Date()}
        onChange={onDateTimeChange}
        value = {dateTimeValue}
      />
      <div className="button-section">
        <button className="ComposeBetTest-buttonadd" type="button" onClick={() => addFormFields()}>
          Add an Option
        </button>
        <PointsTest />
        <button className="button submit" type="submit">
          BET
        </button>
      </div>
    </form>
  );
};

export default ComposeBetTest;
