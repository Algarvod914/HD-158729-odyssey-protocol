import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PuzzleProps } from '@/types/game';
import { Check, RotateCcw } from 'lucide-react';

const SEQUENCE_LENGTH = 5;
const SYMBOLS = ['◆', '●', '▲', '■', '★'];

export const TimeLoop: React.FC<PuzzleProps> = ({ onComplete }) => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [phase, setPhase] = useState<'show' | 'input' | 'success'>('show');
  const [showingIndex, setShowingIndex] = useState(-1);
  const [loopCount, setLoopCount] = useState(0);

  const generateSequence = useCallback(() => {
    return Array.from({ length: SEQUENCE_LENGTH }, () => Math.floor(Math.random() * SYMBOLS.length));
  }, []);

  useEffect(() => {
    const seq = generateSequence();
    setSequence(seq);
    showSequence(seq);
  }, [generateSequence]);

  const showSequence = async (seq: number[]) => {
    setPhase('show');
    setPlayerSequence([]);
    
    for (let i = 0; i < seq.length; i++) {
      await new Promise(r => setTimeout(r, 600));
      setShowingIndex(i);
      await new Promise(r => setTimeout(r, 400));
      setShowingIndex(-1);
    }
    
    await new Promise(r => setTimeout(r, 300));
    setPhase('input');
  };

  const handleSymbolClick = (index: number) => {
    if (phase !== 'input') return;

    const newPlayerSeq = [...playerSequence, index];
    setPlayerSequence(newPlayerSeq);

    if (newPlayerSeq[newPlayerSeq.length - 1] !== sequence[newPlayerSeq.length - 1]) {
      // Wrong - restart
      setLoopCount(c => c + 1);
      setPhase('show');
      setTimeout(() => showSequence(sequence), 500);
      return;
    }

    if (newPlayerSeq.length === sequence.length) {
      setPhase('success');
      setTimeout(onComplete, 1500);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-white/60 text-sm font-mono">
          时间循环 #{loopCount + 1}
        </div>
        {phase === 'input' && (
          <div className="text-cyan-400 text-sm font-mono">
            重复序列: {playerSequence.length}/{SEQUENCE_LENGTH}
          </div>
        )}
      </div>

      <div className="grid grid-cols-5 gap-3">
        {SYMBOLS.map((symbol, index) => (
          <motion.button
            key={index}
            onClick={() => handleSymbolClick(index)}
            disabled={phase !== 'input'}
            className={`aspect-square rounded-lg flex items-center justify-center text-2xl transition-all ${
              phase === 'show' && showingIndex >= 0 && sequence[showingIndex] === index
                ? 'bg-cyan-400 text-black scale-110'
                : phase === 'input'
                ? 'bg-white/10 hover:bg-cyan-500/30 text-white cursor-pointer'
                : 'bg-white/5 text-white/30'
            }`}
            whileHover={phase === 'input' ? { scale: 1.1 } : {}}
            whileTap={phase === 'input' ? { scale: 0.9 } : {}}
          >
            {symbol}
          </motion.button>
        ))}
      </div>

      {phase === 'show' && (
        <div className="text-center text-cyan-400 font-mono text-sm animate-pulse">
          观察序列...
        </div>
      )}

      {phase === 'input' && (
        <div className="text-center text-white/60 font-mono text-sm">
          重复刚才的序列
        </div>
      )}

      {phase === 'success' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-green-400 text-center font-mono"
        >
          <Check size={20} className="inline mr-2" />
          循环打破。但时间已经扭曲...
        </motion.div>
      )}

      <div className="flex items-center justify-center gap-2 text-white/30 text-xs">
        <RotateCcw size={12} />
        <span>每一次失败都会重启循环</span>
      </div>
    </div>
  );
};
