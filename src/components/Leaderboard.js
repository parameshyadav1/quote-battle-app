import React from "react";

function Leaderboard({ votes, onReset }) {
  const sortedQuotes = Object.values(votes)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return (
    <div className="leaderboard">
      <h2>🏆 Leaderboard</h2>
      <button className="reset-button" onClick={onReset}>
        🔄 Reset Votes
      </button>
      <ol>
        {sortedQuotes.map((q) => (
          <li key={q.id}>
            “{q.quote}” - <strong>{q.author}</strong> ({q.count} votes)
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Leaderboard;
