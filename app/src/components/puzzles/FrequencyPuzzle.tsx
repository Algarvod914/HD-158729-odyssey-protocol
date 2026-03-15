import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { PuzzleProps } from '@/types/game';
import { Activity, Check } from 'lucide-react';

const TARGET_FREQUENCY = 5002;
const TOLERANCE = 50;

export const FrequencyPuzzle: React.FC<PuzzleProps> = ({ onComplete }) => {
  const [frequency, setFrequency] = useState(4000);
  const [signalStrength, setSignalStrength] = useState(0);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const diff = Math.abs(frequency - TARGET_FREQUENCY);
    const strength = Math.max(0, 100 - (diff / TOLERANCE) * 100);
    setSignalStrength(strength);
  }, [frequency]);

  const handleLock = () => {
    if (signalStrength > 80) {
      setLocked(true);
      setTimeout(onComplete, 1500);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-black/50 border border-cyan-500/30 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <span className="text-cyan-400 font-mono">扫描频率</span>
          <span className="text-white font-mono text-xl">{frequency}K</span>
        </div>

        <div className="h-32 bg-black/70 rounded-lg relative overflow-hidden mb-4">
          <svg className="w-full h-full">
            {Array.from({ length: 50 }).map((_, i) => {
              const x = (i / 50) * 100;
              const amplitude = signalStrength * 0.8;
              const y1 = 50 + Math.sin((i + Date.now() / 100) * 0.5) * amplitude * 0.3;
              const y2 = 50 - Math.sin((i + Date.now() / 100) * 0.5) * amplitude * 0.3;
              return (
                <motion.line
                  key={i}
                  x1={`${x}%`}
                  y1={`${y1}%`}
                  x2={`${x}%`}
                  y2={`${y2}%`}
                  stroke={signalStrength > 80 ? '#00ff00' : '#00d4ff'}
                  strokeWidth="2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 + (signalStrength / 100) * 0.7 }}
                />
              );
            })}
          </svg>
        </div>

        <Slider
          value={[frequency]}
          onValueChange={(v) => setFrequency(v[0])}
          min={4500}
          max={5500}
          step={1}
          disabled={locked}
          className="mb-4"
        />

        <div className="flex items-center gap-2">
          <Activity size={16} className={signalStrength > 80 ? 'text-green-400' : 'text-cyan-400'} />
          <span className="text-sm font-mono">
            信号强度: {signalStrength.toFixed(1)}%
          </span>
        </div>
      </div>

      {signalStrength > 80 && !locked && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            onClick={handleLock}
            className="w-full bg-green-600 hover:bg-green-500 text-white"
          >
            锁定信号
          </Button>
        </motion.div>
      )}

      {locked && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 text-green-400 justify-center"
        >
          <Check size={20} />
          信号已锁定。检测到异常物体。
        </motion.div>
      )}
    </div>
  );
};
