import React, { useState } from 'react';
import { QUOTES } from '../constants.ts';
import { useVisions } from '../hooks/useVisions.tsx';

const MindsetPage: React.FC = () => {
  const { visions, toggleVisionCompletion } = useVisions();
  const [reflection, setReflection] = useState('');
  const [reflections, setReflections] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('visionaryReflections');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const today = new Date().toDateString();
  const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

  const completedToday = visions.filter((v) => v.completedDates.includes(today)).length;

  const saveReflection = () => {
    if (!reflection.trim()) return;
    const updated = [reflection, ...reflections];
    setReflections(updated);
    localStorage.setItem('visionaryReflections', JSON.stringify(updated));
    setReflection('');
  };

  return (
    <div className="p-5 space-y-6">
      <h2 className="font-montserrat text-3xl font-bold text-center" style={{ color: 'var(--heading-color)' }}>Mindset</h2>

      <div className="p-4 rounded-xl text-center" style={{ backgroundColor: 'var(--card-bg)' }}>
        <p className="text-sm italic" style={{ color: 'var(--text-color-dim)' }}>{quote}</p>
      </div>

      <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--card-bg)' }}>
        <h3 className="font-semibold mb-3" style={{ color: 'var(--heading-color)' }}>Daily Reflection</h3>
        <p className="text-sm mb-3" style={{ color: 'var(--text-color-dim)' }}>
          You've completed {completedToday} of {visions.length} visions today. Take a moment to reflect.
        </p>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="What went well today? What can you improve tomorrow?"
          className="w-full p-2.5 rounded-lg h-24 outline-none resize-none"
          style={{ backgroundColor: 'var(--input-bg)', color: 'var(--text-color)', border: '1px solid var(--text-color-dim)' }}
        />
        <button
          onClick={saveReflection}
          className="w-full mt-2 py-2.5 rounded-lg font-semibold text-white"
          style={{ backgroundColor: 'var(--primary-color)' }}
        >
          Save Reflection
        </button>
      </div>

      {reflections.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold" style={{ color: 'var(--heading-color)' }}>Past Reflections</h3>
          {reflections.map((r, i) => (
            <div key={i} className="p-3 rounded-xl text-sm" style={{ backgroundColor: 'var(--card-bg)' }}>
              {r}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MindsetPage;
