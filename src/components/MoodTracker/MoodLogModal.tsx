import { useState } from 'react';
import { X, Frown, Meh, Smile } from 'lucide-react'; // These might be used for the selector now
import { useMood } from '../../contexts/MoodContext';
import clsx from 'clsx';

interface MoodLogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MoodLogModal({ isOpen, onClose }: MoodLogModalProps) {
  const { addMoodLog } = useMood();
  const [mood, setMood] = useState(3); // 1-5
  const [stressLevel, setStressLevel] = useState(5);
  const [energyLevel, setEnergyLevel] = useState(5);
  const [note, setNote] = useState('');
  const [sleepHours, setSleepHours] = useState(7);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMoodLog({
      date: new Date().toISOString(),
      mood,
      stressLevel,
      energyLevel,
      sleepHours,
      notes: note
    });
    onClose();
    // Reset
    setMood(3);
    setStressLevel(5);
    setEnergyLevel(5);
    setNote('');
  };

  const moods = [
    { start: 1, icon: Frown, label: 'Awful', color: 'text-red-500 bg-red-50' },
    { start: 2, icon: Frown, label: 'Bad', color: 'text-orange-500 bg-orange-50' },
    { start: 3, icon: Meh, label: 'Okay', color: 'text-yellow-500 bg-yellow-50' },
    { start: 4, icon: Smile, label: 'Good', color: 'text-teal-500 bg-teal-50' },
    { start: 5, icon: Smile, label: 'Great', color: 'text-green-500 bg-green-50' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Log Your Mood</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* General Mood Selector */}
          <div className="flex justify-between gap-2">
            {moods.map((m) => (
              <button
                key={m.start}
                type="button"
                onClick={() => setMood(m.start)}
                className={clsx(
                  "flex-1 flex flex-col items-center gap-1 p-2 rounded-xl transition-all",
                  mood === m.start ? "ring-2 ring-primary bg-gray-50 scale-105" : "hover:bg-gray-50 opacity-60 hover:opacity-100"
                )}
              >
                <m.icon size={24} className={m.color.split(' ')[0]} />
                <span className="text-xs font-medium text-gray-600">{m.label}</span>
              </button>
            ))}
          </div>
          {/* Stress Slider */}
          <div>
            <div className="flex justify-between mb-2">
               <label className="text-sm font-medium text-gray-700">Stress Level</label>
               <span className={clsx(
                  "font-bold text-sm",
                  stressLevel < 4 ? "text-green-600" : stressLevel < 7 ? "text-yellow-600" : "text-red-500"
               )}>{stressLevel}/10</span>
            </div>
            <input 
              type="range" min="1" max="10" value={stressLevel} 
              onChange={e => setStressLevel(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-secondary"
            />
            <div className="flex justify-between mt-1 text-xs text-gray-400">
               <span>Zen</span>
               <span>Overwhelmed</span>
            </div>
          </div>

          {/* Energy Slider */}
          <div>
            <div className="flex justify-between mb-2">
               <label className="text-sm font-medium text-gray-700">Energy Level</label>
               <span className="font-bold text-sm text-primary">{energyLevel}/10</span>
            </div>
            <input 
              type="range" min="1" max="10" value={energyLevel} 
              onChange={e => setEnergyLevel(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
             <div className="flex justify-between mt-1 text-xs text-gray-400">
               <span>Exhausted</span>
               <span>Energized</span>
            </div>
          </div>
          
           {/* Sleep */}
           <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hours Slept</label>
              <input 
                 type="number" min="0" max="24" step="0.5"
                 value={sleepHours}
                 onChange={e => setSleepHours(Number(e.target.value))}
                 className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              />
           </div>

           {/* Notes */}
           <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quick Note (Optional)</label>
              <textarea 
                 rows={2}
                 value={note}
                 onChange={e => setNote(e.target.value)}
                 className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
                 placeholder="How are you feeling?"
              />
           </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-primary text-white font-bold hover:bg-teal-500 shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5"
          >
            Save Log
          </button>
        </form>
      </div>
    </div>
  );
}
