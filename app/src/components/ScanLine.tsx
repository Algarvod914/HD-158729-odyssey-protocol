import React from 'react';
import { motion } from 'framer-motion';

export const ScanLine: React.FC = () => {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-50"
      style={{
        background: 'linear-gradient(to bottom, transparent 50%, rgba(0, 212, 255, 0.03) 50%)',
        backgroundSize: '100% 4px'
      }}
    >
      <motion.div
        className="absolute left-0 right-0 h-px bg-cyan-500/20"
        animate={{
          top: ['0%', '100%', '0%']
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </motion.div>
  );
};
