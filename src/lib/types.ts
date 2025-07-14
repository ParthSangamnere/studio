export type PlayerSymbol = 'X' | 'O';
export type SquareValue = PlayerSymbol | null;
export type BoardState = SquareValue[];
export type GameMode = 'cpu' | '1v1' | null;
export type Difficulty = 'easy' | 'medium' | 'hard' | null;
export type GameStatus = 'playing' | 'draw' | 'win';

export type HistoryEntry = {
  id: string;
  opponent: string;
  result: 'win' | 'loss' | 'draw';
  points: number;
  date: string;
};

export type PlayerData = {
  username: string;
  points: number;
  history: HistoryEntry[];
};

export type Character = {
  id: string;
  name: string;
  avatarUrl: string;
  'data-ai-hint'?: string;
};
