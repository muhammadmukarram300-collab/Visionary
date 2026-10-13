import React, { useState } from 'react';
import { useVisions } from '../hooks/useVisions.tsx';

const HistoryPage: React.FC = () => {
  const { visions, rewards, addReward, removeReward, points } = useVisions();
  const [rewardName, setRewardName] = useState('');

  const handleAddReward = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rewardName.trim()) return;
    addReward(rewardName.trim());
    setRewardName('');
  };

  return (
    <div className="p-5 space-y-6">
      <h2 className="font-montserrat text-3xl font-bold text-center" style={{ color: 'var(--heading-color)' }}>History & Rewards</h2>

      <div className="p-4 rounded-xl text-center" style={{ backgroundColor: 'var(--card-bg)' }}>
        <p className="text-4xl font-bold" style={{ color: 'var(--heading-color)' }}>{points}</p>
        <p className="text-sm mt-1" style={{ color: 'var(--text-color-dim)' }}>Total Points Earned</p>
      </div>

      <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--card-bg)' }}>
        <h3 className="font-semibold mb-3" style={{ color: 'var(--heading-color)' }}>Vision Completion History</h3>
        {visions.length === 0 ? (
          <p className="text-sm text-center" style={{ color: 'var(--text-color-dim)' }}>No vision history yet.</p>
        ) : (
          <div className="space-y-2">
            {visions.map((v) => (
              <div key={v.id} className="flex justify-between items-center text-sm">
                <span>{v.name}</span>
                <span style={{ color: 'var(--text-color-dim)' }}>{v.completedDates.length} days</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--card-bg)' }}>
        <h3 className="font-semibold mb-3" style={{ color: 'var(--heading-color)' }}>🎁 Rewards</h3>
        <form onSubmit={handleAddReward} className="flex gap-2 mb-3">
          <input
            type="text"
            value={rewardName}
            onChange={(e) => setRewardName(e.target.value)}
            placeholder="Reward name (e.g., Movie night)"
            className="flex-1 p-2 rounded-lg outline-none text-sm"
            style={{ backgroundColor: 'var(--input-bg)', color: 'var(--text-color)', border: '1px solid var(--text-color-dim)' }}
          />
          <button type="submit" className="px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: 'var(--primary-color)' }}>
            Add
          </button>
        </form>
        {rewards.length === 0 ? (
          <p className="text-sm text-center" style={{ color: 'var(--text-color-dim)' }}>No rewards yet. Treat yourself!</p>
        ) : (
          <div className="space-y-2">
            {rewards.map((r) => (
              <div key={r.id} className="flex justify-between items-center p-2 rounded-lg text-sm" style={{ backgroundColor: 'var(--input-bg)' }}>
                <span>🎁 {r.name}</span>
                <button onClick={() => removeReward(r.id)} className="text-red-400 text-xs">Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
