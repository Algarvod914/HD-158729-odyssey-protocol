import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PuzzleProps } from '@/types/game';
import { Check, Puzzle } from 'lucide-react';

interface CluePiece {
  id: number;
  text: string;
  correctPos: number;
  currentPos: number;
}

const CLUES = [
  'HD 158729 B 不是恒星',
  '它是一个信息危害实体',
  '通过观测传播',
  '存在于认知中',
  '镜子会映照出恐惧'
];

export const ClueAssembly: React.FC<PuzzleProps> = ({ onComplete }) => {
  const [pieces, setPieces] = useState<CluePiece[]>([]);
  const [slots, setSlots] = useState<(CluePiece | null)[]>([null, null, null, null, null]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const shuffled = CLUES.map((text, i) => ({
      id: i,
      text,
      correctPos: i,
      currentPos: Math.random()
    })).sort(() => Math.random() - 0.5);
    
    setPieces(shuffled.map((p, i) => ({ ...p, currentPos: i })));
  }, []);

  useEffect(() => {
    const allCorrect = slots.every((slot, i) => slot?.correctPos === i);
    if (allCorrect && slots[0] !== null && !completed) {
      setCompleted(true);
      setTimeout(onComplete, 1500);
    }
  }, [slots, completed, onComplete]);

  const handlePieceClick = (piece: CluePiece, fromSlot: number | null) => {
    if (completed) return;

    if (fromSlot !== null) {
      // Remove from slot
      setSlots(prev => prev.map((s, i) => i === fromSlot ? null : s));
      setPieces(prev => [...prev, piece]);
    } else {
      // Add to first empty slot
      const emptySlot = slots.findIndex(s => s === null);
      if (emptySlot !== -1) {
        setSlots(prev => prev.map((s, i) => i === emptySlot ? piece : s));
        setPieces(prev => prev.filter(p => p.id !== piece.id));
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-white/60 text-sm font-mono text-center mb-4">
        拖拽线索碎片到正确位置，揭示真相
      </div>

      {/* Slots */}
      <div className="space-y-2">
        {slots.map((slot, index) => (
          <motion.div
            key={index}
            onClick={() => slot && handlePieceClick(slot, index)}
            className={`p-3 rounded-lg border-2 border-dashed min-h-[48px] flex items-center justify-center transition-all ${
              slot
                ? slot.correctPos === index
                  ? 'bg-green-500/20 border-green-500 text-green-300'
                  : 'bg-red-500/20 border-red-500 text-red-300'
                : 'border-white/20 text-white/30'
            }`}
            whileHover={slot ? { scale: 1.02 } : {}}
          >
            {slot ? (
              <span className="text-sm font-mono">{slot.text}</span>
            ) : (
              <span className="text-xs">{index + 1}</span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Available pieces */}
      {pieces.length > 0 && (
        <div className="pt-4 border-t border-white/10">
          <div className="text-white/40 text-xs mb-2">可用碎片:</div>
          <div className="flex flex-wrap gap-2">
            {pieces.map((piece) => (
              <motion.button
                key={piece.id}
                onClick={() => handlePieceClick(piece, null)}
                className="px-3 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded text-sm text-cyan-300 hover:bg-cyan-500/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {piece.text}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-center gap-2 text-white/30 text-xs">
        <Puzzle size={12} />
        <span>按逻辑顺序排列</span>
      </div>

      {completed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-green-400 text-center font-mono"
        >
          <Check size={20} className="inline mr-2" />
          真相 revealed. 但知道真相是有代价的...
        </motion.div>
      )}
    </div>
  );
};
