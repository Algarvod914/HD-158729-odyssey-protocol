import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PuzzleProps } from '@/types/game';
import { Check, Circle } from 'lucide-react';

interface Difference {
  id: number;
  labelA: string;
  labelB: string;
  found: boolean;
}

const DIFFERENCES: Difference[] = [
  { id: 1, labelA: '橙色超巨星', labelB: '红巨星', found: false },
  { id: 2, labelA: 'K0Ib-K1Ib', labelB: 'K2IIIa', found: false },
  { id: 3, labelA: '163-179 R☉', labelB: '68.29 R☉', found: false },
  { id: 4, labelA: '11.81-13.14 M☉', labelB: '6.852 M☉', found: false },
  { id: 5, labelA: '~20,000 ly', labelB: '~7,200 ly', found: false },
];

export const FindDifference: React.FC<PuzzleProps> = ({ onComplete }) => {
  const [differences, setDifferences] = useState<Difference[]>(DIFFERENCES);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const allFound = differences.every(d => d.found);
    if (allFound && !completed) {
      setCompleted(true);
      setTimeout(onComplete, 1500);
    }
  }, [differences, completed, onComplete]);

  const handleFind = (id: number) => {
    setDifferences(prev => prev.map(d => 
      d.id === id ? { ...d, found: true } : d
    ));
  };

  const foundCount = differences.filter(d => d.found).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-white/60">找出5个关键差异</span>
        <span className="text-cyan-400 font-mono">{foundCount}/5</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* HD 158729 A */}
        <div className="bg-black/50 border border-orange-500/30 p-4 rounded-lg">
          <div className="text-orange-400 font-mono text-sm mb-3 text-center">
            HD 158729 A
          </div>
          <div className="space-y-2">
            {differences.map((diff) => (
              <motion.button
                key={`a-${diff.id}`}
                onClick={() => !diff.found && handleFind(diff.id)}
                disabled={diff.found}
                className={`w-full p-2 rounded text-xs font-mono text-left transition-all ${
                  diff.found
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-white/5 text-white/70 hover:bg-orange-500/20'
                }`}
                whileHover={!diff.found ? { scale: 1.02 } : {}}
                whileTap={!diff.found ? { scale: 0.98 } : {}}
              >
                {diff.labelA}
                {diff.found && <Check size={12} className="inline ml-2" />}
              </motion.button>
            ))}
          </div>
        </div>

        {/* HD 158729 B */}
        <div className="bg-black/50 border border-red-500/30 p-4 rounded-lg">
          <div className="text-red-400 font-mono text-sm mb-3 text-center">
            HD 158729 B
          </div>
          <div className="space-y-2">
            {differences.map((diff) => (
              <motion.button
                key={`b-${diff.id}`}
                onClick={() => !diff.found && handleFind(diff.id)}
                disabled={diff.found}
                className={`w-full p-2 rounded text-xs font-mono text-left transition-all ${
                  diff.found
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-white/5 text-white/70 hover:bg-red-500/20'
                }`}
                whileHover={!diff.found ? { scale: 1.02 } : {}}
                whileTap={!diff.found ? { scale: 0.98 } : {}}
              >
                {diff.labelB}
                {diff.found && <Check size={12} className="inline ml-2" />}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {completed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-green-400 text-center font-mono"
        >
          <Check size={20} className="inline mr-2" />
          所有差异已发现。B不是恒星...它是别的东西。
        </motion.div>
      )}
    </div>
  );
};
