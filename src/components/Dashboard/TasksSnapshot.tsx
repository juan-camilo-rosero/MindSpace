import { useTasks } from '../../contexts/TaskContext';
import { Clock } from 'lucide-react';
import { format } from 'date-fns';

export default function TasksSnapshot() {
  const { tasks } = useTasks();
  
  // Get pending tasks, sorted by due date
  const pendingTasks = tasks
    .filter(t => !t.completed)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
       <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-700">Up Next</h3>
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Today</span>
       </div>

       <div className="space-y-3">
          {pendingTasks.length > 0 ? (
             pendingTasks.map(task => (
                <div key={task.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                   <div className={`w-2 h-2 rounded-full ${task.priority === 'high' ? 'bg-red-400' : 'bg-primary'}`} />
                   <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{task.title}</h4>
                      <p className="text-xs text-gray-500">{task.subject}</p>
                   </div>
                   <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock size={12} />
                      {format(new Date(task.dueDate), 'h:mm a')}
                   </div>
                </div>
             ))
          ) : (
             <div className="text-center py-6 text-gray-400">
                <p>No pending tasks</p>
             </div>
          )}
       </div>
    </div>
  );
}
