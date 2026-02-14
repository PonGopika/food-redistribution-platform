import React from "react";

const TemperatureTag = ({ value, setValue }) => {
  return (
    <select value={value} onChange={(e) => setValue(e.target.value)}>
      <option value="Hot">Hot</option>
      <option value="Cold">Cold</option>
    </select>
  );
};

export default TemperatureTag;
