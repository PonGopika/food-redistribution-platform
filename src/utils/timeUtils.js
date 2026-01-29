// src/utils/timeUtils.js

/**
 * Returns time left in HOURS (can be decimal)
 * @param {string | Date} expiryTime
 */
export const getTimeLeftInHours = (expiryTime) => {
  const now = new Date();
  const expiry = new Date(expiryTime);
  const diffMs = expiry - now;
  return diffMs / (1000 * 60 * 60);
};

/**
 * Returns formatted time left string
 * Example: "2h 15m"
 */
export const formatTimeLeft = (expiryTime) => {
  const diffMs = new Date(expiryTime) - new Date();

  if (diffMs <= 0) return "Expired";

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor(
    (diffMs % (1000 * 60 * 60)) / (1000 * 60)
  );

  return `${hours}h ${minutes}m`;
};
