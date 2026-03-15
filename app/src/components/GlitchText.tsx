import React from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export const GlitchText: React.FC<GlitchTextProps> = ({ 
  text, 
  className = '',
  intensity = 'medium'
}) => {
  const intensityMap = {
    low: { x: 2, y: 1 },
    medium: { x: 4, y: 2 },
    high: { x: 8, y: 4 }
  };

  const { x, y } = intensityMap[intensity];

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      animate={{
        textShadow: [
          `${x}px ${y}px 0 rgba(255, 0, 64, 0.5), -${x}px -${y}px 0 rgba(0, 212, 255, 0.5)`,
          `-${x}px -${y}px 0 rgba(255, 0, 64, 0.5), ${x}px ${y}px 0 rgba(0, 212, 255, 0.5)`,
          `${x}px -${y}px 0 rgba(255, 0, 64, 0.5), -${x}px ${y}px 0 rgba(0, 212, 255, 0.5)`,
          `-${x}px ${y}px 0 rgba(255, 0, 64, 0.5), ${x}px -${y}px 0 rgba(0, 212, 255, 0.5)`,
        ]
      }}
      transition={{
        duration: 0.2,
        repeat: Infinity,
        repeatType: 'reverse'
      }}
    >
      {text}
    </motion.span>
  );
};
