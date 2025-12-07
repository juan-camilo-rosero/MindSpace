import { createContext, useContext, type ReactNode } from 'react';
import type { MoodLog } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface MoodContextType {
  moodLogs: MoodLog[];
  addMoodLog: (log: Omit<MoodLog, 'id' | 'timestamp'>) => void;
  getAverageStress: (days: number) => number;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export function MoodProvider({ children }: { children: ReactNode }) {
  const [moodLogs, setMoodLogs] = useLocalStorage<MoodLog[]>('mindspace_mood_logs', []);

  const addMoodLog = (newLog: Omit<MoodLog, 'id' | 'timestamp'>) => {
    const log: MoodLog = {
      ...newLog,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };
    setMoodLogs((prev) => [...prev, log]);
  };

  const getAverageStress = (days: number): number => {
    const now = new Date();
    const cutoff = new Date(now.setDate(now.getDate() - days));
    
    const recentLogs = moodLogs.filter(log => new Date(log.date) >= cutoff);
    if (recentLogs.length === 0) return 0;
    
    const totalStress = recentLogs.reduce((sum, log) => sum + log.stressLevel, 0);
    return totalStress / recentLogs.length;
  };

  return (
    <MoodContext.Provider value={{ moodLogs, addMoodLog, getAverageStress }}>
      {children}
    </MoodContext.Provider>
  );
}

export function useMood() {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
}
