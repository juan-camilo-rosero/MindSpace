import { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

const QUOTES = [
  { text: "Breathe. You're doing the best you can.", author: "Unknown" },
  { text: "It's a bad day, not a bad life.", author: "Unknown" },
  { text: "Your mental health is a priority.", author: "Unknown" },
  { text: "Progress, not perfection.", author: "Unknown" },
  { text: "Taking a break is part of the work.", author: "Unknown" }
];

export default function QuoteCard() {
  const [quote, setQuote] = useState(QUOTES[0]);

  useEffect(() => {
    // Random quote on mount
    const random = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    setQuote(random);
  }, []);

  return (
    <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-6 rounded-2xl border border-primary/10">
      <Quote className="text-primary mb-3 opacity-50" size={24} />
      <p className="text-lg font-medium text-gray-800 mb-2 font-serif italic">
        "{quote.text}"
      </p>
      <p className="text-sm text-gray-500 text-right">— {quote.author}</p>
    </div>
  );
}
