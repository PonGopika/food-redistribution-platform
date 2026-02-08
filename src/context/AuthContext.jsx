import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(true);

  // Load from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setLanguage(parsed.language || "en");
    }
    setLoading(false);
  }, []);

  // LOGIN
  const login = ({ name, email, role, phone, organizationName, language }) => {
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      role,
      phone: phone || "",
      organizationName: organizationName || "",
      language: language || "en",
      isVerified: false,
      verificationStatus: "not_started", // not_started, pending, verified
      createdAt: new Date().toISOString(),
      // Profile settings
      notifications: {
        email: true,
        sms: false,
        push: true
      },
      // Role-specific data
      ...(role === "donor" && {
        donorProfile: {
          businessType: "",
          avgDonationsPerMonth: 0,
          totalDonated: 0,
          sustainabilityCredits: 0
        }
      }),
      ...(role === "ngo" && {
        ngoProfile: {
          fridgeCapacity: 100,
          dryStorageCapacity: 200,
          freezerCapacity: 50,
          serviceRadius: 10,
          dietaryPreferences: ["veg", "non-veg"],
          populationsServed: ["children", "elderly"]
        }
      }),
      ...(role === "volunteer" && {
        volunteerProfile: {
          isOnboarded: false,
          totalDeliveries: 0,
          badges: [],
          availability: {}
        }
      })
    };

    setUser(newUser);
    setLanguage(newUser.language);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // REGISTER
  const register = ({ name, email, role, phone, organizationName, language }) => {
    login({ name, email, role, phone, organizationName, language });
  };

  // UPDATE USER PROFILE
  const updateUser = (updates) => {
    if (user) {
      const updated = { ...user, ...updates };
      setUser(updated);
      localStorage.setItem("user", JSON.stringify(updated));
    }
  };

  // UPDATE VERIFICATION STATUS
  const updateVerificationStatus = (status) => {
    if (user) {
      const updated = {
        ...user,
        verificationStatus: status,
        isVerified: status === "verified"
      };
      setUser(updated);
      localStorage.setItem("user", JSON.stringify(updated));
    }
  };

  // LANGUAGE
  const changeLanguage = (lang) => {
    setLanguage(lang);
    if (user) {
      const updated = { ...user, language: lang };
      setUser(updated);
      localStorage.setItem("user", JSON.stringify(updated));
    }
  };

  // UPDATE NOTIFICATION PREFERENCES
  const updateNotifications = (prefs) => {
    if (user) {
      const updated = {
        ...user,
        notifications: { ...user.notifications, ...prefs }
      };
      setUser(updated);
      localStorage.setItem("user", JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        register,
        updateUser,
        updateVerificationStatus,
        language,
        changeLanguage,
        updateNotifications,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
