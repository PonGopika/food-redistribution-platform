import React, { useState } from "react";
import RoleSelector from "../components/RoleSelector";

const Register = () => {
  const [role, setRole] = useState("Donor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ role, email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <RoleSelector role={role} setRole={setRole} />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input placeholder="Fridge Capacity (kg)" />
      <input placeholder="Dry Storage Capacity (kg)" />

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
