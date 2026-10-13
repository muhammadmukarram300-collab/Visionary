import React, { useEffect, useState } from 'react';

const VoiceVisualizer: React.FC<{ active: boolean }> = ({ active }) => {
  const [bars, setBars] = useState<number[]>(Array(20).fill(20));

  useEffect(() => {
    if (!active) {
      setBars(Array(20).fill(20));
      return;
    }
    const interval = setInterval(() => {
      setBars((prev) => prev.map(() => Math.random() * 80 + 20));
    }, 150);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="flex items-center justify-center gap-1 h-16 my-2">
      {bars.map((height, i) => (
        <div
          key={i}
          className="w-1.5 rounded-full bg-violet-400 transition-all duration-150"
          style={{ height: `${height}px` }}
        />
      ))}
    </div>
  );
};

export default VoiceVisualizer;
