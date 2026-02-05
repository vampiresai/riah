
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playPop, playSuccess } from '../sfx';

interface HeartGameProps {
  onWin: () => void;
}

interface HeartItem {
  id: number;
  x: number;
  size: number;
  speed: number;
}

const HeartGame: React.FC<HeartGameProps> = ({ onWin }) => {
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState<HeartItem[]>([]);
  const targetScore = 10;

  const spawnHeart = useCallback(() => {
    const newHeart: HeartItem = {
      id: Date.now(),
      x: Math.random() * 90, // Percentage
      size: 20 + Math.random() * 30,
      speed: 2 + Math.random() * 4,
    };
    setHearts(prev => [...prev, newHeart]);
  }, []);

  useEffect(() => {
    const interval = setInterval(spawnHeart, 1000);
    return () => clearInterval(interval);
  }, [spawnHeart]);

  useEffect(() => {
    if (score === targetScore) {
      playSuccess();
      setTimeout(onWin, 1000);
    }
  }, [score, onWin]);

  const collectHeart = (id: number) => {
    setScore(prev => prev + 1);
    setHearts(prev => prev.filter(h => h.id !== id));
    playPop();
  };

  return (
    <div className="w-full h-[60vh] relative glass rounded-3xl border border-white/50 shadow-inner overflow-hidden">
      <div className="absolute top-4 left-0 right-0 flex justify-center z-20">
        <div className="bg-pink-100/80 px-4 py-2 rounded-full border border-pink-200 text-pink-600 font-bold">
          Catch {targetScore - score} more hearts! ❤️
        </div>
      </div>

      <AnimatePresence>
        {hearts.map(heart => (
          <motion.button
            key={heart.id}
            initial={{ y: -50, opacity: 0 }}
            animate={{ 
              y: '110%', 
              opacity: 1,
              x: `${heart.x}%`
            }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: heart.speed, ease: "linear" }}
            onClick={() => collectHeart(heart.id)}
            onAnimationComplete={() => {
              setHearts(prev => prev.filter(h => h.id !== heart.id));
            }}
            data-sfx="click"
            className="absolute top-0 text-pink-500 hover:text-rose-600 transition-colors cursor-pointer"
            style={{ fontSize: heart.size }}
          >
            ❤️
          </motion.button>
        ))}
      </AnimatePresence>

      {score >= targetScore && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-white/80 z-30 flex-col gap-4 text-center"
        >
          <div className="text-6xl">🌟</div>
          <h2 className="text-3xl font-dancing text-pink-600">Wow, you're fast!</h2>
          <p className="text-slate-600">You've unlocked something special...</p>
        </motion.div>
      )}
    </div>
  );
};

export default HeartGame;
