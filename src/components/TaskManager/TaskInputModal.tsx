import { useState } from 'react';
import { X, Calendar, AlertCircle } from 'lucide-react';
import { useTasks } from '../../contexts/TaskContext';

interface TaskInputModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TaskInputModal({ isOpen, onClose }: TaskInputModalProps) {
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [estimatedHours, setEstimatedHours] = useState(1);
  const [cognitiveLoad, setCognitiveLoad] = useState(1);
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask({
      title,
      subject,
      dueDate,
      estimatedHours: Number(estimatedHours),
      cognitiveLoad: Number(cognitiveLoad), // Ensure number
      priority,
    });
    onClose();
    // Reset form
    setTitle('');
    setSubject('');
    setDueDate('');
    setEstimatedHours(1);
    setCognitiveLoad(1);
    setPriority('medium');
  };

  const loadDescriptions = [
    "Mindless work (copying notes)",
    "Light thinking (easy homework)",
    "Moderate focus (standard study)",
    "Heavy mental lifting (essay writing)",
    "Intense multitasking (timed practice)"
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Add New Task</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Task Name</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              placeholder="e.g. AP Bio Lab Report"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject / Category</label>
              <input
                type="text"
                required
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                placeholder="Math, English..."
              />
            </div>
            
            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <div className="relative">
                <input
                  type="datetime-local"
                  required
                  value={dueDate}
                  onChange={e => setDueDate(e.target.value)}
                  className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                />
                <Calendar className="absolute left-3 top-2.5 text-gray-400" size={16} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Est Hours */}
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estimated Hours <span className="text-xs text-gray-400">(for workload)</span>
              </label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                required
                value={estimatedHours}
                onChange={e => setEstimatedHours(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              />
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value as any)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          {/* Cognitive Load Slider */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
             <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                   Cognitive Load Rating
                   <div className="group relative">
                      <AlertCircle size={14} className="text-gray-400 cursor-help" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-800 text-white text-xs p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                         How mentally draining is this task?
                      </div>
                   </div>
                </label>
                <span className={`text-sm font-bold ${cognitiveLoad > 3 ? 'text-red-500' : 'text-green-600'}`}>
                   {cognitiveLoad}/5
                </span>
             </div>
             
             <input 
                type="range" 
                min="1" 
                max="5" 
                value={cognitiveLoad}
                onChange={e => setCognitiveLoad(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
             />
             
             <p className="text-xs text-gray-500 mt-2 text-center italic">
                "{loadDescriptions[cognitiveLoad - 1]}"
             </p>
          </div>

          <div className="pt-2 flex gap-3">
             <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
             >
                Cancel
             </button>
             <button
                type="submit"
                className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-teal-500 shadow-sm shadow-primary/30 transition-all hover:-translate-y-0.5"
             >
                Add Task
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
