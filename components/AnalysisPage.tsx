import React, { useMemo } from 'react';
import { useVisions } from '../hooks/useVisions.tsx';
import { Vision } from '../types.ts';

const AnalysisPage: React.FC = () => {
  const { visions, points, rewards } = useVisions();

  const stats = useMemo(() => {
    const totalVisions = visions.length;
    const today = new Date().toDateString();
    const completedToday = visions.filter((v) => v.completedDates.includes(today)).length;

    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toDateString();
    });

    const weeklyData = last7Days.map((date) => {
      const count = visions.filter((v) => v.completedDates.includes(date)).length;
      return { date: new Date(date).toLocaleDateString('en', { weekday: 'short' }), count };
    }).reverse();

    const totalCompletions = visions.reduce((sum, v) => sum + v.completedDates.length, 0);
    const avgCompletion = totalVisions > 0 ? Math.round((totalCompletions / totalVisions) * 10) / 10 : 0;

    const bestVision = visions.reduce<Vision | null>((best, v) => {
      if (!best || v.completedDates.length > best.completedDates.length) return v;
      return best;
    }, null);

    return { totalVisions, completedToday, weeklyData, totalCompletions, avgCompletion, bestVision };
  }, [visions]);

  const maxCount = Math.max(...stats.weeklyData.map((d) => d.count), 1);

  return (
    <div className="p-5 space-y-6">
      <h2 className="font-montserrat text-3xl font-bold text-center" style={{ color: 'var(--heading-color)' }}>Progress Analysis</h2>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-xl text-center" style={{ backgroundColor: 'var(--card-bg)' }}>
          <p className="text-3xl font-bold" style={{ color: 'var(--heading-color)' }}>{stats.totalVisions}</p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-color-dim)' }}>Total Visions</p>
        </div>
        <div className="p-4 rounded-xl text-center" style={{ backgroundColor: 'var(--card-bg)' }}>
          <p className="text-3xl font-bold" style={{ color: 'var(--heading-color)' }}>{stats.totalCompletions}</p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-color-dim)' }}>Total Completions</p>
        </div>
        <div className="p-4 rounded-xl text-center" style={{ backgroundColor: 'var(--card-bg)' }}>
          <p className="text-3xl font-bold" style={{ color: 'var(--heading-color)' }}>{points}</p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-color-dim)' }}>Points Earned</p>
        </div>
        <div className="p-4 rounded-xl text-center" style={{ backgroundColor: 'var(--card-bg)' }}>
          <p className="text-3xl font-bold" style={{ color: 'var(--heading-color)' }}>{rewards.length}</p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-color-dim)' }}>Rewards</p>
        </div>
      </div>

      <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--card-bg)' }}>
        <h3 className="font-semibold mb-4" style={{ color: 'var(--heading-color)' }}>Last 7 Days</h3>
        <div className="flex items-end justify-between gap-2 h-32">
          {stats.weeklyData.map((d, i) => (
            <div key={i} className="flex flex-col items-center flex-1">
              <div
                className="w-full rounded-t-md transition-all"
                style={{
                  height: `${(d.count / maxCount) * 100}%`,
                  minHeight: '4px',
                  backgroundColor: 'var(--primary-color)',
                  opacity: d.count > 0 ? 1 : 0.3,
                }}
              />
              <span className="text-xs mt-1" style={{ color: 'var(--text-color-dim)' }}>{d.date}</span>
            </div>
          ))}
        </div>
      </div>

      {stats.bestVision && (
        <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--card-bg)' }}>
          <h3 className="font-semibold mb-2" style={{ color: 'var(--heading-color)' }}>🌟 Top Vision</h3>
          <p className="text-sm">
            <span className="font-semibold">{stats.bestVision.name}</span> — {stats.bestVision.completedDates.length} completions
          </p>
        </div>
      )}

      {stats.totalVisions === 0 && (
        <p className="text-center text-sm" style={{ color: 'var(--text-color-dim)' }}>
          Add visions to see your progress analysis!
        </p>
      )}
    </div>
  );
};

export default AnalysisPage;
