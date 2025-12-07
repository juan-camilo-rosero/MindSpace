import clsx from 'clsx';
import { useMood } from '../../contexts/MoodContext';

export default function StressLevelIndicator() {
  const { moodLogs } = useMood();
  
  // Calculate current stress (last log or 0)
  const lastLog = moodLogs[moodLogs.length - 1];
  const currentStress = lastLog ? lastLog.stressLevel : 0;
  
  // Risk levels
  const getRiskLevel = (stress: number) => {
    if (stress <= 3) return { label: 'Low', color: 'bg-green-100 text-green-800', barColor: 'bg-success' };
    if (stress <= 7) return { label: 'Moderate', color: 'bg-yellow-100 text-yellow-800', barColor: 'bg-warning' };
    return { label: 'High', color: 'bg-red-100 text-red-800', barColor: 'bg-secondary' };
  };

  const risk = getRiskLevel(currentStress);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-700">Current Stress Level</h3>
        <span className={clsx('px-3 py-1 rounded-full text-sm font-medium', risk.color)}>
          {risk.label}
        </span>
      </div>

      <div className="flex items-end gap-2 mb-2">
        <span className="text-4xl font-bold text-gray-900">{currentStress}</span>
        <span className="text-gray-400 mb-1">/ 10</span>
      </div>

      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-4">
        <div 
          className={clsx('h-full transition-all duration-500', risk.barColor)} 
          style={{ width: `${currentStress * 10}%` }}
        />
      </div>

      <p className="text-sm text-gray-500">
        {currentStress > 7 
          ? "Take a deep breath. Use the mindfulness tools." 
          : "You're doing great! Keep maintaining your balance."}
      </p>
    </div>
  );
}
