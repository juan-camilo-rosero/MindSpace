import { clsx } from 'clsx';
import { Brain } from 'lucide-react';

export default function CognitiveLoadBadge({ level }: { level: number }) {
  const styles = {
    1: 'bg-green-100 text-green-700 border-green-200',
    2: 'bg-teal-100 text-teal-700 border-teal-200',
    3: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    4: 'bg-orange-100 text-orange-700 border-orange-200',
    5: 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <div className={clsx(
      "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
      styles[level as keyof typeof styles] || styles[1]
    )}>
      <Brain size={12} />
      <span>Load: {level}</span>
    </div>
  );
}
