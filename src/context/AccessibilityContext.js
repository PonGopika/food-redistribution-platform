import React, { createContext, useState } from "react";

export const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [lang, setLang] = useState("EN");
  const [contrast, setContrast] = useState(false);

  return (
    <AccessibilityContext.Provider
      value={{ lang, setLang, contrast, setContrast }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};
