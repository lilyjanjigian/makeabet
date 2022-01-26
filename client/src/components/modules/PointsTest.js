import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import "./ComposeBetTest.css";



let dict = [];
let arr = [];
for (let i = 0; i<101; i++) {
    dict.push({
        value:   i*10,
        label: i*10
    });

}

 
const options = dict
const PointsTest = (props) => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div >
      <Select className="ComposeBetTest-pointvalue"
        defaultValue={props.selectedValue}
        onChange={props.handlePointChange}
        options={options}
        placeholder='Select Point Value'
      />
    </div>
  );
}

export default PointsTest;

/*        defaultValue={selectedOption}
        onChange={setSelectedOption}
        */
