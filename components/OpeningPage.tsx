import React from 'react';
import { QUOTES } from '../constants.ts';

const OpeningPage: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <div className="mb-8 animate-fade-in">
        <div className="text-6xl mb-4">🎯</div>
        <h1 className="font-montserrat text-5xl font-extrabold mb-3" style={{ color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
          Visionary
        </h1>
        <p className="text-lg max-w-xs mx-auto" style={{ color: 'rgba(255,255,255,0.9)' }}>
          Become the visionary of your own life. Track your atomic visions, build positive habits, and reflect on your journey.
        </p>
      </div>

      <div className="mb-8 px-4 py-3 rounded-xl backdrop-blur-md" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
        <p className="text-sm italic" style={{ color: 'rgba(255,255,255,0.85)' }}>{randomQuote}</p>
      </div>

      <button
        onClick={onStart}
        className="px-12 py-4 rounded-full text-lg font-bold text-white shadow-lg transition-all hover:scale-105 active:scale-95"
        style={{ backgroundColor: 'var(--primary-color)' }}
      >
        Begin Your Journey
      </button>
    </div>
  );
};

export default OpeningPage;
