import React, { useEffect, useState } from 'react';
import Select from 'react-select';


let dict = [];
let arr = [];
for (let i = 0; i<101; i++) {
    dict.push({
        value:   i*10,
        label: i*10
    });

}
/*
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
*/
 
const options = dict
const PointsTest = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    console.log("page is working")
  }, [])

  return (
    <div >
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        placeholder='Select Point Value'
      />
    </div>
  );
}

export default PointsTest;