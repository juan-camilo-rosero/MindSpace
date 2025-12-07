import { Link } from 'react-router-dom';
import { Plus, Coffee } from 'lucide-react';

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Link to="/tasks" className="p-4 bg-primary/10 hover:bg-primary/20 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors group">
         <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
            <Plus size={20} />
         </div>
         <span className="text-sm font-medium text-primary">New Task</span>
      </Link>
      
      <Link to="/mood" className="p-4 bg-accent/10 hover:bg-accent/20 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors group">
         <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-accent shadow-sm group-hover:scale-110 transition-transform">
            <Plus size={20} />
         </div>
         <span className="text-sm font-medium text-accent">Log Mood</span>
      </Link>

      <Link to="/focus" className="p-4 bg-amber-50 hover:bg-amber-100 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors group">
         <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-amber-500 shadow-sm group-hover:scale-110 transition-transform">
            <Coffee size={20} />
         </div>
         <span className="text-sm font-medium text-amber-600">Focus Mode</span>
      </Link>
    </div>
  );
}
