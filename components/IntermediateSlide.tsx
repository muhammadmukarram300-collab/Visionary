import React from 'react';
import { QUOTES } from '../constants.ts';

const IntermediateSlide: React.FC = () => {
  const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <div className="text-5xl mb-6 animate-bounce">✨</div>
      <p className="intermediate-text-anim font-montserrat text-2xl font-bold mb-4">
        Preparing your vision...
      </p>
      <p className="text-sm italic max-w-xs" style={{ color: 'rgba(255,255,255,0.9)' }}>
        {randomQuote}
      </p>
    </div>
  );
};

export default IntermediateSlide;
