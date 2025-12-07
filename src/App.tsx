import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { TaskProvider } from './contexts/TaskContext';
import { MoodProvider } from './contexts/MoodContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import TaskManager from './components/TaskManager/TaskManager';
import MoodTracker from './components/MoodTracker/MoodTracker';
import PomodoroTimer from './components/PomodoroTimer/PomodoroTimer';
import MindfulnessCenter from './components/MindfulnessCenter/MindfulnessCenter';
import Community from './components/Community/Community';
import Settings from './components/Settings/Settings';

function App() {
  return (
    <UserProvider>
      <TaskProvider>
        <MoodProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="tasks" element={<TaskManager />} />
                <Route path="mood" element={<MoodTracker />} />
                <Route path="focus" element={<PomodoroTimer />} />
                <Route path="mindfulness" element={<MindfulnessCenter />} />
                <Route path="community" element={<Community />} />
                <Route path="settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </MoodProvider>
      </TaskProvider>
    </UserProvider>
  );
}

export default App;
