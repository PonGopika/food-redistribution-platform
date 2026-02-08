import React, { useState } from "react";

const SafetyChecklist = () => {
  const [fresh, setFresh] = useState(false);
  const [hygiene, setHygiene] = useState(false);

  return (
    <div>
      <h3>Safety Checklist</h3>

      <label>
        Freshness Checked
        <input type="checkbox" onChange={() => setFresh(!fresh)} />
      </label>

      <label>
        Hygiene Maintained
        <input type="checkbox" onChange={() => setHygiene(!hygiene)} />
      </label>
    </div>
  );
};

export default SafetyChecklist;
