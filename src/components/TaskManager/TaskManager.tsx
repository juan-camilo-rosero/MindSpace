import { useState } from 'react';
import { Plus } from 'lucide-react';
import TaskList from './TaskList';
import TaskInputModal from './TaskInputModal';
import WorkloadHeatmap from './WorkloadHeatmap';

export default function TaskManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>
          <p className="text-gray-500">Organize your academic life and track cognitive load.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-teal-500 transition-colors shadow-sm font-medium"
        >
          <Plus size={20} />
          Add Task
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="md:col-span-2 space-y-6">
            <TaskList />
         </div>
         
         <div className="space-y-6">
            <WorkloadHeatmap />
            
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
               <h3 className="font-semibold text-blue-900 mb-2">Balance Tip</h3>
               <p className="text-sm text-blue-800">
                  Try to keep your daily cognitive load score under 15 to avoid burnout. Spread heavy tasks across multiple days.
               </p>
            </div>
         </div>
      </div>

      <TaskInputModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

