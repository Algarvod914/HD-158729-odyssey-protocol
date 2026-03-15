import { useState, useEffect, useCallback } from 'react';
import { GameState } from '@/types/game';

const STORAGE_KEY = 'hd158729_game_state';

const defaultState: GameState = {
  currentLevel: 1,
  unlockedLevels: [1],
  completedLevels: [],
  infectionLevel: 0,
  endingsUnlocked: []
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(defaultState);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setGameState(parsed);
      } catch (e) {
        console.error('Failed to parse game state:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    }
  }, [gameState, isLoaded]);

  const completeLevel = useCallback((levelId: number, ending?: 'A' | 'B' | 'C') => {
    setGameState(prev => {
      const newUnlocked = [...prev.unlockedLevels];
      const nextLevel = levelId + 1;
      
      if (nextLevel <= 13 && !newUnlocked.includes(nextLevel)) {
        newUnlocked.push(nextLevel);
      }

      const newCompleted = [...prev.completedLevels];
      if (!newCompleted.includes(levelId)) {
        newCompleted.push(levelId);
      }

      const levelInfection = Math.min(100, levelId * 8);

      return {
        ...prev,
        currentLevel: nextLevel,
        unlockedLevels: newUnlocked,
        completedLevels: newCompleted,
        infectionLevel: levelInfection,
        currentEnding: ending,
        endingsUnlocked: ending && !prev.endingsUnlocked.includes(ending) 
          ? [...prev.endingsUnlocked, ending] 
          : prev.endingsUnlocked
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState(defaultState);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const setCurrentLevel = useCallback((levelId: number) => {
    setGameState(prev => ({
      ...prev,
      currentLevel: levelId
    }));
  }, []);

  return {
    gameState,
    isLoaded,
    completeLevel,
    resetGame,
    setCurrentLevel
  };
};
