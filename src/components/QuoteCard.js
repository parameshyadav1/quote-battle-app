import React from "react";

function QuoteCard({ quote, onVote }) {
  return (
    <div className="quote-card" onClick={onVote}>
      <p>“{quote.quote}”</p>
      <span>- {quote.author}</span>
    </div>
  );
}

export default QuoteCard;
