import { createContext, useContext, type ReactNode } from 'react';
import type { UserPreferences } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface UserContextType {
  user: UserPreferences;
  updateUser: (updates: Partial<UserPreferences>) => void;
}

const defaultUser: UserPreferences = {
  name: '',
  grade: 9,
  theme: 'light',
  pomodoroWork: 25,
  pomodoroBreak: 5,
  notificationsEnabled: true,
  firstTimeUser: true,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<UserPreferences>('mindspace_user', defaultUser);

  const updateUser = (updates: Partial<UserPreferences>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
