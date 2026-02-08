import React from "react";

export default function Leaderboard({ leaderboard }) {
  return (
    <div>
      <h3>Top Donors</h3>
      <ul>
        {leaderboard.map((donor, index) => (
          <li key={index}>
            {donor.name} — {donor.count}
          </li>
        ))}
      </ul>
    </div>
  );
}
