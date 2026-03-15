import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PuzzleProps } from '@/types/game';
import { Check, X, AlertCircle } from 'lucide-react';

interface CodeLine {
  id: number;
  code: string;
  isCorrupted: boolean;
  fixed: boolean;
}

const initialCode: CodeLine[] = [
  { id: 1, code: 'const reality = await fetch(\'truth\');', isCorrupted: false, fixed: true },
  { id: 2, code: 'const mirror = reality.reflect();', isCorrupted: true, fixed: false },
  { id: 3, code: 'if (self === mirror) {', isCorrupted: false, fixed: true },
  { id: 4, code: '  return "ERROR: IDENTITY_COLLAPSE";', isCorrupted: true, fixed: false },
  { id: 5, code: '}', isCorrupted: false, fixed: true },
];

const fixedVersions: Record<number, string> = {
  2: 'const mirror = reality.observe();',
  4: '  return "WARNING: MIRROR_DETECTED";'
};

export const CodeRepair: React.FC<PuzzleProps> = ({ onComplete }) => {
  const [codeLines, setCodeLines] = useState<CodeLine[]>(initialCode);
  const [completed, setCompleted] = useState(false);

  const handleFix = (id: number) => {
    setCodeLines(prev => prev.map(line => 
      line.id === id ? { ...line, fixed: true, code: fixedVersions[id] } : line
    ));
  };

  React.useEffect(() => {
    const allFixed = codeLines.every(line => line.fixed);
    if (allFixed && !completed) {
      setCompleted(true);
      setTimeout(onComplete, 1500);
    }
  }, [codeLines, completed, onComplete]);

  return (
    <div className="space-y-4">
      <div className="text-white/60 text-sm font-mono text-center mb-4">
        点击被感染的代码行进行修复
      </div>

      <div className="bg-black/70 border border-red-500/30 rounded-lg p-4 font-mono text-sm space-y-2">
        {codeLines.map((line) => (
          <motion.div
            key={line.id}
            onClick={() => line.isCorrupted && !line.fixed && handleFix(line.id)}
            className={`p-2 rounded cursor-pointer transition-all ${
              line.isCorrupted && !line.fixed
                ? 'bg-red-500/20 border border-red-500/50 text-red-300 hover:bg-red-500/30'
                : line.fixed && line.isCorrupted
                ? 'bg-green-500/20 border border-green-500/50 text-green-300'
                : 'text-white/70'
            }`}
            whileHover={line.isCorrupted && !line.fixed ? { scale: 1.02 } : {}}
          >
            <div className="flex items-center gap-2">
              <span className="text-white/30 w-4">{line.id}</span>
              <span>{line.code}</span>
              {line.isCorrupted && !line.fixed && (
                <AlertCircle size={14} className="text-red-400 ml-auto" />
              )}
              {line.fixed && line.isCorrupted && (
                <Check size={14} className="text-green-400 ml-auto" />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 text-xs text-white/40">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-500/20 border border-red-500/50 rounded" />
          <span>被感染</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-500/20 border border-green-500/50 rounded" />
          <span>已修复</span>
        </div>
      </div>

      {completed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-green-400 text-center font-mono"
        >
          <Check size={20} className="inline mr-2" />
          代码修复完成。但病毒已经学会了...
        </motion.div>
      )}
    </div>
  );
};
