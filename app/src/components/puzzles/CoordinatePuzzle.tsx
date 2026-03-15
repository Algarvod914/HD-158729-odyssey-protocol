import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PuzzleProps } from '@/types/game';
import { Check, X, AlertCircle } from 'lucide-react';

const CORRECT_COORDINATES = {
  ra: '17h 34m 39.5737s',
  dec: "-60° 28' 00.727\""
};

export const CoordinatePuzzle: React.FC<PuzzleProps> = ({ onComplete }) => {
  const [ra, setRa] = useState('');
  const [dec, setDec] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    const raCorrect = ra.includes('17') && ra.includes('34') && ra.includes('39');
    const decCorrect = dec.includes('-60') && dec.includes('28') && dec.includes('00');

    if (raCorrect && decCorrect) {
      setSuccess(true);
      setError('');
      setTimeout(onComplete, 1500);
    } else {
      setError('坐标不匹配。请检查Henry Draper星表数据。');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-black/50 border border-cyan-500/30 p-4 rounded-lg font-mono text-sm">
        <div className="text-cyan-400 mb-2">[目标数据]</div>
        <div className="text-white/70 space-y-1">
          <div>星表编号: HD 158729</div>
          <div>星座: 天坛座 (Ara)</div>
          <div>距离: ~20,000 光年</div>
          <div>类型: 橙色超巨星 (K0Ib-K1Ib)</div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-cyan-400 text-sm font-mono block mb-2">
            赤经 (Right Ascension):
          </label>
          <Input
            value={ra}
            onChange={(e) => setRa(e.target.value)}
            placeholder="格式: XXh XXm XX.XXXXs"
            className="bg-black/50 border-cyan-500/30 text-white font-mono"
          />
        </div>

        <div>
          <label className="text-cyan-400 text-sm font-mono block mb-2">
            赤纬 (Declination):
          </label>
          <Input
            value={dec}
            onChange={(e) => setDec(e.target.value)}
            placeholder="格式: ±XX° XX' XX.XXX"
            className="bg-black/50 border-cyan-500/30 text-white font-mono"
          />
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-red-400 text-sm"
        >
          <AlertCircle size={16} />
          {error}
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 text-green-400"
        >
          <Check size={20} />
          坐标确认。轨道建立中...
        </motion.div>
      )}

      <Button
        onClick={handleSubmit}
        disabled={success}
        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white"
      >
        {success ? '已确认' : '输入坐标'}
      </Button>

      <div className="text-white/40 text-xs font-mono">
        提示: 参考Henry Draper星表第158729号条目
      </div>
    </div>
  );
};
