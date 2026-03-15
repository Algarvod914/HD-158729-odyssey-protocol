import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PuzzleProps } from '@/types/game';
import { Check, X, User, Calendar, FileText } from 'lucide-react';

interface Identity {
  id: number;
  name: string;
  rank: string;
  idNumber: string;
  enlistDate: string;
  isReal: boolean;
  clues: string[];
}

const identities: Identity[] = [
  {
    id: 1,
    name: 'Cmdr. Sarah Chen',
    rank: 'Commander',
    idNumber: 'SF-2398-001',
    enlistDate: '2395.03.15',
    isReal: true,
    clues: ['标准ID格式', '入伍日期合理']
  },
  {
    id: 2,
    name: 'Cmdr. Sarah Chen',
    rank: 'Commander',
    idNumber: 'SF-2398-001',
    enlistDate: '2401.06.20',
    isReal: false,
    clues: ['入伍日期在未来']
  },
  {
    id: 3,
    name: 'Cmdr. Sarah Chen',
    rank: 'Admiral',
    idNumber: 'SF-2398-001-A',
    isReal: false,
    clues: ['ID格式异常', '军衔不匹配']
  },
  {
    id: 4,
    name: 'Cmdr. Sara Chen',
    rank: 'Commander',
    idNumber: 'SF-2398-001',
    isReal: false,
    clues: ['姓名拼写错误']
  },
  {
    id: 5,
    name: 'Cmdr. Sarah Chen',
    rank: 'Commander',
    idNumber: 'SF-2398-002',
    isReal: false,
    clues: ['ID编号错误']
  }
];

export const IdentityPuzzle: React.FC<PuzzleProps> = ({ onComplete }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correct, setCorrect] = useState(false);

  const handleSelect = (id: number) => {
    if (showResult) return;
    setSelectedId(id);
  };

  const handleConfirm = () => {
    if (selectedId === null) return;
    
    const identity = identities.find(i => i.id === selectedId);
    if (identity?.isReal) {
      setCorrect(true);
      setTimeout(onComplete, 2000);
    }
    setShowResult(true);
  };

  return (
    <div className="space-y-4">
      <div className="text-white/60 text-sm font-mono text-center mb-4">
        找出真实的身份记录。注意细节的差异。
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {identities.map((identity) => (
          <motion.button
            key={identity.id}
            onClick={() => handleSelect(identity.id)}
            className={`w-full p-3 rounded-lg border text-left transition-all ${
              selectedId === identity.id
                ? 'bg-cyan-500/20 border-cyan-400'
                : 'bg-black/30 border-white/10 hover:border-white/30'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <User size={14} className="text-cyan-400" />
                  <span className="text-white font-medium">{identity.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <FileText size={12} />
                  <span>{identity.rank} | {identity.idNumber}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Calendar size={12} />
                  <span>入伍: {identity.enlistDate}</span>
                </div>
              </div>
              {showResult && identity.isReal && (
                <Check size={20} className="text-green-400" />
              )}
              {showResult && selectedId === identity.id && !identity.isReal && (
                <X size={20} className="text-red-400" />
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {!showResult && (
        <Button
          onClick={handleConfirm}
          disabled={selectedId === null}
          className="w-full bg-cyan-600 hover:bg-cyan-500 text-white"
        >
          确认身份
        </Button>
      )}

      {showResult && !correct && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-400 text-center font-mono text-sm"
        >
          <X size={16} className="inline mr-2" />
          这不是真实的记录。再仔细检查。
          <button
            onClick={() => {
              setShowResult(false);
              setSelectedId(null);
            }}
            className="block mx-auto mt-2 text-cyan-400 hover:underline"
          >
            重试
          </button>
        </motion.div>
      )}

      {correct && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-green-400 text-center font-mono"
        >
          <Check size={20} className="inline mr-2" />
          身份确认。但如果是"我"在检查呢？
        </motion.div>
      )}
    </div>
  );
};
