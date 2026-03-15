import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { PuzzleProps } from '@/types/game';
import { Check, Shield, AlertTriangle } from 'lucide-react';

interface Node {
  id: number;
  x: number;
  y: number;
  active: boolean;
  isTrap: boolean;
}

const NODE_COUNT = 7;
const TRAP_COUNT = 3;
const TIME_LIMIT = 15;

export const FirewallGame: React.FC<PuzzleProps> = ({ onComplete }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [activeCount, setActiveCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Generate nodes
    const newNodes: Node[] = [];
    const trapIndices = new Set<number>();
    
    while (trapIndices.size < TRAP_COUNT) {
      trapIndices.add(Math.floor(Math.random() * NODE_COUNT));
    }

    for (let i = 0; i < NODE_COUNT; i++) {
      newNodes.push({
        id: i,
        x: 15 + (i % 4) * 25,
        y: 20 + Math.floor(i / 4) * 40,
        active: false,
        isTrap: trapIndices.has(i)
      });
    }
    setNodes(newNodes);
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !success && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !success) {
      setGameOver(true);
    }
  }, [timeLeft, success, gameOver]);

  useEffect(() => {
    if (activeCount === NODE_COUNT - TRAP_COUNT && !success) {
      setSuccess(true);
      setTimeout(onComplete, 1500);
    }
  }, [activeCount, success, onComplete]);

  const handleNodeClick = useCallback((id: number) => {
    const node = nodes.find(n => n.id === id);
    if (!node || node.active || gameOver || success) return;

    if (node.isTrap) {
      setGameOver(true);
      return;
    }

    setNodes(prev => prev.map(n => 
      n.id === id ? { ...n, active: true } : n
    ));
    setActiveCount(c => c + 1);
  }, [nodes, gameOver, success]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-cyan-400">
          <Shield size={16} />
          <span className="font-mono text-sm">防火墙节点</span>
        </div>
        <div className={`font-mono text-xl ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
          {timeLeft}s
        </div>
      </div>

      <div className="relative h-40 bg-black/70 border border-cyan-500/30 rounded-lg overflow-hidden">
        {nodes.map((node) => (
          <motion.button
            key={node.id}
            onClick={() => handleNodeClick(node.id)}
            disabled={node.active || gameOver || success}
            className={`absolute w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              node.active
                ? 'bg-green-500/40 border-2 border-green-400'
                : 'bg-cyan-500/20 border-2 border-cyan-400/50 hover:bg-cyan-500/40'
            }`}
            style={{ 
              left: `${node.x}%`, 
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            whileHover={{ scale: node.active ? 1 : 1.1 }}
            whileTap={{ scale: node.active ? 1 : 0.9 }}
          >
            {node.active ? (
              <Check size={16} className="text-green-400" />
            ) : (
              <span className="text-cyan-400 text-xs">{node.id + 1}</span>
            )}
          </motion.button>
        ))}

        {/* Connection lines */}
        <svg className="absolute inset-0 pointer-events-none">
          {nodes.filter(n => n.active).map((node, i, arr) => {
            if (i === 0) return null;
            const prev = arr[i - 1];
            return (
              <line
                key={`line-${node.id}`}
                x1={`${prev.x}%`}
                y1={`${prev.y}%`}
                x2={`${node.x}%`}
                y2={`${node.y}%`}
                stroke="#00ff00"
                strokeWidth="2"
                opacity="0.5"
              />
            );
          })}
        </svg>
      </div>

      <div className="flex items-center justify-between text-xs text-white/40">
        <span>激活: {activeCount}/{NODE_COUNT - TRAP_COUNT}</span>
        <span className="text-red-400">陷阱: {TRAP_COUNT}</span>
      </div>

      {gameOver && !success && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-center font-mono"
        >
          <AlertTriangle size={16} className="inline mr-2" />
          防火墙崩溃。病毒正在扩散...
          <button 
            onClick={() => window.location.reload()}
            className="block mx-auto mt-2 text-cyan-400 hover:underline"
          >
            重试
          </button>
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-green-400 text-center font-mono"
        >
          <Check size={20} className="inline mr-2" />
          防火墙激活。但已经太迟了...
        </motion.div>
      )}
    </div>
  );
};
