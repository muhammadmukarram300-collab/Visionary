import React, { useState } from 'react';
import { useVisions } from '../hooks/useVisions.tsx';
import { Page } from '../types.ts';

const HomePage: React.FC = () => {
  const { visions, addVision, removeVision, toggleVisionCompletion, points } = useVisions();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const today = new Date().toDateString();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addVision(name.trim(), description.trim());
    setName('');
    setDescription('');
    setShowForm(false);
  };

  return (
    <div className="p-5 space-y-6">
      <div className="text-center">
        <h2 className="font-montserrat text-3xl font-bold" style={{ color: 'var(--heading-color)' }}>Your Visions</h2>
        <div className="mt-2 inline-flex items-center gap-2 px-4 py-1.5 rounded-full" style={{ backgroundColor: 'var(--card-bg)' }}>
          <span className="text-sm">🏆</span>
          <span className="text-sm font-semibold">{points} points</span>
        </div>
      </div>

      {visions.length === 0 && !showForm && (
        <div className="text-center py-10">
          <p className="text-4xl mb-3">🌱</p>
          <p className="mb-4" style={{ color: 'var(--text-color-dim)' }}>Start by adding your first atomic vision!</p>
        </div>
      )}

      <div className="space-y-3">
        {visions.map((vision) => {
          const completedToday = vision.completedDates.includes(today);
          return (
            <div key={vision.id} className="p-4 rounded-xl shadow-lg" style={{ backgroundColor: 'var(--card-bg)' }}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg" style={{ color: 'var(--heading-color)' }}>{vision.name}</h3>
                  {vision.description && <p className="text-sm mt-1" style={{ color: 'var(--text-color-dim)' }}>{vision.description}</p>}
                  <p className="text-xs mt-2" style={{ color: 'var(--text-color-dim)' }}>
                    ✅ {vision.completedDates.length} {vision.completedDates.length === 1 ? 'day' : 'days'} completed
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => toggleVisionCompletion(vision.id, today)}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${completedToday ? 'bg-green-500 text-white' : 'bg-gray-500/50'}`}
                  >
                    {completedToday ? '✓ Done' : 'Mark'}
                  </button>
                  <button
                    onClick={() => removeVision(vision.id)}
                    className="px-3 py-1 rounded-lg text-xs bg-red-500/70 text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showForm ? (
        <form onSubmit={handleSubmit} className="p-4 rounded-xl space-y-3" style={{ backgroundColor: 'var(--card-bg)' }}>
          <h3 className="font-semibold" style={{ color: 'var(--heading-color)' }}>New Vision</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Vision name (e.g., Read 10 pages daily)"
            className="w-full p-2.5 rounded-lg outline-none"
            style={{ backgroundColor: 'var(--input-bg)', color: 'var(--text-color)', border: '1px solid var(--text-color-dim)' }}
            autoFocus
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            className="w-full p-2.5 rounded-lg h-20 outline-none resize-none"
            style={{ backgroundColor: 'var(--input-bg)', color: 'var(--text-color)', border: '1px solid var(--text-color-dim)' }}
          />
          <div className="flex gap-2">
            <button type="submit" className="flex-1 py-2.5 rounded-lg font-semibold text-white" style={{ backgroundColor: 'var(--primary-color)' }}>
              Add Vision
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 rounded-lg bg-gray-500/50">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="w-full py-3 rounded-xl font-semibold text-white transition-colors"
          style={{ backgroundColor: 'var(--primary-color)' }}
        >
          + Add New Vision
        </button>
      )}
    </div>
  );
};

export default HomePage;
