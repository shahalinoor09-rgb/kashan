
import { ReactNode } from 'react';

export interface CardData {
  id: number;
  uniqueId: string;
  icon: ReactNode;
  label: string;
}

export enum GameDifficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD'
}

export interface GameSettings {
  rows: number;
  cols: number;
  previewTime: number; // ms
}

export const DIFFICULTY_CONFIG: Record<GameDifficulty, GameSettings> = {
  [GameDifficulty.EASY]: { rows: 4, cols: 3, previewTime: 2000 },
  [GameDifficulty.MEDIUM]: { rows: 4, cols: 4, previewTime: 3000 },
  [GameDifficulty.HARD]: { rows: 6, cols: 6, previewTime: 5000 },
};
