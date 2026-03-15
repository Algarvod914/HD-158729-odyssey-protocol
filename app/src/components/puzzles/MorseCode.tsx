import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PuzzleProps } from '@/types/game';
import { Play, Check, Volume2 } from 'lucide-react';

const MORSE_MESSAGE = '-- .. .-. .-. --- .-. / .-.. .. . ...';
const CORRECT_ANSWER = 'MIRROR LIES';

const morseToText: Record<string, string> = {
  '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E',
  '..-.': 'F', '--.': 'G', '....': 'H', '..': 'I', '.---': 'J',
  '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O',
  '.--.': 'P', '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T',
  '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X', '-.--': 'Y',
  '--..': 'Z', '/': ' '
};

export const MorseCode: React.FC<PuzzleProps> = ({ onComplete }) => {
  const [input, setInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [success, setSuccess] = useState(false);
  const [playing, setPlaying] = useState(false);

  const playMorse = () => {
    setPlaying(true);
    const chars = MORSE_MESSAGE.split('');
    let delay = 0;

    chars.forEach((char) => {
      setTimeout(() => {
        if (char === '.') {
          // Short beep
        } else if (char === '-') {
          // Long beep
        }
      }, delay);
      delay += char === '-' ? 300 : 150;
    });

    setTimeout(() => setPlaying(false), delay);
  };

  const handleSubmit = () => {
    const normalized = input.toUpperCase().trim();
    if (normalized === CORRECT_ANSWER) {
      setSuccess(true);
      setTimeout(onComplete, 1500);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-black/50 border border-cyan-500/30 p-6 rounded-lg text-center">
        <div className="text-cyan-400 font-mono mb-4">[接收到的信号]</div>
        
        <motion.div
          className="text-2xl font-mono text-white tracking-widest mb-4"
          animate={{ opacity: playing ? [1, 0.5, 1] : 1 }}
          transition={{ duration: 0.5, repeat: playing ? Infinity : 0 }}
        >
          {MORSE_MESSAGE}
        </motion.div>

        <Button
          onClick={playMorse}
          disabled={playing}
          variant="outline"
          className="border-cyan-500/30 text-cyan-400"
        >
          <Volume2 size={16} className="mr-2" />
          {playing ? '播放中...' : '播放信号'}
        </Button>
      </div>

      <div>
        <label className="text-cyan-400 text-sm font-mono block mb-2">
          解码信息:
        </label>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入解码后的信息..."
          className="bg-black/50 border-cyan-500/30 text-white font-mono uppercase"
          disabled={success}
        />
      </div>

      <Button
        onClick={handleSubmit}
        disabled={success || !input}
        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white"
      >
        {success ? <><Check size={16} className="mr-2" /> 解码成功</> : '提交解码'}
      </Button>

      <div className="text-center">
        <button
          onClick={() => setShowHint(!showHint)}
          className="text-white/40 text-xs hover:text-white/60"
        >
          {showHint ? '隐藏提示' : '显示摩斯电码表'}
        </button>
      </div>

      {showHint && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-black/30 border border-white/10 p-3 rounded text-xs font-mono text-white/60"
        >
          <div className="grid grid-cols-6 gap-2">
            {Object.entries(morseToText).filter(([k]) => k !== '/').map(([morse, letter]) => (
              <div key={letter} className="text-center">
                <span className="text-cyan-400">{morse}</span> = {letter}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
