import React from "react";

const DietaryFilter = ({ value, setValue }) => {
  return (
    <select value={value} onChange={(e) => setValue(e.target.value)}>
      <option value="All">All</option>
      <option value="Veg">Veg</option>
      <option value="NonVeg">Non-Veg</option>
    </select>
  );
};

export default DietaryFilter;
