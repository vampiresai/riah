
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';
import { playSuccess } from '../sfx';

interface FinalProposalProps {
  onAccepted: () => void;
}

const FinalProposal: React.FC<FinalProposalProps> = ({ onAccepted }) => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const moveNoButton = (intensity = 0.9) => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newX = (Math.random() - 0.5) * (containerRect.width * intensity);
    const newY = (Math.random() - 0.5) * (containerRect.height * intensity);
    setNoButtonPos({ x: newX, y: newY });
  };

  const fireworks = () => {
    const colors = ['#E11D48', '#BE123C', '#F87171', '#FCA5A5', '#FB7185'];
    confetti({
      particleCount: 80,
      spread: 70,
      startVelocity: 45,
      origin: { x: 0.2, y: 0.6 },
      colors
    });
    confetti({
      particleCount: 80,
      spread: 70,
      startVelocity: 45,
      origin: { x: 0.8, y: 0.6 },
      colors
    });
    setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 90,
        startVelocity: 55,
        origin: { x: 0.5, y: 0.5 },
        colors
      });
    }, 200);
  };

  const handleYes = () => {
    playSuccess();
    fireworks();
    setTimeout(onAccepted, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center w-full max-w-4xl mx-auto space-y-12 py-8 px-6"
    >
      <div className="space-y-10">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 8, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="text-rose-600 flex justify-center"
        >
          <div className="bg-white p-8 rounded-full shadow-2xl border border-rose-50">
            <Heart size={100} fill="currentColor" strokeWidth={0} />
          </div>
        </motion.div>
        
        <div
          className="space-y-6"
          onMouseEnter={() => moveNoButton(0.95)}
        >
          <h1 className="text-7xl md:text-9xl font-playfair font-black text-slate-950 leading-none">
            Riah<span className="text-rose-600">?</span>
          </h1>
          <p className="text-slate-800 text-2xl md:text-3xl font-bold tracking-[0.3em] uppercase max-w-lg mx-auto leading-relaxed">
            Will you be my Valentine?
          </p>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="relative h-72 w-full flex items-center justify-center gap-12 no-select"
      >
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: '#BE123C' }}
          whileTap={{ scale: 0.98 }}
          onClick={handleYes}
          data-sfx="click"
          className="px-16 py-5 bg-rose-600 text-white rounded-full text-base font-black tracking-[0.3em] uppercase shadow-[0_25px_60px_rgba(225,29,72,0.4)] transition-all z-20"
        >
          Yes
        </motion.button>

        <motion.button
          animate={{ x: noButtonPos.x, y: noButtonPos.y }}
          onMouseEnter={() => moveNoButton(1)}
          data-sfx="click"
          className="px-16 py-5 bg-white border-2 border-slate-200 text-slate-900 rounded-full text-base font-black tracking-[0.3em] uppercase shadow-sm z-10 whitespace-nowrap"
        >
          No
        </motion.button>
      </div>

      <div className="pt-10">
        <div className="flex justify-center gap-3 text-rose-300">
          <Sparkles size={24} className="animate-pulse" />
          <Sparkles size={18} className="animate-pulse delay-75" />
          <Sparkles size={24} className="animate-pulse delay-150" />
        </div>
        <p className="mt-6 text-slate-400 text-xs font-black uppercase tracking-[0.5em]">The choice is yours, always.</p>
      </div>
    </motion.div>
  );
};

export default FinalProposal;
