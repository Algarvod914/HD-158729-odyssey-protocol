export interface GameState {
  currentLevel: number;
  unlockedLevels: number[];
  completedLevels: number[];
  infectionLevel: number;
  endingsUnlocked: string[];
  currentEnding?: 'A' | 'B' | 'C';
}

export interface LevelData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  puzzleType: PuzzleType;
  storyText: string[];
  hints: string[];
  infectionLevel: number;
}

export type PuzzleType = 
  | 'coordinate' 
  | 'frequency' 
  | 'difference' 
  | 'morse' 
  | 'repair' 
  | 'jigsaw' 
  | 'identity' 
  | 'code' 
  | 'timeloop' 
  | 'clue' 
  | 'sanity' 
  | 'firewall' 
  | 'final';

export interface PuzzleProps {
  onComplete: () => void;
  onFail?: () => void;
  infectionLevel?: number;
}
