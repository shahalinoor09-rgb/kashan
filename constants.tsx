
import React from 'react';
import { 
  Zap, Heart, Star, Moon, Sun, Ghost, 
  Crown, Gem, Rocket, Bug, Anchor, Coffee,
  Music, Camera, Gift, Cloud, PieChart, Umbrella
} from 'lucide-react';
import { CardData } from './types';

const RAW_ICONS = [
  { icon: <Zap className="w-full h-full text-yellow-500" />, label: 'Zap' },
  { icon: <Heart className="w-full h-full text-red-500" />, label: 'Heart' },
  { icon: <Star className="w-full h-full text-orange-400" />, label: 'Star' },
  { icon: <Moon className="w-full h-full text-blue-400" />, label: 'Moon' },
  { icon: <Sun className="w-full h-full text-yellow-600" />, label: 'Sun' },
  { icon: <Ghost className="w-full h-full text-purple-400" />, label: 'Ghost' },
  { icon: <Crown className="w-full h-full text-yellow-700" />, label: 'Crown' },
  { icon: <Gem className="w-full h-full text-blue-500" />, label: 'Gem' },
  { icon: <Rocket className="w-full h-full text-indigo-500" />, label: 'Rocket' },
  { icon: <Bug className="w-full h-full text-green-500" />, label: 'Bug' },
  { icon: <Anchor className="w-full h-full text-slate-600" />, label: 'Anchor' },
  { icon: <Coffee className="w-full h-full text-orange-800" />, label: 'Coffee' },
  { icon: <Music className="w-full h-full text-pink-500" />, label: 'Music' },
  { icon: <Camera className="w-full h-full text-gray-500" />, label: 'Camera' },
  { icon: <Gift className="w-full h-full text-red-400" />, label: 'Gift' },
  { icon: <Cloud className="w-full h-full text-blue-300" />, label: 'Cloud' },
  { icon: <PieChart className="w-full h-full text-cyan-500" />, label: 'Pie' },
  { icon: <Umbrella className="w-full h-full text-indigo-400" />, label: 'Umbrella' },
];

export const generateDeck = (count: number): CardData[] => {
  const selectedIcons = RAW_ICONS.slice(0, count);
  const deck: CardData[] = [];
  
  selectedIcons.forEach((item, index) => {
    // Add two of each
    deck.push({ ...item, id: index, uniqueId: `a-${index}` });
    deck.push({ ...item, id: index, uniqueId: `b-${index}` });
  });

  return shuffle(deck);
};

const shuffle = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
