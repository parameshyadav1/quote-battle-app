import React, { useEffect, useState } from "react";
import VotePanel from "./components/VotePanel";
import Leaderboard from "./components/Leaderboard";

function App() {
  const [votes, setVotes] = useState(() => {
    return JSON.parse(localStorage.getItem("quoteVotes")) || {};
  });
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    localStorage.setItem("quoteVotes", JSON.stringify(votes));
  }, [votes]);

  const handleVote = (quote) => {
    const updatedVotes = {
      ...votes,
      [quote.id]: {
        ...quote,
        count: (votes[quote.id]?.count || 0) + 1,
      },
    };
    setVotes(updatedVotes);
    setRefreshKey(prev => prev + 1);
  };

  const handleSkip = () => {
    setRefreshKey(prev => prev + 1);
  };

  const resetVotes = () => {
    setVotes({});
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="app">
      <h1>🗳️ Quote Battle</h1>
      <VotePanel onVote={handleVote} onSkip={handleSkip} />
      <Leaderboard votes={votes} key={refreshKey} onReset={resetVotes} />
    </div>
  );
}

export default App;
