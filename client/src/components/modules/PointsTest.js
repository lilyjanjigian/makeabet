import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
 
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