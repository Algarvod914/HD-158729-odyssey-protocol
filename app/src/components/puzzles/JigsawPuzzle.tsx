import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PuzzleProps } from '@/types/game';
import { Check, Grid3X3 } from 'lucide-react';

interface Piece {
  id: number;
  currentPos: number;
  correctPos: number;
}

export const JigsawPuzzle: React.FC<PuzzleProps> = ({ onComplete }) => {
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Create shuffled pieces
    const initialPieces: Piece[] = Array.from({ length: 9 }, (_, i) => ({
      id: i,
      currentPos: i,
      correctPos: i
    }));
    
    // Shuffle
    for (let i = initialPieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [initialPieces[i], initialPieces[j]] = [initialPieces[j], initialPieces[i]];
      initialPieces[i].currentPos = i;
      initialPieces[j].currentPos = j;
    }
    
    setPieces(initialPieces);
  }, []);

  useEffect(() => {
    const allCorrect = pieces.length > 0 && pieces.every(p => p.currentPos === p.correctPos);
    if (allCorrect && !completed) {
      setCompleted(true);
      setTimeout(onComplete, 1500);
    }
  }, [pieces, completed, onComplete]);

  const handlePieceClick = (index: number) => {
    if (completed) return;

    if (selectedPiece === null) {
      setSelectedPiece(index);
    } else if (selectedPiece === index) {
      setSelectedPiece(null);
    } else {
      // Swap pieces
      setPieces(prev => {
        const newPieces = [...prev];
        const piece1 = newPieces.find(p => p.currentPos === selectedPiece);
        const piece2 = newPieces.find(p => p.currentPos === index);
        if (piece1 && piece2) {
          piece1.currentPos = index;
          piece2.currentPos = selectedPiece;
        }
        return newPieces;
      });
      setSelectedPiece(null);
    }
  };

  const getPieceContent = (correctPos: number) => {
    const contents = ['记', '忆', '碎', '片', '重', '组', '真', '相', '现'];
    return contents[correctPos];
  };

  return (
    <div className="space-y-4">
      <div className="text-white/60 text-sm font-mono text-center mb-4">
        点击两个碎片交换位置，重组记忆
      </div>

      <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
        {Array.from({ length: 9 }).map((_, index) => {
          const piece = pieces.find(p => p.currentPos === index);
          const isSelected = selectedPiece === index;
          const isCorrect = piece && piece.currentPos === piece.correctPos;

          return (
            <motion.button
              key={index}
              onClick={() => handlePieceClick(index)}
              className={`aspect-square rounded-lg flex items-center justify-center text-lg font-bold transition-all ${
                isSelected
                  ? 'bg-cyan-500/40 border-2 border-cyan-400'
                  : isCorrect
                  ? 'bg-green-500/20 border border-green-500/50'
                  : 'bg-white/5 border border-white/20 hover:border-white/40'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {piece && (
                <span className={isCorrect ? 'text-green-400' : 'text-white/80'}>
                  {getPieceContent(piece.correctPos)}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-2 text-white/40 text-xs">
        <Grid3X3 size={12} />
        <span>重组记忆碎片</span>
      </div>

      {completed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-green-400 text-center font-mono"
        >
          <Check size={20} className="inline mr-2" />
          记忆重组完成。但有些东西不对劲...
        </motion.div>
      )}
    </div>
  );
};
