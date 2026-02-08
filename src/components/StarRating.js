import React, { useState } from "react";

const StarRating = () => {
  const [rating, setRating] = useState(0);

  return (
    <div>
      {[1,2,3,4,5].map((n) => (
        <span key={n} onClick={() => setRating(n)}>
          {n <= rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
