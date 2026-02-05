import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface LoadingScreenProps {
  isVisible: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/10 backdrop-blur-xl">
      <div className="glass-strong rounded-[3rem] px-12 py-10 text-center space-y-6">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 6, -6, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex justify-center text-rose-600"
        >
          <Heart size={72} fill="currentColor" strokeWidth={0} />
        </motion.div>
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.5em] text-slate-700 font-bold">
            Preparing magic
          </p>
          <div className="relative w-56 h-2 bg-rose-100 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-rose-400 via-rose-500 to-rose-400"
              initial={{ width: '15%' }}
              animate={{ width: ['20%', '90%', '40%', '100%'] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
