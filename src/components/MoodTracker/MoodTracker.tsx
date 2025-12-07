import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useMood } from '../../contexts/MoodContext';
import MoodLogModal from './MoodLogModal';
import { format } from 'date-fns';
import clsx from 'clsx';

export default function MoodTracker() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { moodLogs } = useMood();

  // Sort logs most recent first
  const sortedLogs = [...moodLogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="max-w-4xl mx-auto">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Mood Tracker</h1>
          <p className="text-gray-500">Track your well-being over time.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-xl hover:bg-red-400 transition-colors shadow-sm font-medium"
        >
          <Plus size={20} />
          Log Mood
        </button>
      </header>
      
      {/* Recent Logs List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
         <div className="p-6 border-b border-gray-50">
            <h3 className="font-semibold text-gray-700">Recent Entries</h3>
         </div>
         
         {sortedLogs.length > 0 ? (
            <div className="divide-y divide-gray-50">
               {sortedLogs.map(log => (
                  <div key={log.id} className="p-6 flex items-start gap-6 hover:bg-gray-50/50 transition-colors">
                     <div className="flex-shrink-0 flex flex-col items-center">
                        <div className={clsx(
                           "w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-sm mb-1",
                           log.stressLevel <= 3 ? "bg-green-100" :
                           log.stressLevel <= 7 ? "bg-yellow-100" : "bg-red-100"
                        )}>
                           {log.stressLevel <= 3 ? '😊' : log.stressLevel <= 7 ? '😐' : '😫'}
                        </div>
                        <span className="text-xs font-medium text-gray-400">
                           {format(new Date(log.date), 'MMM d')}
                        </span>
                     </div>
                     
                     <div className="flex-1">
                        <div className="flex flex-wrap gap-4 mb-2 text-sm">
                           <div className="flex items-center gap-2">
                              <span className="text-gray-500">Stress:</span>
                              <div className="h-2 w-16 bg-gray-100 rounded-full overflow-hidden">
                                 <div className="h-full bg-secondary" style={{width: `${log.stressLevel * 10}%`}} />
                              </div>
                           </div>
                           <div className="flex items-center gap-2">
                              <span className="text-gray-500">Energy:</span>
                              <div className="h-2 w-16 bg-gray-100 rounded-full overflow-hidden">
                                 <div className="h-full bg-primary" style={{width: `${log.energyLevel * 10}%`}} />
                              </div>
                           </div>
                           <div className="flex items-center gap-2 text-gray-500">
                              <span>Sleep:</span>
                              <span className="font-medium text-gray-800">{log.sleepHours}h</span>
                           </div>
                        </div>
                        
                        {log.notes && (
                           <p className="text-gray-600 bg-gray-50 p-3 rounded-lg text-sm italic">
                              "{log.notes}"
                           </p>
                        )}
                        
                        <div className="text-xs text-gray-400 mt-2">
                           {format(new Date(log.date), 'h:mm a')}
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         ) : (
            <div className="p-12 text-center text-gray-400">
               <p>No mood logs yet. Start by adding one!</p>
            </div>
         )}
      </div>

      <MoodLogModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

