
import React from 'react';
import { CardData } from '../types';

interface CardProps {
  card: CardData;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: (card: CardData) => void;
  disabled: boolean;
}

const Card: React.FC<CardProps> = ({ card, isFlipped, isMatched, onClick, disabled }) => {
  const showFront = isFlipped || isMatched;

  return (
    <div 
      className={`relative aspect-square cursor-pointer perspective-1000 transition-transform duration-300 hover:scale-105 active:scale-95`}
      onClick={() => !disabled && !showFront && onClick(card)}
    >
      <div 
        className={`w-full h-full duration-500 transform-style-3d relative transition-all ${showFront ? 'rotate-y-180' : ''}`}
      >
        {/* Back of card (facing user initially) */}
        <div className="absolute inset-0 bg-indigo-500 rounded-xl shadow-lg flex items-center justify-center backface-hidden border-4 border-white">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-indigo-400 rounded-full opacity-50 flex items-center justify-center">
            <span className="text-white text-3xl font-bold opacity-30">?</span>
          </div>
        </div>

        {/* Front of card (reveals image) */}
        <div className={`absolute inset-0 bg-white rounded-xl shadow-lg flex items-center justify-center backface-hidden rotate-y-180 border-4 ${isMatched ? 'border-green-400 opacity-90' : 'border-indigo-200'}`}>
          <div className="p-4 w-full h-full flex items-center justify-center">
            {card.icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
