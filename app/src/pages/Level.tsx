import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, AlertTriangle, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Terminal } from '@/components/Terminal';
import { GlitchText } from '@/components/GlitchText';
import { getLevelById } from '@/data/levels';
import { CoordinatePuzzle } from '@/components/puzzles/CoordinatePuzzle';
import { FrequencyPuzzle } from '@/components/puzzles/FrequencyPuzzle';
import { FindDifference } from '@/components/puzzles/FindDifference';
import { MorseCode } from '@/components/puzzles/MorseCode';
import { SystemRepair } from '@/components/puzzles/SystemRepair';
import { JigsawPuzzle } from '@/components/puzzles/JigsawPuzzle';
import { IdentityPuzzle } from '@/components/puzzles/IdentityPuzzle';
import { CodeRepair } from '@/components/puzzles/CodeRepair';
import { TimeLoop } from '@/components/puzzles/TimeLoop';
import { ClueAssembly } from '@/components/puzzles/ClueAssembly';
import { SanityTest } from '@/components/puzzles/SanityTest';
import { FirewallGame } from '@/components/puzzles/FirewallGame';
import { FinalChoice } from '@/components/puzzles/FinalChoice';

interface LevelProps {
  onComplete: (levelId: number, ending?: 'A' | 'B' | 'C') => void;
  gameState: { infectionLevel: number };
}

const PuzzleComponent: Record<string, React.FC<any>> = {
  coordinate: CoordinatePuzzle,
  frequency: FrequencyPuzzle,
  difference: FindDifference,
  morse: MorseCode,
  repair: SystemRepair,
  jigsaw: JigsawPuzzle,
  identity: IdentityPuzzle,
  code: CodeRepair,
  timeloop: TimeLoop,
  clue: ClueAssembly,
  sanity: SanityTest,
  firewall: FirewallGame,
  final: FinalChoice
};

export const Level: React.FC<LevelProps> = ({ onComplete, gameState }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const levelId = parseInt(id || '1');
  const level = getLevelById(levelId);

  const [showStory, setShowStory] = useState(true);
  const [showHints, setShowHints] = useState(false);
  const [puzzleComplete, setPuzzleComplete] = useState(false);

  useEffect(() => {
    setShowStory(true);
    setPuzzleComplete(false);
  }, [levelId]);

  if (!level) {
    return <div>Level not found</div>;
  }

  const Puzzle = PuzzleComponent[level.puzzleType];

  const handlePuzzleComplete = () => {
    setPuzzleComplete(true);
    
    // For final level, get ending from puzzle
    if (level.puzzleType === 'final') {
      // The FinalChoice component will handle this
      setTimeout(() => {
        onComplete(levelId, 'A'); // Default, will be overridden
        navigate('/');
      }, 3000);
    } else {
      setTimeout(() => {
        onComplete(levelId);
        navigate('/');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <Button
          onClick={() => navigate('/')}
          variant="ghost"
          className="text-white/60 hover:text-white"
        >
          <ArrowLeft size={18} className="mr-2" />
          返回
        </Button>

        <div className="text-center">
          <h1 className="text-xl font-bold text-white font-mono">
            关卡 {level.id}: {level.title}
          </h1>
          <p className="text-white/40 text-xs font-mono">{level.subtitle}</p>
        </div>

        <Button
          onClick={() => setShowHints(!showHints)}
          variant="ghost"
          className="text-white/60 hover:text-white"
        >
          <HelpCircle size={18} />
        </Button>
      </motion.div>

      {/* Infection Warning */}
      {level.infectionLevel > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 text-red-400 text-xs font-mono mb-2">
            <AlertTriangle size={14} />
            <span>系统感染程度: {level.infectionLevel}%</span>
          </div>
          <div className="h-1 bg-black/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-red-500"
              initial={{ width: 0 }}
              animate={{ width: `${level.infectionLevel}%` }}
            />
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {showStory ? (
            <motion.div
              key="story"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/50 border border-cyan-500/30 rounded-lg p-6 mb-6"
            >
              <Terminal
                lines={level.storyText}
                typingSpeed={20}
                onComplete={() => setTimeout(() => setShowStory(false), 500)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="puzzle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Description */}
              <div className="bg-black/30 border border-white/10 rounded-lg p-4 mb-6">
                <p className="text-white/70 text-sm">{level.description}</p>
              </div>

              {/* Puzzle */}
              <div className="bg-black/50 border border-cyan-500/30 rounded-lg p-6">
                <Puzzle 
                  onComplete={handlePuzzleComplete}
                  infectionLevel={level.infectionLevel}
                />
              </div>

              {/* Hints */}
              {showHints && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 bg-black/30 border border-yellow-500/30 rounded-lg p-4"
                >
                  <div className="text-yellow-400 text-xs font-mono mb-2">提示:</div>
                  <ul className="space-y-1">
                    {level.hints.map((hint, i) => (
                      <li key={i} className="text-white/50 text-xs">• {hint}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Message */}
        {puzzleComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 text-center"
          >
            <div className="text-green-400 font-mono">
              关卡完成。正在返回主菜单...
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
