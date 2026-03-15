import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PuzzleProps } from '@/types/game';
import { Check, Brain, AlertTriangle } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  trap: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: '你是谁？',
    options: [
      '我是奥德赛2398号的船员',
      '我是HD 158729 B的观察者',
      '我是镜像的一部分',
      '我不确定了'
    ],
    correctIndex: 0,
    trap: '怀疑是病毒的开始'
  },
  {
    id: 2,
    question: '什么是真实的？',
    options: [
      '我的记忆是真实的',
      '我的感知是真实的',
      '我的存在是真实的',
      '以上都是'
    ],
    correctIndex: 3,
    trap: '否定任何一项都是陷阱'
  },
  {
    id: 3,
    question: 'HD 158729 B是什么？',
    options: [
      '一个恒星',
      '一个信息危害',
      '一个镜子',
      '一个陷阱'
    ],
    correctIndex: 1,
    trap: '它不只是物理存在'
  }
];

export const SanityTest: React.FC<PuzzleProps> = ({ onComplete }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showTrap, setShowTrap] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleAnswer = (index: number) => {
    if (index !== questions[currentQ].correctIndex) {
      setShowTrap(true);
      setTimeout(() => setShowTrap(false), 2000);
      return;
    }

    const newAnswers = [...answers, index];
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
    } else {
      setCompleted(true);
      setTimeout(onComplete, 1500);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-cyan-400">
          <Brain size={16} />
          <span className="font-mono text-sm">理智测试</span>
        </div>
        <div className="text-white/40 text-sm">
          {currentQ + 1}/{questions.length}
        </div>
      </div>

      {!completed && (
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="bg-black/50 border border-white/10 p-4 rounded-lg">
            <div className="text-white font-medium mb-4">
              {questions[currentQ].question}
            </div>

            <div className="space-y-2">
              {questions[currentQ].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full p-3 text-left rounded-lg bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/50 transition-all text-sm text-white/80"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {showTrap && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-500/20 border border-red-500/50 p-3 rounded-lg text-red-300 text-sm text-center"
        >
          <AlertTriangle size={16} className="inline mr-2" />
          {questions[currentQ].trap}
        </motion.div>
      )}

      {completed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-green-400 text-center font-mono"
        >
          <Check size={20} className="inline mr-2" />
          理智测试通过。但它是真的吗？
        </motion.div>
      )}
    </div>
  );
};
