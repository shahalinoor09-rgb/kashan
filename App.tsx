
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CardData, GameDifficulty, DIFFICULTY_CONFIG } from './types';
import { generateDeck } from './constants';
import Card from './components/Card';
import StatsBoard from './components/StatsBoard';
import WinModal from './components/WinModal';
import { RotateCcw, LayoutGrid } from 'lucide-react';

const App: React.FC = () => {
  const [difficulty, setDifficulty] = useState<GameDifficulty>(GameDifficulty.EASY);
  const [cards, setCards] = useState<CardData[]>([]);
  const [flippedCards, setFlippedCards] = useState<CardData[]>([]);
  const [matchedCards, setMatchedCards] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [gameStatus, setGameStatus] = useState<'IDLE' | 'PREVIEW' | 'PLAYING' | 'WON'>('IDLE');
  
  const timerRef = useRef<number | null>(null);

  const initGame = useCallback((diff: GameDifficulty) => {
    const config = DIFFICULTY_CONFIG[diff];
    const totalPairs = (config.rows * config.cols) / 2;
    const newDeck = generateDeck(totalPairs);
    
    setCards(newDeck);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTime(0);
    setGameStatus('PREVIEW');

    if (timerRef.current) clearInterval(timerRef.current);

    // Preview Period
    setTimeout(() => {
      setGameStatus('PLAYING');
      timerRef.current = window.setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }, config.previewTime);
  }, []);

  useEffect(() => {
    initGame(difficulty);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [difficulty, initGame]);

  const handleCardClick = (card: CardData) => {
    if (gameStatus !== 'PLAYING' || flippedCards.length >= 2 || flippedCards.some(f => f.uniqueId === card.uniqueId)) {
      return;
    }

    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      const [first, second] = newFlipped;

      if (first.id === second.id) {
        // Match!
        const newMatched = [...matchedCards, first.uniqueId, second.uniqueId];
        setMatchedCards(newMatched);
        setFlippedCards([]);

        if (newMatched.length === cards.length) {
          setGameStatus('WON');
          if (timerRef.current) clearInterval(timerRef.current);
        }
      } else {
        // No Match
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value as GameDifficulty);
  };

  const currentConfig = DIFFICULTY_CONFIG[difficulty];

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center">
      {/* Header */}
      <header className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-6">
            <LayoutGrid className="text-white w-7 h-7" />
          </div>
          <h1 className="text-4xl font-extrabold text-indigo-900 tracking-tight">MindMatch</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <select 
              value={difficulty} 
              onChange={handleDifficultyChange}
              className="appearance-none bg-white border-2 border-indigo-100 rounded-xl px-4 py-2 pr-10 font-bold text-indigo-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
              <option value={GameDifficulty.EASY}>Easy (4x3)</option>
              <option value={GameDifficulty.MEDIUM}>Medium (4x4)</option>
              <option value={GameDifficulty.HARD}>Hard (6x6)</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-indigo-400">
              ▼
            </div>
          </div>
          
          <button 
            onClick={() => initGame(difficulty)}
            className="p-3 bg-white border-2 border-indigo-100 rounded-xl text-indigo-600 hover:text-indigo-800 hover:border-indigo-300 transition-all shadow-sm active:scale-90"
            title="Restart Game"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Stats */}
      <StatsBoard moves={moves} time={time} />

      {/* Preview Notification */}
      {gameStatus === 'PREVIEW' && (
        <div className="mb-6 animate-pulse">
          <span className="bg-orange-100 text-orange-700 px-6 py-2 rounded-full font-bold border border-orange-200">
            Memorize the cards!
          </span>
        </div>
      )}

      {/* Game Grid */}
      <main 
        className="w-full max-w-4xl grid gap-4 p-4"
        style={{
          gridTemplateColumns: `repeat(${currentConfig.cols}, minmax(0, 1fr))`,
          maxWidth: difficulty === GameDifficulty.HARD ? '900px' : '700px'
        }}
      >
        {cards.map((card) => (
          <Card 
            key={card.uniqueId}
            card={card}
            isFlipped={gameStatus === 'PREVIEW' || flippedCards.some(f => f.uniqueId === card.uniqueId)}
            isMatched={matchedCards.includes(card.uniqueId)}
            onClick={handleCardClick}
            disabled={gameStatus !== 'PLAYING'}
          />
        ))}
      </main>

      {/* Win State */}
      {gameStatus === 'WON' && (
        <WinModal 
          moves={moves} 
          time={time} 
          onRestart={() => initGame(difficulty)} 
        />
      )}

      {/* Footer Info */}
      <footer className="mt-auto pt-12 pb-6 text-indigo-400 text-sm font-semibold flex flex-col items-center gap-2">
        <p>Match all the pairs to win!</p>
        <p className="opacity-50">Designed with Love for Curious Minds</p>
      </footer>
    </div>
  );
};

export default App;
