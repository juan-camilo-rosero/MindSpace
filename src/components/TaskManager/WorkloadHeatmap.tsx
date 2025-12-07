import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTasks } from '../../contexts/TaskContext';
import { startOfWeek, addDays, format, isSameDay } from 'date-fns';

export default function WorkloadHeatmap() {
  const { tasks } = useTasks();

  // Generate data for current week
  const startObj = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday start
  
  const weekData = Array.from({ length: 7 }).map((_, i) => {
    const day = addDays(startObj, i);
    const dayTasks = tasks.filter(t => 
       !t.completed && isSameDay(new Date(t.dueDate), day)
    );
    
    // Cognitive load score: SUM(hours * load)
    const loadScore = dayTasks.reduce((acc, t) => acc + (t.estimatedHours * t.cognitiveLoad), 0);
    
    return {
      day: format(day, 'EEE'),
      fullDate: format(day, 'MMM d'),
      score: loadScore,
      count: dayTasks.length
    };
  });

  const getBarColor = (score: number) => {
    if (score === 0) return '#E5E7EB'; // gray-200
    if (score < 5) return '#51CF66'; // green
    if (score < 10) return '#FFD93D'; // yellow
    return '#FF6B6B'; // red
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 mb-6">
       <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-gray-700">Weekly Cognitive Load</h3>
          <div className="flex gap-2 text-xs text-gray-500">
             <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-success"></div>Light</div>
             <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-warning"></div>Moderate</div>
             <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-secondary"></div>Heavy</div>
          </div>
       </div>

       <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
             <BarChart data={weekData} margin={{top: 5, right: 0, left: -25, bottom: 0}}>
                <XAxis 
                   dataKey="day" 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{fontSize: 12, fill: '#9CA3AF'}}
                   dy={10}
                />
                <YAxis 
                   hide
                />
                <Tooltip 
                   cursor={{fill: '#F3F4F6'}}
                   contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="score" radius={[4, 4, 4, 4]} barSize={32}>
                  {weekData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
                  ))}
                </Bar>
             </BarChart>
          </ResponsiveContainer>
       </div>
    </div>
  );
}
