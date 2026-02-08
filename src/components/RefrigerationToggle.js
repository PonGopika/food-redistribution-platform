import React, { useState } from "react";

const RefrigerationToggle = () => {
  const [required, setRequired] = useState(false);

  return (
    <label>
      Refrigeration Required
      <input
        type="checkbox"
        checked={required}
        onChange={() => setRequired(!required)}
      />
    </label>
  );
};

export default RefrigerationToggle;
