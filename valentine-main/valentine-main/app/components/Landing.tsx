
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ChevronRight } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 20 } },
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
      className="relative flex flex-col items-center justify-center min-h-[85vh] w-full px-6"
    >
      {/* Background Petals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, x: Math.random() * 100 + '%', opacity: 0, rotate: 0 }}
            animate={{ 
              y: '110vh', 
              x: (Math.random() * 100 - 20) + '%', 
              opacity: [0, 0.4, 0.4, 0],
              rotate: 360 
            }}
            transition={{ 
              duration: 12 + Math.random() * 8, 
              repeat: Infinity, 
              delay: Math.random() * 5,
              ease: "linear"
            }}
            className="absolute text-rose-300"
          >
            <Heart size={14 + Math.random() * 16} fill="currentColor" stroke="none" />
          </motion.div>
        ))}
      </div>

      <div className="relative mb-14">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 3, -3, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10"
        >
          <div className="absolute inset-0 bg-rose-500/10 blur-[100px] rounded-full scale-150 animate-pulse" />
          <div className="relative glass-strong p-10 rounded-full border border-rose-50 shadow-2xl">
            <Heart 
              size={110} 
              fill="#E11D48" 
              strokeWidth={0} 
              className="drop-shadow-lg" 
            />
          </div>
        </motion.div>
      </div>

      <motion.div variants={containerVariants} className="text-center space-y-8 z-20 max-w-2xl">
        <motion.div variants={itemVariants} className="space-y-3">
          <span className="text-sm font-bold tracking-[0.6em] uppercase text-rose-700 block">
            A Journey for You
          </span>
          <h1 className="text-7xl md:text-9xl font-playfair font-black text-slate-900 leading-none drop-shadow-sm">
            Riah<span className="text-rose-600">.</span>
          </h1>
        </motion.div>

        <motion.p 
          variants={itemVariants}
          className="text-xl md:text-2xl text-white font-playfair italic leading-relaxed"
        >
          "While the others talk, <br className="hidden md:block" /> Let’s listen to lovers rock?"
        </motion.p>

        <motion.div variants={itemVariants} className="pt-6">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
            whileTap={{ scale: 0.98 }}
            onClick={onStart}
            data-sfx="click"
            className="group relative inline-flex items-center gap-4 px-14 py-6 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white rounded-full text-sm font-bold tracking-[0.4em] uppercase overflow-hidden shadow-[0_30px_60px_rgba(15,23,42,0.3)] transition-all duration-300 glow-ring"
          >
            <span className="relative z-10 flex items-center gap-3">
              Begin Our Story 
              <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-rose-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Landing;
