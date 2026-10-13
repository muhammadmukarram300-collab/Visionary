import React, { useState } from 'react';
import { useVisions } from '../hooks/useVisions.tsx';
import { analyzeTextWithAIStream } from '../services/geminiService.ts';
import LoadingSpinner from './LoadingSpinner.tsx';
import { useTheme } from '../hooks/useTheme.tsx';

const PerformanceCoachPage: React.FC = () => {
  const { visions } = useVisions();
  const { theme } = useTheme();
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const today = new Date().toDateString();
  const completedToday = visions.filter((v) => v.completedDates.includes(today)).length;

  const getCoaching = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult('');
    let fullText = '';
    try {
      const context = `User's visions:\n${visions.map((v) => `- ${v.name}: ${v.description} (${v.completedDates.length} total completions)`).join('\n') || 'No visions set yet.'}\n\nToday's progress: ${completedToday}/${visions.length} visions completed.\n\nUser's question: ${input}`;
      const systemInstruction = 'You are a performance coach. Provide actionable, motivating, and specific advice to help the user improve their habits and achieve their visions. Respond in well-formatted markdown.';
      for await (const chunk of analyzeTextWithAIStream(context, systemInstruction)) {
        fullText += chunk;
        setResult(fullText);
      }
    } catch (e) {
      setResult('An error occurred while getting coaching advice.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 space-y-6">
      <h2 className="font-montserrat text-3xl font-bold text-center" style={{ color: 'var(--heading-color)' }}>Performance Coach</h2>

      <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--card-bg)' }}>
        <p className="text-sm mb-3" style={{ color: 'var(--text-color-dim)' }}>
          Ask your AI performance coach for personalized guidance on achieving your visions.
        </p>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g., How can I stay motivated when I miss a day? What should I focus on this week?"
          className="w-full p-2.5 rounded-lg h-24 outline-none resize-none"
          style={{ backgroundColor: 'var(--input-bg)', color: 'var(--text-color)', border: '1px solid var(--text-color-dim)' }}
        />
        <button
          onClick={getCoaching}
          disabled={loading || !input.trim()}
          className="w-full mt-2 py-3 rounded-xl font-semibold text-white transition-colors disabled:opacity-50"
          style={{ backgroundColor: 'var(--primary-color)' }}
        >
          {loading ? 'Coaching...' : 'Get Coaching'}
        </button>
      </div>

      <div className="p-4 rounded-xl min-h-[100px]" style={{ backgroundColor: 'var(--card-bg)' }}>
        {loading && !result ? <LoadingSpinner /> : (
          <div className={`whitespace-pre-wrap prose prose-sm max-w-none ${theme === 'dark' ? 'prose-invert' : ''}`}>
            {result || 'Your coaching advice will appear here.'}
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceCoachPage;
