import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PuzzleProps } from '@/types/game';
import { Check, Skull, Merge, Rocket } from 'lucide-react';

type EndingType = 'A' | 'B' | 'C' | null;

const ENDINGS = {
  A: {
    name: '牺牲',
    icon: Skull,
    color: 'red',
    description: '启动自毁程序，与实体同归于尽',
    code: 'ODYSSEY-TERMINATE-2398'
  },
  B: {
    name: '融合',
    icon: Merge,
    color: 'purple',
    description: '接受实体，成为新的存在形式',
    code: 'MIRROR-ACCEPT-FOREVER'
  },
  C: {
    name: '逃离',
    icon: Rocket,
    color: 'cyan',
    description: '启动紧急跃迁，带着警告返回',
    code: 'ESCAPE-WARNING-EARTH'
  }
};

export const FinalChoice: React.FC<PuzzleProps> = ({ onComplete }) => {
  const [selectedEnding, setSelectedEnding] = useState<EndingType>(null);
  const [inputCode, setInputCode] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    if (!selectedEnding) return;
    
    const expectedCode = ENDINGS[selectedEnding].code;
    if (inputCode.trim().toUpperCase() === expectedCode) {
      setConfirmed(true);
      setTimeout(() => onComplete(), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {!confirmed && (
        <>
          <div className="text-white/60 text-sm font-mono text-center mb-4">
            选择你的命运，输入确认代码
          </div>

          <div className="grid grid-cols-3 gap-3">
            {(Object.entries(ENDINGS) as [EndingType, typeof ENDINGS['A']][]).map(([key, ending]) => {
              const Icon = ending.icon;
              const isSelected = selectedEnding === key;
              
              return (
                <motion.button
                  key={key}
                  onClick={() => {
                    setSelectedEnding(key);
                    setInputCode('');
                  }}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? `bg-${ending.color}-500/20 border-${ending.color}-500`
                      : 'bg-black/30 border-white/10 hover:border-white/30'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon 
                    size={24} 
                    className={`mx-auto mb-2 ${isSelected ? `text-${ending.color}-400` : 'text-white/40'}`} 
                  />
                  <div className={`text-sm font-medium ${isSelected ? `text-${ending.color}-400` : 'text-white/60'}`}>
                    结局 {key}
                  </div>
                  <div className="text-xs text-white/40 mt-1">{ending.name}</div>
                </motion.button>
              );
            })}
          </div>

          {selectedEnding && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className={`p-4 rounded-lg bg-${ENDINGS[selectedEnding].color}-500/10 border border-${ENDINGS[selectedEnding].color}-500/30`}>
                <div className={`text-${ENDINGS[selectedEnding].color}-400 font-medium mb-2`}>
                  结局 {selectedEnding}: {ENDINGS[selectedEnding].name}
                </div>
                <div className="text-white/60 text-sm">
                  {ENDINGS[selectedEnding].description}
                </div>
              </div>

              <div>
                <label className="text-white/60 text-sm font-mono block mb-2">
                  输入确认代码:
                </label>
                <Input
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder={`格式: ${ENDINGS[selectedEnding].code}`}
                  className={`bg-black/50 border-${ENDINGS[selectedEnding].color}-500/30 text-white font-mono uppercase`}
                />
              </div>

              <Button
                onClick={handleConfirm}
                disabled={!inputCode}
                className={`w-full bg-${ENDINGS[selectedEnding].color}-600 hover:bg-${ENDINGS[selectedEnding].color}-500 text-white`}
              >
                确认选择
              </Button>
            </motion.div>
          )}
        </>
      )}

      {confirmed && selectedEnding && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`text-${ENDINGS[selectedEnding].color}-400 text-center font-mono space-y-4`}
        >
          <Check size={40} className="mx-auto" />
          <div className="text-xl">结局 {selectedEnding} 已触发</div>
          <div className="text-white/60 text-sm">
            {selectedEnding === 'A' && '奥德赛2398号与HD 158729 B一同消逝。地球安全了。'}
            {selectedEnding === 'B' && '你成为了镜像的一部分。永恒。完美。'}
            {selectedEnding === 'C' && '警告已发送。但谁会相信一个被感染的人？'}
          </div>
        </motion.div>
      )}
    </div>
  );
};
