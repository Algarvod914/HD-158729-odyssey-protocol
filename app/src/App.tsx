import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StarField } from '@/components/StarField';
import { ScanLine } from '@/components/ScanLine';
import { Menu } from '@/pages/Menu';
import { Level } from '@/pages/Level';
import { useGameState } from '@/hooks/useGameState';
import './App.css';

function App() {
  const { gameState, isLoaded, completeLevel, resetGame } = useGameState();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-cyan-400 font-mono animate-pulse">系统启动中...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <StarField />
        <ScanLine />
        
        <Routes>
          <Route 
            path="/" 
            element={<Menu gameState={gameState} onReset={resetGame} />} 
          />
          <Route 
            path="/level/:id" 
            element={<Level onComplete={completeLevel} gameState={gameState} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
