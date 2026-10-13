import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme.tsx';
import { useVisions } from '../hooks/useVisions.tsx';
import { useConversationHistory } from '../hooks/useConversationHistory.tsx';
import { LOCAL_STORAGE_VISIONS_KEY, LOCAL_STORAGE_REWARDS_KEY, LOCAL_STORAGE_POINTS_KEY, LOCAL_STORAGE_THEME_KEY, LOCAL_STORAGE_CONVERSATIONS_KEY } from '../constants.ts';

const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { visions, rewards, points } = useVisions();
  const { conversations } = useConversationHistory();
  const [confirmReset, setConfirmReset] = useState(false);

  const handleReset = () => {
    const keys = [LOCAL_STORAGE_VISIONS_KEY, LOCAL_STORAGE_REWARDS_KEY, LOCAL_STORAGE_POINTS_KEY, LOCAL_STORAGE_THEME_KEY, LOCAL_STORAGE_CONVERSATIONS_KEY, 'visionaryReflections'];
    keys.forEach((k) => localStorage.removeItem(k));
    window.location.reload();
  };

  return (
    <div className="p-5 space-y-6">
      <h2 className="font-montserrat text-3xl font-bold text-center" style={{ color: 'var(--heading-color)' }}>Settings</h2>

      <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--card-bg)' }}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold" style={{ color: 'var(--heading-color)' }}>Theme</h3>
            <p className="text-sm" style={{ color: 'var(--text-color-dim)' }}>Switch between dark and light mode</p>
          </div>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-lg font-semibold text-white"
            style={{ backgroundColor: 'var(--primary-color)' }}
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>

      <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--card-bg)' }}>
        <h3 className="font-semibold mb-3" style={{ color: 'var(--heading-color)' }}>Your Data</h3>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between"><span>Visions</span><span style={{ color: 'var(--text-color-dim)' }}>{visions.length}</span></div>
          <div className="flex justify-between"><span>Rewards</span><span style={{ color: 'var(--text-color-dim)' }}>{rewards.length}</span></div>
          <div className="flex justify-between"><span>Points</span><span style={{ color: 'var(--text-color-dim)' }}>{points}</span></div>
          <div className="flex justify-between"><span>Conversations</span><span style={{ color: 'var(--text-color-dim)' }}>{conversations.length}</span></div>
        </div>
      </div>

      <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--card-bg)' }}>
        <h3 className="font-semibold mb-2" style={{ color: 'var(--heading-color)' }}>About</h3>
        <p className="text-sm" style={{ color: 'var(--text-color-dim)' }}>
          Visionary — Track your atomic visions, analyze your progress, and gain AI-powered insights into your mindset. Become the visionary of your own life.
        </p>
      </div>

      <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--card-bg)' }}>
        <h3 className="font-semibold mb-2 text-red-400">Danger Zone</h3>
        {confirmReset ? (
          <div className="space-y-2">
            <p className="text-sm" style={{ color: 'var(--text-color-dim)' }}>This will permanently delete all your data. Are you sure?</p>
            <div className="flex gap-2">
              <button onClick={handleReset} className="flex-1 py-2 rounded-lg bg-red-500 text-white font-semibold text-sm">Yes, Reset Everything</button>
              <button onClick={() => setConfirmReset(false)} className="px-4 py-2 rounded-lg bg-gray-500/50 text-sm">Cancel</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setConfirmReset(true)} className="w-full py-2.5 rounded-lg bg-red-500/70 text-white font-semibold text-sm">
            Reset All Data
          </button>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
