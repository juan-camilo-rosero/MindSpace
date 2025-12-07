import { useState } from 'react';
import { useTasks } from '../../contexts/TaskContext';
import TaskItem from './TaskItem';
import { Filter, SortAsc } from 'lucide-react';

export default function TaskList() {
  const { tasks, toggleTaskCompletion, deleteTask } = useTasks();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('active');
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'load'>('date');

  const filteredTasks = tasks
    .filter(task => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      if (sortBy === 'priority') {
         const pMap = { high: 3, medium: 2, low: 1 };
         return pMap[b.priority] - pMap[a.priority];
      }
      if (sortBy === 'load') return b.cognitiveLoad - a.cognitiveLoad;
      return 0;
    });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg">
          {(['active', 'all', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                filter === f ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
           <div className="flex items-center gap-2 text-sm text-gray-500">
              <Filter size={16} />
              <span className="hidden sm:inline">Sort by:</span>
           </div>
           <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-sm border-none bg-transparent font-medium text-gray-700 cursor-pointer focus:ring-0"
           >
              <option value="date">Due Date</option>
              <option value="priority">Priority</option>
              <option value="load">Cognitive Load</option>
           </select>
           <SortAsc size={16} className="text-gray-400" />
        </div>
      </div>

      <div className="space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onToggle={toggleTaskCompletion} 
              onDelete={deleteTask}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
             <p className="text-gray-500">No tasks found</p>
          </div>
        )}
      </div>
    </div>
  );
}
