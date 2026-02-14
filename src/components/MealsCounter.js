import React from "react";

const MealsCounter = ({ count = 0 }) => {
  return <h3>Meals Donated: {count}</h3>;
};

export default MealsCounter;
