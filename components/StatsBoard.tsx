
import React from 'react';
import { Timer, Move } from 'lucide-react';

interface StatsBoardProps {
  moves: number;
  time: number;
}

const StatsBoard: React.FC<StatsBoardProps> = ({ moves, time }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex gap-4 md:gap-8 justify-center mb-6">
      <div className="bg-white px-6 py-2 rounded-full shadow-md flex items-center gap-2 border-2 border-indigo-100">
        <Move className="w-5 h-5 text-indigo-500" />
        <span className="font-bold text-gray-700">{moves} Moves</span>
      </div>
      <div className="bg-white px-6 py-2 rounded-full shadow-md flex items-center gap-2 border-2 border-indigo-100">
        <Timer className="w-5 h-5 text-indigo-500" />
        <span className="font-bold text-gray-700">{formatTime(time)}</span>
      </div>
    </div>
  );
};

export default StatsBoard;
