import { useUser } from '../../contexts/UserContext';
import StressLevelIndicator from './StressLevelIndicator';
import QuoteCard from './QuoteCard';
import WeeklyTrendChart from './WeeklyTrendChart';
import QuickActions from './QuickActions';
import TasksSnapshot from './TasksSnapshot';

export default function Dashboard() {
  const { user } = useUser();

  // Get greeting based on time of day
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          {greeting}, {user.name || 'Friend'}
        </h1>
        <p className="text-gray-500 mt-1">Let's find your balance today.</p>
      </header>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Main Stats) */}
        <div className="lg:col-span-2 space-y-6">
          <QuickActions />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StressLevelIndicator />
            <TasksSnapshot />
          </div>

          <WeeklyTrendChart />
        </div>

        {/* Right Column (Widgets) */}
        <div className="space-y-6">
          <QuoteCard />
          
          {/* Mindfulness Tip Widget */}
          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-6 rounded-2xl border border-teal-100">
             <h3 className="font-semibold text-teal-800 mb-2">Today's Tip</h3>
             <p className="text-sm text-teal-700 leading-relaxed">
                "The 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds to reduce eye strain."
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}

