import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { PuzzleProps } from '@/types/game';
import { AlertTriangle, Check, Cpu } from 'lucide-react';

interface Module {
  id: number;
  x: number;
  y: number;
  fixed: boolean;
  error: boolean;
}

export const SystemRepair: React.FC<PuzzleProps> = ({ onComplete }) => {
  const [modules, setModules] = useState<Module[]>([]);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const initialModules: Module[] = [
      { id: 1, x: 20, y: 20, fixed: false, error: true },
      { id: 2, x: 50, y: 40, fixed: false, error: true },
      { id: 3, x: 80, y: 60, fixed: false, error: true },
    ];
    setModules(initialModules);
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !success && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !success) {
      setGameOver(true);
    }
  }, [timeLeft, success, gameOver]);

  useEffect(() => {
    const allFixed = modules.length > 0 && modules.every(m => m.fixed);
    if (allFixed && !success) {
      setSuccess(true);
      setTimeout(onComplete, 1500);
    }
  }, [modules, success, onComplete]);

  const fixModule = useCallback((id: number) => {
    setModules(prev => prev.map(m => 
      m.id === id ? { ...m, fixed: true, error: false } : m
    ));
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-red-400 font-mono flex items-center gap-2">
          <AlertTriangle size={16} />
          系统故障
        </div>
        <div className={`font-mono text-xl ${timeLeft <= 3 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
          {timeLeft}s
        </div>
      </div>

      <div className="relative h-48 bg-black/70 border border-red-500/30 rounded-lg overflow-hidden">
        {modules.map((module) => (
          <motion.button
            key={module.id}
            className={`absolute w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
              module.fixed 
                ? 'bg-green-500/20 border border-green-500' 
                : 'bg-red-500/20 border border-red-500 animate-pulse'
            }`}
            style={{ 
              left: `${module.x}%`, 
              top: `${module.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            onClick={() => !module.fixed && !gameOver && fixModule(module.id)}
            whileHover={{ scale: module.fixed ? 1 : 1.1 }}
            whileTap={{ scale: module.fixed ? 1 : 0.9 }}
          >
            {module.fixed ? (
              <Check size={20} className="text-green-400" />
            ) : (
              <Cpu size={20} className="text-red-400" />
            )}
          </motion.button>
        ))}

        {/* Glitch effect overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-red-500/30"
              style={{ 
                top: `${Math.random() * 100}%`,
                left: 0,
                right: 0 
              }}
              animate={{ 
                opacity: [0, 0.5, 0],
                x: [-10, 10, -10]
              }}
              transition={{ 
                duration: 0.2,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
        </div>
      </div>

      <div className="text-white/60 text-sm font-mono text-center">
        快速点击故障模块进行修复！
      </div>

      {gameOver && !success && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-center font-mono"
        >
          修复失败。系统即将崩溃...
          <button 
            onClick={() => window.location.reload()}
            className="block mx-auto mt-2 text-cyan-400 hover:underline"
          >
            重试
          </button>
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-green-400 text-center font-mono"
        >
          <Check size={20} className="inline mr-2" />
          系统修复完成。但有些东西改变了...
        </motion.div>
      )}
    </div>
  );
};
