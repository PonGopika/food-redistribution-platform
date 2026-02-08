import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { FoodProvider } from "./context/FoodContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <FoodProvider>
        <App />
      </FoodProvider>
    </AuthProvider>
  </React.StrictMode>
);
