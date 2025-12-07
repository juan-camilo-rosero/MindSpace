import { Trash2, Clock, CalendarDays, CheckCircle2, Circle } from 'lucide-react';
import type { Task } from '../../types';
import CognitiveLoadBadge from './CognitiveLoadBadge';
import { format } from 'date-fns';
import clsx from 'clsx';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div className={clsx(
      "group flex items-start gap-4 p-4 bg-white border rounded-xl transition-all duration-200 hover:shadow-md",
      task.completed ? "border-gray-100 opacity-60" : "border-gray-200",
      isOverdue && !task.completed && "border-red-200 bg-red-50/10"
    )}>
      <button 
        onClick={() => onToggle(task.id)}
        className={clsx(
          "mt-1 transition-colors duration-200",
          task.completed ? "text-success" : "text-gray-300 hover:text-primary"
        )}
      >
        {task.completed ? <CheckCircle2 size={24} className="fill-success/10" /> : <Circle size={24} />}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className={clsx(
              "font-medium truncate pr-2 transition-all",
              task.completed ? "text-gray-500 line-through decoration-gray-300" : "text-gray-900"
            )}>
              {task.title}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mt-1.5">
               <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                  {task.subject}
               </span>
               <CognitiveLoadBadge level={task.cognitiveLoad} />
               <span className={clsx(
                 "text-xs px-2 py-0.5 rounded-md uppercase font-bold tracking-wider",
                 task.priority === 'high' ? "bg-red-100 text-red-600" :
                 task.priority === 'medium' ? "bg-yellow-100 text-yellow-600" :
                 "bg-blue-100 text-blue-600"
               )}>
                 {task.priority}
               </span>
            </div>
          </div>
          
          <button 
            onClick={() => onDelete(task.id)}
            className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1.5 hover:bg-red-50 rounded-lg"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
           <div className={clsx("flex items-center gap-1", isOverdue && "text-red-500 font-medium")}>
              <CalendarDays size={14} />
              {format(new Date(task.dueDate), 'MMM d, h:mm a')}
           </div>
           <div className="flex items-center gap-1">
              <Clock size={14} />
              {task.estimatedHours}h est.
           </div>
        </div>
      </div>
    </div>
  );
}
