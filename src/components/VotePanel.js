import React, { useEffect, useState } from "react";
import QuoteCard from "./QuoteCard";

const fetchQuotes = async () => {
  try {
    const res = await fetch("https://dummyjson.com/quotes");
    const data = await res.json();
    return data.quotes;
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return [];
  }
};

const getTwoRandomQuotes = (quotes) => {
  if (quotes.length < 2) return [null, null];
  const shuffled = [...quotes].sort(() => 0.5 - Math.random());
  return [shuffled[0], shuffled[1]];
};

function VotePanel({ onVote, onSkip }) {
  const [quotes, setQuotes] = useState([]);
  const [quoteA, setQuoteA] = useState(null);
  const [quoteB, setQuoteB] = useState(null);

  useEffect(() => {
    const loadQuotes = async () => {
      const data = await fetchQuotes();
      setQuotes(data);
      const [a, b] = getTwoRandomQuotes(data);
      setQuoteA(a);
      setQuoteB(b);
    };
    loadQuotes();
  }, []);

  const handleVote = (quote) => {
    onVote(quote);
    const [a, b] = getTwoRandomQuotes(quotes);
    setQuoteA(a);
    setQuoteB(b);
  };

  const skipQuotes = () => {
    const [a, b] = getTwoRandomQuotes(quotes);
    setQuoteA(a);
    setQuoteB(b);
    if (onSkip) onSkip();
  };

  return (
    <div className="vote-panel">
      <div className="quotes-container">
        {quoteA && quoteB && (
          <>
            <QuoteCard quote={quoteA} onVote={() => handleVote(quoteA)} />
            <span className="vs">VS</span>
            <QuoteCard quote={quoteB} onVote={() => handleVote(quoteB)} />
          </>
        )}
      </div>
      <button className="referee-button" onClick={skipQuotes}>
        ⏭ Refresh (Skip)
      </button>
    </div>
  );
}

export default VotePanel;
