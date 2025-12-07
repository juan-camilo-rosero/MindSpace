export interface Task {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  estimatedHours: number;
  cognitiveLoad: number; // 1-5
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  createdAt: string;
  completedAt: string | null;
}

export interface MoodLog {
  id: string;
  date: string;
  mood: number; // 1-5
  stressLevel: number; // 1-10
  energyLevel: number; // 1-10
  sleepHours: number;
  notes: string;
  timestamp: string;
}

export interface PomodoroSession {
  id: string;
  taskId: string | null;
  startTime: string;
  endTime: string;
  duration: number; // minutes
  completed: boolean;
}

export interface UserPreferences {
  name: string;
  grade: number; // 9-12
  theme: 'light' | 'dark';
  pomodoroWork: number;
  pomodoroBreak: number;
  notificationsEnabled: boolean;
  firstTimeUser: boolean;
}
