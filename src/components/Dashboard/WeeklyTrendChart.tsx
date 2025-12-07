import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useMood } from '../../contexts/MoodContext';

export default function WeeklyTrendChart() {
  const { moodLogs } = useMood();

  // Process data for chart (last 7 logs or days)
  const data = moodLogs.slice(-7).map(log => ({
    name: new Date(log.date).toLocaleDateString('en-US', { weekday: 'short' }),
    stress: log.stressLevel,
    energy: log.energyLevel
  }));

  if (data.length === 0) {
     return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center h-64">
           <p className="text-gray-400">Log your mood to see trends here</p>
        </div>
     )
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-700 mb-6">Weekly Trends</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF6B6B" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#FF6B6B" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
            <YAxis hide domain={[0, 10]} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Area 
              type="monotone" 
              dataKey="stress" 
              stroke="#FF6B6B" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorStress)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
