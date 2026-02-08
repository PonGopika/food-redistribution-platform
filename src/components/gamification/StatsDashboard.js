import React from "react";

export default function StatsDashboard({ stats }) {
  return (
    <div>
      <h3>Impact Stats</h3>
      <p>Total Donations: {stats.total_donations}</p>
      <p>Meals Saved: {stats.meals_saved}</p>
      <p>CO2 Saved: {stats.co2_saved}</p>
    </div>
  );
}
