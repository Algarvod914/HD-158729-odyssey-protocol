import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TerminalProps {
  lines: string[];
  typingSpeed?: number;
  onComplete?: () => void;
  className?: string;
}

export const Terminal: React.FC<TerminalProps> = ({ 
  lines, 
  typingSpeed = 30,
  onComplete,
  className = ''
}) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (currentLine >= lines.length) {
      onComplete?.();
      return;
    }

    const line = lines[currentLine];
    
    if (currentChar >= line.length) {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => [...prev, line]);
        setCurrentLine(prev => prev + 1);
        setCurrentChar(0);
      }, 300);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setCurrentChar(prev => prev + 1);
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentLine, currentChar, lines, typingSpeed, onComplete]);

  return (
    <div className={`font-mono text-sm ${className}`}>
      {displayedLines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`${
            line.startsWith('[') ? 'text-cyan-400' :
            line.startsWith('警告') ? 'text-red-400' :
            line.startsWith('任务') ? 'text-green-400' :
            'text-white/80'
          }`}
        >
          {line || '\u00A0'}
        </motion.div>
      ))}
      {currentLine < lines.length && (
        <div className="text-white/80">
          {lines[currentLine].slice(0, currentChar)}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="inline-block w-2 h-4 bg-cyan-400 ml-1"
          />
        </div>
      )}
    </div>
  );
};
