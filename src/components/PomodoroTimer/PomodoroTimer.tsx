import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee, Brain } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import clsx from 'clsx';

export default function PomodoroTimer() {
  const { user } = useUser();
  const [timeLeft, setTimeLeft] = useState(user.pomodoroWork * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');
  
  // Update time when settings change
  useEffect(() => {
    setTimeLeft(mode === 'work' ? user.pomodoroWork * 60 : user.pomodoroBreak * 60);
    setIsActive(false);
  }, [user.pomodoroWork, user.pomodoroBreak, mode]);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Optional: Sound here
      const nextMode = mode === 'work' ? 'break' : 'work';
      setMode(nextMode);
      // Auto-switch time but don't auto-start
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'work' ? user.pomodoroWork * 60 : user.pomodoroBreak * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = 100 - (timeLeft / ((mode === 'work' ? user.pomodoroWork : user.pomodoroBreak) * 60)) * 100;

  return (
    <div className="max-w-md mx-auto mt-8">
       <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header / Mode Switcher */}
          <div className="flex border-b border-gray-100">
             <button 
                onClick={() => setMode('work')}
                className={clsx(
                   "flex-1 py-4 font-medium text-sm flex items-center justify-center gap-2 transition-colors",
                   mode === 'work' ? "bg-primary/5 text-primary" : "text-gray-400 hover:text-gray-600"
                )}
             >
                <Brain size={18} />
                Focus
             </button>
             <button 
                onClick={() => setMode('break')}
                className={clsx(
                   "flex-1 py-4 font-medium text-sm flex items-center justify-center gap-2 transition-colors",
                   mode === 'break' ? "bg-accent/10 text-accent" : "text-gray-400 hover:text-gray-600"
                )}
             >
                <Coffee size={18} />
                Break
             </button>
          </div>

          <div className="p-12 flex flex-col items-center justify-center relative">
             {/* Progress Ring Background */}
             <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent pointer-events-none" />
             
             <div className="relative z-10 mb-8">
                <div className={clsx(
                   "text-8xl font-bold font-mono tracking-tighter tabular-nums transition-colors duration-500",
                   isActive ? (mode === 'work' ? "text-gray-800" : "text-accent") : "text-gray-300"
                )}>
                   {formatTime(timeLeft)}
                </div>
                <div className="text-center text-gray-400 font-medium mt-2 capitalize">
                   {isActive ? (mode === 'work' ? "Stay Focused" : "Relax & Recharge") : "Ready to Start?"}
                </div>
             </div>

             <div className="flex items-center gap-4 relative z-10">
                <button
                   onClick={toggleTimer}
                   className={clsx(
                      "w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95",
                      isActive 
                        ? "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50" 
                        : "bg-primary text-white hover:bg-teal-500"
                   )}
                >
                   {isActive ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
                </button>
                
                <button
                   onClick={resetTimer}
                   className="w-12 h-12 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                >
                   <RotateCcw size={20} />
                </button>
             </div>
          </div>
          
          {/* Progress Bar */}
          <div className="h-1.5 bg-gray-100 w-full">
             <div 
                className={clsx("h-full transition-all duration-1000", mode === 'work' ? "bg-primary" : "bg-accent")} 
                style={{ width: `${progress}%` }} 
             />
          </div>
       </div>

       <div className="text-center mt-8 text-sm text-gray-400">
          <p>Tip: 25 minutes of work, followed by a 5 minute break.</p>
       </div>
    </div>
  );
}
