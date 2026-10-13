import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Vision, Reward } from '../types.ts';
import { LOCAL_STORAGE_VISIONS_KEY, LOCAL_STORAGE_REWARDS_KEY, LOCAL_STORAGE_POINTS_KEY } from '../constants.ts';

interface VisionContextType {
  visions: Vision[];
  rewards: Reward[];
  points: number;
  addVision: (name: string, description: string) => void;
  removeVision: (id: string) => void;
  toggleVisionCompletion: (id: string, date: string) => void;
  addReward: (name: string) => void;
  removeReward: (id: string) => void;
}

const VisionContext = createContext<VisionContextType | undefined>(undefined);

export const VisionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visions, setVisions] = useState<Vision[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [points, setPoints] = useState<number>(0);

  useEffect(() => {
    try {
      const storedVisions = localStorage.getItem(LOCAL_STORAGE_VISIONS_KEY);
      if (storedVisions) setVisions(JSON.parse(storedVisions));
      const storedRewards = localStorage.getItem(LOCAL_STORAGE_REWARDS_KEY);
      if (storedRewards) setRewards(JSON.parse(storedRewards));
      const storedPoints = localStorage.getItem(LOCAL_STORAGE_POINTS_KEY);
      if (storedPoints) setPoints(parseInt(storedPoints, 10));
    } catch (e) {
      // ignore parse errors
    }
  }, []);

  const persistVisions = useCallback((updated: Vision[]) => {
    setVisions(updated);
    localStorage.setItem(LOCAL_STORAGE_VISIONS_KEY, JSON.stringify(updated));
  }, []);

  const persistRewards = useCallback((updated: Reward[]) => {
    setRewards(updated);
    localStorage.setItem(LOCAL_STORAGE_REWARDS_KEY, JSON.stringify(updated));
  }, []);

  const persistPoints = useCallback((updated: number) => {
    setPoints(updated);
    localStorage.setItem(LOCAL_STORAGE_POINTS_KEY, String(updated));
  }, []);

  const addVision = useCallback((name: string, description: string) => {
    const newVision: Vision = {
      id: crypto.randomUUID(),
      name,
      description,
      completedDates: [],
    };
    setVisions((prev) => {
      const updated = [...prev, newVision];
      localStorage.setItem(LOCAL_STORAGE_VISIONS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeVision = useCallback((id: string) => {
    setVisions((prev) => {
      const updated = prev.filter((v) => v.id !== id);
      localStorage.setItem(LOCAL_STORAGE_VISIONS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const toggleVisionCompletion = useCallback((id: string, date: string) => {
    setVisions((prev) => {
      const updated = prev.map((v) => {
        if (v.id !== id) return v;
        const has = v.completedDates.includes(date);
        return {
          ...v,
          completedDates: has
            ? v.completedDates.filter((d) => d !== date)
            : [...v.completedDates, date],
        };
      });
      localStorage.setItem(LOCAL_STORAGE_VISIONS_KEY, JSON.stringify(updated));
      // award points for completion
      const vision = prev.find((v) => v.id === id);
      if (vision) {
        const wasCompleted = vision.completedDates.includes(date);
        setPoints((p) => {
          const newPoints = wasCompleted ? p - 10 : p + 10;
          localStorage.setItem(LOCAL_STORAGE_POINTS_KEY, String(newPoints));
          return newPoints;
        });
      }
      return updated;
    });
  }, []);

  const addReward = useCallback((name: string) => {
    const newReward: Reward = {
      id: crypto.randomUUID(),
      name,
      date: new Date().toISOString(),
    };
    setRewards((prev) => {
      const updated = [...prev, newReward];
      localStorage.setItem(LOCAL_STORAGE_REWARDS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeReward = useCallback((id: string) => {
    setRewards((prev) => {
      const updated = prev.filter((r) => r.id !== id);
      localStorage.setItem(LOCAL_STORAGE_REWARDS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <VisionContext.Provider
      value={{ visions, rewards, points, addVision, removeVision, toggleVisionCompletion, addReward, removeReward }}
    >
      {children}
    </VisionContext.Provider>
  );
};

export const useVisions = () => {
  const ctx = useContext(VisionContext);
  if (!ctx) throw new Error('useVisions must be used within VisionProvider');
  return ctx;
};
