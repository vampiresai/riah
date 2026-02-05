
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { Heart, RefreshCcw, XCircle } from 'lucide-react';
import { playSuccess } from '../sfx';

interface HeartCatcherGameProps {
  onWin: () => void;
}

interface FallingItem {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  type: 'heart' | 'bomb';
}

const HeartCatcherGame: React.FC<HeartCatcherGameProps> = ({ onWin }) => {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [items, setItems] = useState<FallingItem[]>([]);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const containerRef = useRef<HTMLDivElement>(null);
  const processedIdsRef = useRef<Set<number>>(new Set());
  const targetScore = 10;

  const mouseX = useSpring(window.innerWidth / 2, { stiffness: 400, damping: 40 });

  useEffect(() => {
    const handleGlobalMove = (e: MouseEvent | TouchEvent) => {
      if (!containerRef.current || gameStatus !== 'playing') return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = 'touches' in e 
        ? e.touches[0].clientX 
        : (e as MouseEvent).clientX;
      
      const x = clientX - rect.left;
      const clampedX = Math.max(40, Math.min(rect.width - 40, x));
      mouseX.set(clampedX);
    };

    window.addEventListener('mousemove', handleGlobalMove);
    window.addEventListener('touchmove', handleGlobalMove, { passive: false });

    return () => {
      window.removeEventListener('mousemove', handleGlobalMove);
      window.removeEventListener('touchmove', handleGlobalMove);
    };
  }, [gameStatus, mouseX]);

  const spawnItem = useCallback(() => {
    if (gameStatus !== 'playing') return;
    const baseX = Math.random() * 70 + 10;
    const offset = 10 + Math.random() * 15;
    const heartX = Math.max(7, Math.min(93, baseX - offset));
    const bombX = Math.max(7, Math.min(93, baseX + offset));
    const speed = 0.75 + Math.random() * 0.55;
    const size = 20 + Math.random() * 14;
    const opacity = 0.8 + Math.random() * 0.2;

    const heartItem: FallingItem = {
      id: Date.now() + Math.random(),
      x: heartX,
      y: -10,
      size,
      speed,
      opacity,
      type: 'heart',
    };
    const bombItem: FallingItem = {
      id: Date.now() + Math.random(),
      x: bombX,
      y: -10,
      size,
      speed,
      opacity,
      type: 'bomb',
    };
    setItems(prev => [...prev, heartItem, bombItem]);
  }, [gameStatus]);

  useEffect(() => {
    if (gameStatus !== 'playing') return;
    const interval = setInterval(spawnItem, 700);
    return () => clearInterval(interval);
  }, [spawnItem, gameStatus]);

  useEffect(() => {
    if (gameStatus !== 'playing') return;

    const gameLoop = setInterval(() => {
      setItems(prev => {
        const next = prev.map(item => ({ ...item, y: item.y + item.speed }));
        const currentX = mouseX.get();
        const rect = containerRef.current?.getBoundingClientRect();
        const containerWidth = rect?.width || 0;

        const caught: FallingItem[] = [];
        const missed: FallingItem[] = [];
        const remaining: FallingItem[] = [];

        next.forEach(item => {
          const itemPixelsX = (item.x / 100) * containerWidth;
          const isCaught = Math.abs(itemPixelsX - currentX) < 60 && item.y > 82 && item.y < 92;
          const isMissed = item.y >= 100;

          if (isCaught) caught.push(item);
          else if (isMissed) missed.push(item);
          else remaining.push(item);
        });

        if (caught.length > 0) {
          const uniqueCaught = caught.filter(item => {
            if (processedIdsRef.current.has(item.id)) return false;
            processedIdsRef.current.add(item.id);
            return true;
          });
          const caughtHearts = uniqueCaught.filter(item => item.type === 'heart').length;
          const caughtBombs = uniqueCaught.filter(item => item.type === 'bomb').length;

          if (caughtHearts > 0) {
            setScore(s => {
              const newScore = s + caughtHearts;
              if (newScore >= targetScore) {
                setGameStatus('won');
              }
              return Math.min(targetScore, newScore);
            });
          }

          if (caughtBombs > 0) {
            setLives(l => {
              const newLives = l - caughtBombs;
              if (newLives <= 0) setGameStatus('lost');
              return Math.max(0, newLives);
            });
          }
        }

        return remaining;
      });
    }, 16);

    return () => clearInterval(gameLoop);
  }, [mouseX, gameStatus, onWin]);

  useEffect(() => {
    if (gameStatus === 'won') {
      playSuccess();
    }
  }, [gameStatus]);

  const restartGame = () => {
    setScore(0);
    setLives(3);
    setItems([]);
    setGameStatus('playing');
    processedIdsRef.current.clear();
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-[70vh] md:h-[75vh] relative glass rounded-[3rem] overflow-hidden cursor-crosshair select-none border border-white/70 soft-card transition-all duration-500"
    >
      {/* Game Header */}
      <div className="absolute top-10 left-0 right-0 flex flex-col items-center z-20 pointer-events-none px-8">
        <h2 className="text-4xl font-playfair italic text-slate-900 mb-8 font-black">Catch My Heart</h2>
        
        <div className="flex justify-between w-full max-w-xl items-center bg-white/90 backdrop-blur-xl px-10 py-5 rounded-[2rem] border border-rose-100 shadow-xl">
          <div className="flex flex-col">
            <span className="text-[11px] tracking-[0.3em] uppercase text-slate-800 font-black mb-1">Hearts Caught</span>
            <div className="text-4xl font-playfair font-black text-rose-700">
              {score} <span className="text-slate-400 text-lg font-bold">/ {targetScore}</span>
            </div>
          </div>

          <div className="h-12 w-px bg-slate-200 mx-6" />

          <div className="flex flex-col items-end">
            <span className="text-[11px] tracking-[0.3em] uppercase text-slate-800 font-black mb-1">Lives Left</span>
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <Heart 
                  key={i} 
                  size={24} 
                  className={i < lives ? "text-rose-600 fill-rose-600 transition-all duration-300" : "text-slate-200 scale-90"} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Falling Hearts + Bombs */}
      <AnimatePresence>
        {items.map(item => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.5, y: -20 }}
            animate={{ opacity: item.opacity, scale: 1, y: 0 }}
            className="absolute pointer-events-none"
            style={{ 
              left: `${item.x}%`, 
              top: `${item.y}%`,
            }}
          >
            <img
              src={item.type === 'bomb' ? '/images/bomb.png' : '/images/hearts.png'}
              alt={item.type === 'bomb' ? 'Bomb' : 'Heart'}
              style={{ width: item.size, height: item.size }}
              className="drop-shadow-lg"
              draggable={false}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Catcher */}
      <motion.div 
        style={{ x: mouseX }}
        className="absolute bottom-[8%] -ml-16 w-32 h-32 flex items-center justify-center z-30 pointer-events-none"
      >
        <div className="absolute inset-0 bg-rose-500/20 blur-3xl rounded-full animate-pulse" />
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="relative"
        >
          <img
            src="/images/basket.png"
            alt="Basket"
            className="w-24 h-24 drop-shadow-2xl"
            draggable={false}
          />
        </motion.div>
      </motion.div>

      {/* Overlays */}
      <AnimatePresence>
        {gameStatus === 'won' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-white/95 backdrop-blur-2xl z-50 flex flex-col items-center justify-center p-8 text-center"
          >
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="space-y-6">
              <div className="flex justify-center">
                <img
                  src="/images/lillies.png"
                  alt="Spider lillies trophy"
                  className="w-32 h-32 drop-shadow-2xl"
                  draggable={false}
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl md:text-5xl font-playfair font-black text-slate-900 italic">
                  Perfectly caught, you have won.
                </h3>
                <p className="text-slate-700 text-sm font-bold tracking-[0.3em] uppercase">
                  Spider lillies trophy unlocked.
                </p>
              </div>
              <button
                onClick={onWin}
                data-sfx="click"
                className="px-12 py-5 bg-slate-900 text-white rounded-full text-sm font-black tracking-[0.3em] uppercase hover:bg-rose-600 transition-all shadow-2xl"
              >
                Continue
              </button>
            </motion.div>
          </motion.div>
        )}

        {gameStatus === 'lost' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-white/95 backdrop-blur-2xl z-50 flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="space-y-10">
              <div className="flex justify-center text-slate-300">
                <XCircle size={80} />
              </div>
              <div className="space-y-4">
                <h3 className="text-4xl font-playfair font-black text-slate-900">Don't Let Go</h3>
                <p className="text-slate-600 font-bold tracking-[0.2em] uppercase">Try catching them again, Riah!</p>
              </div>
              <button
                onClick={restartGame}
                data-sfx="click"
                className="flex items-center gap-4 px-12 py-6 bg-slate-900 text-white rounded-full text-sm font-black tracking-[0.3em] uppercase hover:bg-rose-600 transition-all shadow-2xl group"
              >
                <RefreshCcw size={20} className="group-hover:rotate-180 transition-transform duration-700" />
                Retry
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-10 left-0 right-0 text-center opacity-60 text-[11px] tracking-[0.6em] uppercase pointer-events-none font-black text-slate-900">
        Slide to move the heart. Avoid bombs.
      </div>
    </div>
  );
};

export default HeartCatcherGame;
