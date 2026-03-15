import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, Check, AlertTriangle, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlitchText } from '@/components/GlitchText';
import { levels } from '@/data/levels';
import { GameState } from '@/types/game';

interface MenuProps {
  gameState: GameState;
  onReset: () => void;
}

export const Menu: React.FC<MenuProps> = ({ gameState, onReset }) => {
  const navigate = useNavigate();

  const handleLevelClick = (levelId: number) => {
    if (gameState.unlockedLevels.includes(levelId)) {
      navigate(`/level/${levelId}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <Rocket className="text-cyan-400" size={32} />
          <h1 className="text-3xl md:text-4xl font-bold text-white font-mono">
            奥德赛2398号
          </h1>
        </div>
        <p className="text-white/60 font-mono text-sm">
          探索记录 - HD 158729 B 异常事件
        </p>
        {gameState.infectionLevel > 50 && (
          <div className="mt-2 text-red-400 text-xs font-mono animate-pulse">
            <AlertTriangle size={12} className="inline mr-1" />
            系统感染: {gameState.infectionLevel}%
          </div>
        )}
      </motion.div>

      {/* Level Grid */}
      <div className="grid grid-cols-4 md:grid-cols-5 gap-3 max-w-2xl w-full mb-8">
        {levels.map((level, index) => {
          const isUnlocked = gameState.unlockedLevels.includes(level.id);
          const isCompleted = gameState.completedLevels.includes(level.id);
          const infectionLevel = level.infectionLevel;

          return (
            <motion.button
              key={level.id}
              onClick={() => handleLevelClick(level.id)}
              disabled={!isUnlocked}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`aspect-square rounded-lg flex flex-col items-center justify-center gap-1 transition-all ${
                isCompleted
                  ? 'bg-green-500/20 border border-green-500/50'
                  : isUnlocked
                  ? infectionLevel > 50
                    ? 'bg-red-500/20 border border-red-500/50 hover:bg-red-500/30'
                    : 'bg-cyan-500/20 border border-cyan-500/50 hover:bg-cyan-500/30'
                  : 'bg-black/50 border border-white/10'
              }`}
              whileHover={isUnlocked ? { scale: 1.05 } : {}}
              whileTap={isUnlocked ? { scale: 0.95 } : {}}
            >
              {isCompleted ? (
                <Check size={20} className="text-green-400" />
              ) : isUnlocked ? (
                <span className={`text-lg font-bold font-mono ${
                  infectionLevel > 50 ? 'text-red-400' : 'text-cyan-400'
                }`}>
                  {level.id}
                </span>
              ) : (
                <Lock size={16} className="text-white/30" />
              )}
              <span className="text-[8px] text-white/40 uppercase">
                {isUnlocked ? level.subtitle : 'LOCKED'}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Progress */}
      <div className="w-full max-w-md mb-8">
        <div className="flex justify-between text-xs text-white/40 mb-2 font-mono">
          <span>进度</span>
          <span>{gameState.completedLevels.length}/13</span>
        </div>
        <div className="h-2 bg-black/50 rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${
              gameState.infectionLevel > 50 ? 'bg-red-500' : 'bg-cyan-500'
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${(gameState.completedLevels.length / 13) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Endings */}
      {gameState.endingsUnlocked.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <div className="text-white/40 text-xs mb-2 text-center font-mono">已解锁结局</div>
          <div className="flex gap-2 justify-center">
            {gameState.endingsUnlocked.map(ending => (
              <span
                key={ending}
                className={`px-3 py-1 rounded text-xs font-mono ${
                  ending === 'A' ? 'bg-red-500/20 text-red-400 border border-red-500/50' :
                  ending === 'B' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50' :
                  'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                }`}
              >
                结局 {ending}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Reset Button */}
      <Button
        onClick={onReset}
        variant="outline"
        className="border-white/20 text-white/40 hover:text-white/60 hover:border-white/40"
      >
        重置游戏
      </Button>

      {/* Footer */}
      <div className="absolute bottom-4 text-white/20 text-xs font-mono">
        星际联邦探索部 | 机密等级: OMEGA
      </div>
    </div>
  );
};
