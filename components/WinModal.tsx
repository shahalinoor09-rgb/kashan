
import React from 'react';
import { Trophy, RefreshCw } from 'lucide-react';

interface WinModalProps {
  moves: number;
  time: number;
  onRestart: () => void;
}

const WinModal: React.FC<WinModalProps> = ({ moves, time, onRestart }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center flex flex-col items-center border-8 border-indigo-100 scale-110">
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
          <Trophy className="w-12 h-12 text-yellow-500 animate-bounce" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Great Job!</h2>
        <p className="text-gray-500 mb-6">You matched them all!</p>
        
        <div className="flex gap-4 mb-8 w-full">
          <div className="flex-1 bg-indigo-50 p-4 rounded-2xl">
            <p className="text-xs text-indigo-400 uppercase font-bold tracking-wider">Moves</p>
            <p className="text-2xl font-bold text-indigo-600">{moves}</p>
          </div>
          <div className="flex-1 bg-indigo-50 p-4 rounded-2xl">
            <p className="text-xs text-indigo-400 uppercase font-bold tracking-wider">Time</p>
            <p className="text-2xl font-bold text-indigo-600">{formatTime(time)}</p>
          </div>
        </div>

        <button 
          onClick={onRestart}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <RefreshCw className="w-5 h-5" />
          Play Again
        </button>
      </div>
    </div>
  );
};

export default WinModal;
